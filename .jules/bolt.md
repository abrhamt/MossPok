## 2024-06-25 - React.memo with Custom Equality in Game Components
**Learning:** Frontend presentational game components (e.g., PokerCard) often receive inline object props that change reference frequently, defeating standard React.memo.
**Action:** Use React.memo with custom semantic comparison functions (like checking suit and rank) to prevent unnecessary re-renders.
