## 2024-05-24 - React.memo on Game Presentation Components
**Learning:** Real-time updates often cause full state object recreation. Inline object props that change reference frequently cause unnecessary re-renders in presentational game components (e.g. PokerCard).
**Action:** Use React.memo with custom semantic comparison functions (like checking suit and rank instead of object identity) to prevent unnecessary re-renders in game presentation components.
