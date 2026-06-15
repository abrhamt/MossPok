## 2024-05-24 - Memoizing presentational components with inline object props
**Learning:** Frontend presentational game components (e.g., PokerCard) often receive inline object props that change reference frequently. When writing custom `areEqual` functions for `React.memo`, hardcoding every prop name is brittle to future prop additions.
**Action:** Deep compare specific nested objects (like 'card') and use a dynamic shallow comparison (e.g., via `Object.keys()`) for the remaining props to ensure the memoization isn't brittle.
