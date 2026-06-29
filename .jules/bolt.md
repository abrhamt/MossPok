## 2024-06-25 - Truncated Read Mitigation for React Components
**Learning:** File reading tools (`cat`, `read_file`) frequently truncate output for moderately sized files, hiding essential component signatures, props, and exports.
**Action:** When inspecting files to modify or verify, always assume output might be truncated. Use `tail` (e.g., `tail -n +30`) or specific `grep` commands to ensure the full component definition is verified before planning changes.
