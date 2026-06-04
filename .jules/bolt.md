## 2024-07-26 - Prevent Unnecessary Re-renders on Game Presentational Components
**Learning:** Presentational game components (e.g., `PokerCard`) often receive inline object props that change reference frequently (like `card={{ suit, rank }}`) but contain identical underlying values, leading to wasteful re-renders.
**Action:** Use `React.memo` with a custom semantic comparison function (e.g., explicitly checking `suit` and `rank`) to ensure components only re-render when the actual values change, not just the object references.
