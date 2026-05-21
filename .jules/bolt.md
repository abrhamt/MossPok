## 2024-05-24 - React.memo for Presentational Components Receiving Server State
**Learning:** Frontend presentational game components (e.g., `PokerCard`) often receive inline object props (like `card: { suit, rank }`) that change reference frequently due to updates in the server game state or parent re-renders, causing significant unnecessary re-renders.
**Action:** Use `React.memo` with custom semantic comparison functions (like checking `suit` and `rank` deep equality rather than shallow object equality) on presentational components to prevent unnecessary re-renders.
