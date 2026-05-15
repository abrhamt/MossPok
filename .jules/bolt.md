## 2024-05-15 - React.memo with Custom Comparator for Inline Objects
**Learning:** Frontend presentational game components (e.g., `PokerCard`) often receive inline object props (`card`) that change reference across re-renders when the parent's game state updates. Standard `React.memo` is ineffective here due to shallow comparison.
**Action:** Use `React.memo` with a custom comparison function that manually compares the nested properties (e.g., `suit` and `rank`) to correctly prevent unnecessary component re-renders.
