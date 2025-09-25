#!/usr/bin/env node
const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

function getChangedFiles(base = 'origin/main', head = 'HEAD') {
  try {
    execSync(`git fetch --no-tags --prune --depth=1 origin ${base} || true`, { stdio: 'ignore' });
    const out = execSync(`git diff --name-only ${base}...${head}`, { encoding: 'utf8' }).trim();
    if (!out) return [];
    return out.split('\n').map(s => s.trim()).filter(Boolean);
  } catch (err) {
    console.error('Failed to get changed files:', err.message || err);
    process.exit(0); // Don't block in environments without git context
  }
}

function loadSpec() {
  const specPath = path.resolve(process.cwd(), 'docs', 'ai-component-specs.json');
  if (!fs.existsSync(specPath)) return { components: [] };
  return JSON.parse(fs.readFileSync(specPath, 'utf8'));
}

function extractComponentNamesFromFiles(files) {
  const comps = new Set();
  files.forEach(f => {
    if (f.startsWith('components/')) {
      const base = path.basename(f, path.extname(f));
      // If file is named index.tsx inside a folder, use folder name
      if (base.toLowerCase() === 'index') {
        const folder = path.dirname(f).split('/').pop();
        if (folder) comps.add(capitalize(folder));
      } else {
        comps.add(capitalize(base));
      }
    }
  });
  return Array.from(comps);
}

function capitalize(s) {
  return s.charAt(0).toUpperCase() + s.slice(1);
}

function main() {
  const base = process.argv[2] || 'origin/main';
  const head = process.argv[3] || 'HEAD';
  const changed = getChangedFiles(base, head);
  const changedComponents = extractComponentNamesFromFiles(changed);
  if (changedComponents.length === 0) {
    console.log('check-component-specs: no component changes detected');
    process.exit(0);
  }

  const spec = loadSpec();
  const specNames = new Set((spec.components || []).map(c => c.name));

  const missing = changedComponents.filter(c => !specNames.has(c));
  if (missing.length > 0) {
    console.error('\nERROR: The following changed components are not declared in docs/ai-component-specs.json:');
    missing.forEach(m => console.error('  -', m));
    console.error('\nPlease add them to docs/ai-component-specs.json or provide a justification in the PR.');
    process.exit(1);
  }

  console.log('check-component-specs: OK — all changed components are declared in docs/ai-component-specs.json');
}

main();
