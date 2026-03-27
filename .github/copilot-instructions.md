<!-- Auto-generated guidance for AI coding agents. Keep concise and actionable. -->
# Copilot instructions for TP-3-DAI

Purpose
- Help AI agents make safe, small, and correct changes to this repository (a simple Node.js script).

Quick facts (what to know immediately)
- Runtime: Node.js with ESM modules (`"type": "module"` in package.json). Keep `import`/`export` syntax.
- Entry point: `index.js`. The project is a small script, not a server or library.
- Start: `npm install` then `npm start` (runs `node index.js`).
- External deps: `axios` (network), `dayjs`. Network calls (e.g., `restcountries.com`) may be flaky—mock or guard during development.

Key files
- `index.js`: single-file app containing all business logic (data load, mutations, CSV export, external API call).
- `productos.json`: source-of-truth data file read/written by the script.
- `productos.csv`: generated output created by `generarCSV()`.
- `package.json`: contains `type: "module"` and `scripts.start`.

Important patterns & conventions
- Synchronous file I/O: `fs.readFileSync` + `fs.writeFileSync` are used to read and persist `productos.json`. Respect this pattern when editing — changes are persisted immediately on write.
- Data shape: product objects are { nombre, precio }. Preserve these property names and casing when adding or transforming products.
- Side-effectful scripts: `index.js` both reads and mutates `productos.json` (via `agregarProducto`) and writes `productos.csv`. Avoid running `npm start` unnecessarily when editing — it will modify repository files.
- Date formatting: `dayjs()` is used with formats `'DD/MM/YYYY'` and `'HH:mm:ss'`. Keep these formats if adding date output.
- Network calls: `obtenerPais` uses `axios.get` to `https://restcountries.com/v3.1/name/<name>` and assumes `respuesta.data[0]` exists. Add defensive checks before dereferencing fields.

Code-edit guidance (concrete examples)
- When adding a new function that reads/writes data, follow existing sync-file approach and update `productos.json` using `fs.writeFileSync('./productos.json', JSON.stringify(productos, null, 2))` so formatting remains consistent.
- If you need to load `productos.json` elsewhere, prefer importing or `JSON.parse(fs.readFileSync('./productos.json','utf-8'))` rather than duplicating an in-memory mutated copy without saving.
- If introducing async flows, do not change the repo-wide module type — keep ESM `import` statements and export named functions if you split `index.js`.

Testing and safety
- There are no tests. When editing code that mutates `productos.json`, create and use a temporary copy (e.g., `productos.test.json`) or comment out write calls to avoid corrupting source data.
- For network-dependent functions (`obtenerPais`), mock `axios` responses or wrap calls with timeouts and try/catch to avoid noisy failures.

When to open an issue / ask the maintainer
- Propose API or data-shape changes (e.g., renaming `nombre`/`precio`) before implementing — other scripts and dataset expect the current shape.
- Any change that alters or removes `productos.json` persistence behavior.

Example edits that are safe to do in a single PR
- Add a new read-only helper (e.g., `getProductoByNombre`) that does not write files.
- Add defensive checks around `obtenerPais` to handle missing fields.
- Add a CLI flag to `index.js` that toggles CSV generation but keeps current default behavior.

Examples in repo to reference
- See `index.js` for examples of: synchronous JSON read/write, `axios` usage, `dayjs` formatting, and CSV generation logic.

Ask for clarification
- If a requested change would mutate `productos.json`, confirm whether to update the canonical data file or to use a test fixture.

End of file.
