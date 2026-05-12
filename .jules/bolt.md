## 2025-05-12 - Re-rendering in Play.js
**Learning:** `Play.js` is a heavy real-time component that subscribes to the game state via Context (`messages`, `currentTable`, `isPlayerSeated`, etc.). Frequent updates to any of these context values trigger a re-render of `Play.js` and all its deeply nested children (e.g. `Seat`, `Hand`, `PokerCard`, `PokerTable`). `React.memo` is highly effective here for the pure UI leaf nodes.

**Action:** When working on real-time multiplayer UI, actively identify pure/static leaf components (`PokerTable`) and components whose props rarely change compared to their parent (`PokerCard`). Wrap these in `React.memo` with appropriate custom comparators for complex objects to isolate them from the parent's high-frequency render cycle.
