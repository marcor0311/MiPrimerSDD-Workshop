# Implementation Plan: Daily Task Tracking

**Branch**: `001-task-tracking` | **Date**: 2026-10-26 | **Spec**: [spec.md](spec.md)

**Input**: Feature specification from `specs/001-task-tracking/spec.md`

## Summary

Design a small, client-side web application with two screens, browser-local persistence, and no external runtime dependencies. Use native HTML, CSS, and JavaScript modules; keep UI, task operations, and persistence behind separate layers. The workshop README says application implementation is not required, so this phase creates design documents only.

## Technical Context

**Language/Version**: HTML5, CSS, browser JavaScript ES modules; Node.js 20.9+ for unit tests and ESLint 9.

**Primary Dependencies**: No third-party runtime dependencies. ESLint is the sole third-party development dependency for the constitution-required lint gate; Node's built-in test runner covers unit tests.

**Storage**: Browser `localStorage`, scoped to the same browser profile and localhost origin.

**Testing**: Node `node:test` for fast, independent task-service unit tests; ESLint 9 for linting; browser acceptance scenarios for each user story documented in `quickstart.md` and executed manually. Run each story's acceptance checks against the preceding baseline and confirm its new behavior fails before UI implementation, then rerun them after implementation. Apply Red-Green-Refactor.

**Target Platform**: Current desktop and mobile browsers, served from a stable localhost origin during local use.

**Project Type**: Client-side web application.

**Performance Goals**: Task operations use local data and need no network request. No numeric latency or throughput target is specified for this single-user list.

**Constraints**: One user and one device; no accounts or synchronization. UI depends on application logic, which depends on a replaceable repository interface; UI MUST NOT access browser storage directly. Browser storage may be cleared by the user or unavailable in private/restricted contexts; persistence acceptance is for a normal browser profile.

**Scale/Scope**: One personal task list, two screens, one task entity, and the user-visible behaviors in the spec. No task-count limit is specified.

## Constitution Check

**Pre-design gate: PASS**

- **Simplicity First (YAGNI)**: Use browser-native capabilities and avoid frameworks, build tools, accounts, and unrequested features.
- **Simple, Clear Design**: Keep modules small and single-purpose; share only the add/edit form because both flows use the same fields and validation.
- **Structured Architecture**: Enforce UI → application logic → persistence. The application layer receives a small repository interface; UI modules receive application operations and never read storage.
- **Test-Driven Development (Non-Negotiable)**: Write failing unit tests before production task logic; run each story's browser acceptance checks against the previous baseline and confirm the new behavior fails before its UI implementation. Rerun after implementation. Keep unit tests independent and fast.
- **Spec Is the Source of Truth**: Design decisions implement only FR-001–FR-019 and the three user stories. The internal task ID is necessary to address a selected task when its title is edited; it is not exposed as a feature.
- **Dependencies and Quality**: Add no third-party runtime dependency. ESLint is justified as one development dependency because the constitution requires linting and Node provides no built-in JavaScript linter. Use Node's built-in test runner and require linting plus all unit and acceptance checks before completion.
- **Plan Check**: This Constitution Check is complete before implementation begins, as required by the constitution.

## Project Structure

### Documentation (this feature)

```text
specs/001-task-tracking/
├── plan.md
├── research.md
├── data-model.md
├── quickstart.md
├── checklists/requirements.md
└── spec.md
```

No `contracts/` directory is needed: the feature exposes no machine-facing API or external service contract. The UI contract is defined by the screens and acceptance scenarios in `spec.md`.

### Source Code (repository root)

```text
deliverables/curso-pswe-07/
├── .gitignore
├── index.html
├── package.json
├── package-lock.json
├── eslint.config.mjs
├── src/
│   ├── ui/
│   │   ├── app.mjs
│   │   ├── list-screen.mjs
│   │   ├── detail-screen.mjs
│   │   ├── task-form.mjs
│   │   └── styles.css
│   ├── application/
│   │   └── task-service.mjs
│   └── persistence/
│       ├── task-repository.mjs
│       └── local-storage-task-repository.mjs
└── tests/
    └── unit/
        ├── local-storage-task-repository.test.mjs
        └── task-service.test.mjs
```

**Structure Decision**: Keep the proposed app under `deliverables/curso-pswe-07/`, matching the workshop README's deliverables area. Separate UI, application logic, and persistence to satisfy the constitution while keeping the design small. The UI layer owns navigation, filter selection, and rendering; the application layer owns task validation, status changes, filtering, and CRUD operations; the persistence adapter owns browser storage access.

## Design Decisions

- Use a single browser application with the list and detail views, and a shared form for create and edit.
- Preserve the selected list filter when returning from task detail using the back control or after confirmed deletion, as required by FR-019.
- Use an opaque internal ID so task selection and edits do not depend on a mutable title.
- Treat titles as unique after trimming surrounding whitespace and comparing without regard to capitalization, on both create and edit.
- Persist the list as a small JSON value through the repository boundary. Do not add task timestamps, category fields, or synchronization metadata.
- Keep the confirmation prompt for Delete in the UI flow; only call the delete operation after confirmation.
- Use Node's built-in `node:test` for unit tests. Acceptance scenarios remain in `quickstart.md` rather than introducing a browser-automation dependency. Run each story's checks in red against the prior baseline before its UI changes, then rerun in green at the story checkpoint. Unit tests cover task rules and state transitions with an independent fake repository.
- Add ESLint as the sole development dependency to meet the constitution's mandatory linting gate; configure only the rules needed for this small codebase.

## Constitution Check (Post-design)

**Post-design gate: PASS**

- The chosen design remains within the feature scope and uses no third-party runtime dependencies or speculative abstractions.
- ESLint is limited to development and is justified by the constitution's explicit linting quality gate.
- The three required layers and one-way dependency direction are reflected in the planned source tree.
- The repository boundary supports fake storage in unit tests and a replaceable browser-storage adapter.
- Unit tests are planned for business logic; the quickstart defines red/green browser acceptance procedures for create/view, status/filter, and edit/delete stories.
- The only platform choice is the smallest fit for the requested responsive two-screen UI. Storage limitations are documented in `research.md` and `quickstart.md`.
- No constitution violation requires an exception or a Complexity Tracking entry.
