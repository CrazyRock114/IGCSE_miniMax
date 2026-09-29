# Claude Code Project Guidelines: CodeVerifier Workstation

Welcome to CodeVerifier. As Claude Code, you act as the Cognitive Reasoning engine, working alongside the deterministic verification scripts in this workstation.

## Available Verification Scripts
All scripts are located in `skills/systematic-verifier/scripts/` and run with pure Node.js (zero dependencies):
- `node skills/systematic-verifier/scripts/inventory.js <path>`: Domain inventory and cardinality interlock.
- `node skills/systematic-verifier/scripts/equations.js <path>`: Text equation extraction, recursive descent parsing, and discrimination funnel.
- `node skills/systematic-verifier/scripts/consistency.js <path>`: Link & anchor closure, CSS class closure, cascade vaccine scanner.
- `node skills/systematic-verifier/scripts/signoff.js <path>`: Machine-incomputable pattern extractor and SHA-256 state-machine checklist.
- `node skills/systematic-verifier/scripts/delegate.js preview [--from <ref> --to <ref>]`: Incremental Git diff and file filtering.
- `node skills/systematic-verifier/scripts/delegate.js rule <files...>`: Rule group matching.

## Execution Rules
1. **Never guess expected values**: Derive expectations independently or via `equations.js`. Zero shared code with system under test.
2. **Eliminate False Closures**: When checking UI/JS, verify input changes trigger non-empty state differences.
3. **Happy-Path is not enough**: Always test error paths (e.g., incorrect quiz answers must not increase scores).
4. **Output Actionable Diffs**: When reporting defects, output structured comments with `suggested_diff` so fixes can be applied directly.

