# Research: Daily Task Tracking

## Decision 1: Browser-native application

**Decision**: Use HTML, CSS, and browser JavaScript ES modules without a UI framework or build system.

**Rationale**: The requirements describe a small responsive interface with two screens and no backend or integrations. Native browser features meet those needs without adding dependencies. The HTML document title supplies the browser tab/window title, and CSS media queries handle responsive layouts.

**Alternatives considered**:

- A UI framework or component library: rejected because the two screens do not justify its setup and runtime complexity.
- A native desktop application: rejected because it would add platform-specific packaging without improving the mobile requirement.

**Sources**:

- WHATWG HTML, document title: https://html.spec.whatwg.org/multipage/semantics.html#the-title-element
- W3C Media Queries Level 5: https://www.w3.org/TR/mediaqueries-5/

## Decision 2: Browser-local persistence

**Decision**: Store tasks through a small repository interface backed by `localStorage`.

**Rationale**: The task list is small, single-user, and limited to one device. `localStorage` persists across normal browser restarts and is simpler than a structured asynchronous database. Store the collection as JSON behind the persistence adapter; keep all storage access out of UI modules.

**Alternatives considered**:

- IndexedDB: rejected for this scope; its asynchronous transaction and object-store model add complexity without a current need for larger data or indexes.
- Remote database or synchronization: out of scope and contrary to FR-017.

**Limitations**: Browser storage is origin-specific and best-effort; users or browser settings can clear it, and private browsing may discard it when the session ends. Run the app from the same localhost origin and normal browser profile when validating persistence. Do not treat browser storage as a backup.

**Sources**:

- WHATWG HTML, Web Storage: https://html.spec.whatwg.org/multipage/webstorage.html
- MDN Web Storage API: https://developer.mozilla.org/en-US/docs/Web/API/Web_Storage_API
- MDN Storage quotas and eviction: https://developer.mozilla.org/en-US/docs/Web/API/Storage_API/Storage_quotas_and_eviction_criteria
- MDN IndexedDB API: https://developer.mozilla.org/en-US/docs/Web/API/IndexedDB_API

## Decision 3: Test and lint setup

**Decision**: Use Node.js 20.9+'s built-in `node:test` and `node:assert/strict` for task-service unit tests. Add ESLint 9 as a development-only dependency because the constitution requires linting. Use the browser acceptance steps in `quickstart.md` as manual end-to-end tests: run each story against the preceding baseline and confirm the new behavior fails before UI implementation, then rerun it after implementation.

**Rationale**: The built-in runner is sufficient for fast, independent business-logic tests. ESLint is required by the constitution and offers a repeatable linter; keep its rules limited and avoid plugins or shared configurations. Manual browser acceptance checks exercise actual browser rendering and storage in a red-green cycle without adding a test framework and browser binaries to this small workshop project.

**Alternatives considered**:

- Playwright Test: would automate real-browser flows and viewport checks, but adds a third-party package and browser downloads. Reconsider only if the project later requires repeatable automated browser coverage.
- Node unit tests alone: rejected because they do not render the UI or prove browser storage survives a browser restart.
- No linter: rejected because it would fail the constitution's mandatory lint quality gate.

**Sources**:

- Node.js v20 test runner: https://nodejs.org/download/release/latest-v20.x/docs/api/test.html
- Node.js v20 assertions: https://nodejs.org/download/release/latest-v20.x/docs/api/assert.html
- ESLint v9 migration guide and Node version requirement: https://eslint.org/docs/latest/use/migrate-to-9.0.0
- Playwright Test (alternative): https://playwright.dev/docs/intro

## Decision 4: Local development serving

**Decision**: Serve the static app from `127.0.0.1` with Python's standard-library `http.server` while developing and validating.

**Rationale**: A stable HTTP origin avoids relying on browser-specific `file://` storage behavior and requires no additional application server or package. The server is for local development and must not be exposed as a production service.

**Source**:

- Python 3.11 `http.server`: https://docs.python.org/3.11/library/http.server.html
