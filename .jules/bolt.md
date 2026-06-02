## 2024-06-02 - Inline Object Props in Presentational Components
**Learning:** Frontend game components like PokerCard frequently receive inline object props (e.g., card={{suit, rank}}) from parent game state updates, causing widespread unnecessary re-renders even when the underlying data hasn't changed.
**Action:** Always wrap these presentational components in `React.memo` using custom semantic comparison functions (e.g., comparing `suit` and `rank` explicitly) rather than relying on shallow comparison.
