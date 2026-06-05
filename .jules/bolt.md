
## 2024-05-18 - Prevent unnecessary re-renders with inline object props in React lists
**Learning:** In frontend applications that render lists of items where props contain inline objects (like hands in a poker game), components frequently re-render because object references change even when the values remain identical.
**Action:** Use `React.memo` coupled with a custom `areEqual` comparison function that checks the relevant semantic fields inside the objects (like `card.suit` and `card.rank`) instead of relying on default shallow comparison of prop references.
