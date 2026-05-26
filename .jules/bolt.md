## 2024-05-26 - Presentational components receive changing references
**Learning:** Frontend presentational game components (like PokerCard) often receive object props (e.g., `card`) from WebSocket/state that change reference frequently, even if the data (suit, rank) hasn't changed.
**Action:** Use React.memo with custom semantic comparison functions (like checking suit and rank) for such components to prevent unnecessary re-renders.
