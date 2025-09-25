LocalStorage Schema

Keys and shapes
- gameState_stage: number (enum GameStage)
- gameState_points: number
- gameState_proficiency: object where keys are problem keys and values are { attempts: number, correct: number }
- gameState_redeemedRewards: array of { id: string, date: ISOString, fulfilled: boolean }
- gameState_isMuted: boolean
- gameState_gameMode: number | null (ProblemType)

Versioning
- If schema changes, increment localStorage version prefix (e.g., `gameState_v2_points`) and provide a migration path in `useLocalStorage` or an initialization migration function.

Guidelines
- Keep data shapes minimal and serializable via JSON.
- Avoid storing functions or circular references.
- Add migration code to `App.tsx` bootstrap if storage version mismatches.
