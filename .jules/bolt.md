## 2026-06-08 - Presentational components re-render with inline objects
**Learning:** Frontend presentational game components (e.g., PokerCard) often receive inline object props that change reference frequently, causing unnecessary re-renders.
**Action:** Use React.memo with custom semantic comparison functions (like checking suit and rank) to prevent unnecessary re-renders when object values haven't changed.
