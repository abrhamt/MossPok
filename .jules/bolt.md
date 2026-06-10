## 2026-06-10 - React.memo with custom comparators for presentational components
**Learning:** Presentational components like `PokerCard` often receive inline object props (e.g., `card={{ suit, rank }}`) that change reference frequently, causing unnecessary re-renders even when the underlying data is identical.
**Action:** Use `React.memo` with custom semantic comparison functions (like checking `suit` and `rank`) to prevent unnecessary re-renders for presentational components receiving frequently-changing object props.
