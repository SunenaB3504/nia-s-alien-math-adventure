#!/usr/bin/env node
const { execSync } = require('child_process');
const path = require('path');

// Allow bypassing validation via env var (useful in CI or when intentionally skipping)
if (process.env.SKIP_DOCS_VALIDATE === '1') {
  console.log('docs-validate: skipping because SKIP_DOCS_VALIDATE=1');
  process.exit(0);
}

function getStagedFiles() {
  try {
    const out = execSync('git diff --cached --name-only', { encoding: 'utf8' }).trim();
    if (!out) return [];
    return out.split('\n').map(s => s.trim()).filter(Boolean);
  } catch (err) {
    console.error('Failed to determine staged files:', err.message || err);
    process.exit(0); // Do not block commits if git isn't available in the environment
  }
}

function getChangedFilesInRange(base = 'origin/main', head = 'HEAD') {
  try {
    const cmd = `git fetch --no-tags --prune --depth=1 origin ${base} || true`;
    try { execSync(cmd, { stdio: 'ignore' }); } catch (e) { /* ignore fetch errors */ }
    const out = execSync(`git diff --name-only ${base}...${head}`, { encoding: 'utf8' }).trim();
    if (!out) return [];
    return out.split('\n').map(s => s.trim()).filter(Boolean);
  } catch (err) {
    console.error('Failed to determine changed files in range:', err.message || err);
    process.exit(0);
  }
}

// Determine mode: CI mode if args provided or CI env is set
let changedFiles = [];
const args = process.argv.slice(2);
if (args.length >= 2) {
  const [base, head] = args;
  changedFiles = getChangedFilesInRange(base, head);
} else if (process.env.CI || process.env.GITHUB_ACTIONS) {
  // Use origin/main as the default base in CI
  changedFiles = getChangedFilesInRange('origin/main', 'HEAD');
} else {
  changedFiles = getStagedFiles();
}

if (changedFiles.length === 0) {
  console.log('docs-validate: No changed files detected — skipping docs check');
  process.exit(0);
}

const stagedSet = new Set(changedFiles);
const requiredDocs = new Set();

for (const f of changedFiles) {
  const fp = f.replace(/\\\\/g, '/');
  if (fp.startsWith('components/')) requiredDocs.add('docs/COMPONENT_GUIDELINES.md');
  if (fp.startsWith('components/')) requiredDocs.add('docs/STYLE_GUIDE.md');
  if (fp.startsWith('server/')) requiredDocs.add('docs/API_SPEC.md');
  if (fp.startsWith('utils/') || fp.startsWith('hooks/') || fp.includes('LocalStorage') || fp.includes('useLocalStorage')) requiredDocs.add('docs/LOCALSTORAGE_SCHEMA.md');
  if (fp === 'docs/design-tokens.json' || fp.includes('tailwind') || fp.includes('design-tokens')) requiredDocs.add('docs/STYLE_GUIDE.md');
  if (fp.startsWith('App.tsx') || fp.includes('gameState_') || fp.includes('Proficiency') || fp.includes('RedeemedReward')) requiredDocs.add('docs/LOCALSTORAGE_SCHEMA.md');
  if (fp.startsWith('utils/gemini') || fp.startsWith('server/')) requiredDocs.add('docs/API_SPEC.md');
}

const missing = [];
for (const doc of requiredDocs) {
  if (!stagedSet.has(doc)) missing.push(doc);
}

if (missing.length > 0) {
  console.error('\nERROR: Docs validation failed. The following docs should be updated in this change:');
  missing.forEach(d => console.error('  -', d));
  console.error('\nIf this change intentionally does not update docs, set SKIP_DOCS_VALIDATE=1 in your environment when committing or include a short justification in the commit message.');
  process.exit(1);
}

console.log('docs-validate: OK — required docs are present.');
process.exit(0);
