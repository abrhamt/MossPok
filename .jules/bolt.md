## 2023-10-24 - Inline object props in game components
**Learning:** Frontend presentational game components (like PokerCard) frequently receive inline object props (e.g. card objects) that change reference on every state update in the game loop, causing unnecessary React re-renders even when the visual data (suit and rank) hasn't changed.
**Action:** Use React.memo with custom semantic comparison functions (checking specific primitive properties like suit and rank) for game components to prevent these wasteful re-renders.
