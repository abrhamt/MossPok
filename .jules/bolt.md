## 2024-05-18 - Missing Component Memoization for Frequent Object Prop Changes
**Learning:** React presentational components (like `PokerCard`) that receive inline object props (e.g., `card={ { suit, rank } }`) inside map functions cause unnecessary re-renders on every parent update because the object reference changes, even if the contents are identical.
**Action:** Use `React.memo` with a custom comparison function that checks primitive values within the object prop rather than relying on default shallow comparison, especially for purely visual components deeply nested in game UI loops.
