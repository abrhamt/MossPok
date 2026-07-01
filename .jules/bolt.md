## 2024-07-01 - React.memo custom areEqual function for specific nested props

**Learning:** When using React.memo for components with complex nested props (like `card: { suit, rank }`) along with other shallow props, relying on default shallow comparison causes unnecessary re-renders when the nested object reference changes. Hardcoding prop names in custom `areEqual` functions is brittle to future additions.

**Action:** Write custom `areEqual` functions that deep compare specific nested objects (like `card`) while using a dynamic shallow comparison (e.g., via `Object.keys()`) for the remaining props to ensure memoization is robust and maintainable.
