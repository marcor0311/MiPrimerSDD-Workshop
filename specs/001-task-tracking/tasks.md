---
description: "Task list for Daily Task Tracking"
---

# Tasks: Daily Task Tracking

**Input**: Design documents from `specs/001-task-tracking/`

**Prerequisites**: `plan.md`, `spec.md`, `research.md`, `data-model.md`, and `quickstart.md`

**Testing**: Tests are required by the project constitution. Write unit tests before the task-service behavior they require, confirm they fail, then implement the smallest change that makes them pass. For each user story, also run the manual browser acceptance checks against the preceding baseline and confirm new behavior fails before UI implementation; rerun after implementation.

**Organization**: Tasks are grouped by user story to allow validation at each increment. The spec priorities and required detail-screen dependencies make the stories sequential after the MVP.

## Format: `[ID] [P?] [Story] Description`

- **[P]**: Tasks can run in parallel because they touch separate files and have no dependency on each other's completion.
- **[Story]**: User-story label for story-phase tasks (`US1`, `US2`, `US3`).
- Every task includes its target file path.

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: Create the minimal JavaScript test and lint setup for the planned application.

- [X] T001 [P] Create `deliverables/curso-pswe-07/package.json` with Node `node --test` and ESLint 9 lint scripts and ESLint as a development dependency.
- [X] T002 [P] Create `deliverables/curso-pswe-07/.gitignore` to exclude `node_modules/`.
- [X] T003 [P] Create `deliverables/curso-pswe-07/eslint.config.mjs` with minimal browser and Node test globals and built-in lint rules; do not add plugins or shared configurations.
- [X] T004 Generate `deliverables/curso-pswe-07/package-lock.json` by running `npm install` from `deliverables/curso-pswe-07/`.

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Establish a tested persistence boundary before building user stories.

- [X] T005 Write failing load and save unit tests using a fake Storage object in `deliverables/curso-pswe-07/tests/unit/local-storage-task-repository.test.mjs`.
- [X] T006 Define the `loadAll()` / `saveAll(tasks)` repository boundary in `deliverables/curso-pswe-07/src/persistence/task-repository.mjs` and implement it with browser `localStorage` in `deliverables/curso-pswe-07/src/persistence/local-storage-task-repository.mjs`; make T005 pass.

**Checkpoint**: Setup and persistence tests pass; story work can begin.

---

## Phase 3: User Story 1 - Create and View Tasks (Priority: P1) 🎯 MVP

**Goal**: Add tasks with titles and optional descriptions, view them in a list, open their details, and keep saved tasks after reopening.

**Independent Test**: Create tasks with and without descriptions, verify validation and unique-title rules, open a task, then close and reopen the app and confirm saved values remain.

### Tests for User Story 1

> Write unit tests first and confirm they fail. Run the browser acceptance steps in `specs/001-task-tracking/quickstart.md` against the shell before implementing story behavior.

- [X] T007 [P] [US1] Write failing task-service unit tests for listing, creating Pending tasks, rejecting empty titles, trimming saved titles, and rejecting normalized duplicate titles in `deliverables/curso-pswe-07/tests/unit/task-service.test.mjs`.
- [X] T008 [P] [US1] Create `deliverables/curso-pswe-07/index.html` with the `Curso-PSWE-07` document title and semantic app root, and create the linked base stylesheet at `deliverables/curso-pswe-07/src/ui/styles.css`.
- [ ] T009 [US1] Run the Story 1 browser acceptance checks in `specs/001-task-tracking/quickstart.md` against the shell and confirm the unimplemented create, list, detail, and persistence behaviors fail before implementing them.

### Implementation for User Story 1

- [X] T010 [US1] Implement task listing and creation in `deliverables/curso-pswe-07/src/application/task-service.mjs`, including an opaque stable ID, Pending initial status, required title validation, trimmed title storage, and case-insensitive unique-title checks; make T007 pass.
- [X] T011 [US1] Implement the create form with title and optional description fields plus title validation feedback in `deliverables/curso-pswe-07/src/ui/task-form.mjs`.
- [X] T012 [US1] Implement the list screen in `deliverables/curso-pswe-07/src/ui/list-screen.mjs` with the app header, visible All/Pending/Done filter controls, task rows, Add task action, and exact empty messages from FR-007.
- [X] T013 [US1] Implement read-only task detail rendering and back navigation in `deliverables/curso-pswe-07/src/ui/detail-screen.mjs`, including title, description or muted “No description”, and status label.
- [X] T014 [US1] Wire the list, create form, detail view, task service, and persistence adapter in `deliverables/curso-pswe-07/src/ui/app.mjs`.
- [ ] T015 [US1] Rerun the Story 1 acceptance checks in `specs/001-task-tracking/quickstart.md` and confirm they pass, including title uniqueness and close/reopen persistence; fix failures before starting US2.

**Checkpoint**: User Story 1 can be tested and demonstrated independently as the MVP.

---

## Phase 4: User Story 2 - Track and Filter Completion (Priority: P2)

**Goal**: Toggle task completion and filter the list by All, Pending, or Done.

**Independent Test**: With Pending and Done tasks available, toggle each status and verify the action label, active filter, matching rows, completed styling, empty message, and filter retention after returning from detail.

### Tests for User Story 2

> Write unit tests first and confirm they fail. Run the browser acceptance steps against the completed US1 baseline before adding status and filter behavior.

- [X] T016 [US2] Add failing task-service unit tests for Pending ↔ Done transitions and All/Pending/Done filtering in `deliverables/curso-pswe-07/tests/unit/task-service.test.mjs`.
- [ ] T017 [US2] Run the Story 2 browser acceptance checks in `specs/001-task-tracking/quickstart.md` against the US1 baseline and confirm status toggling, functional filters, and filter retention fail before implementing them.

### Implementation for User Story 2

- [X] T018 [P] [US2] Implement status changes and list filtering in `deliverables/curso-pswe-07/src/application/task-service.mjs`; make T016 pass.
- [X] T019 [P] [US2] Implement active filter behavior, visible status indicators, Done title strikethrough/muted styling, and the FR-007 filter empty message in `deliverables/curso-pswe-07/src/ui/list-screen.mjs` and `deliverables/curso-pswe-07/src/ui/styles.css`.
- [X] T020 [P] [US2] Implement the detail status label and dynamic “Mark as done” / “Mark as not done” action in `deliverables/curso-pswe-07/src/ui/detail-screen.mjs`; preserve the active filter when returning via Back in `deliverables/curso-pswe-07/src/ui/app.mjs` as required by FR-019.
- [ ] T021 [US2] Rerun the Story 2 browser acceptance checks in `specs/001-task-tracking/quickstart.md` and confirm they pass; fix failures before starting US3.

**Checkpoint**: User Stories 1 and 2 work together, including status changes, filters, and filter retention on Back.

---

## Phase 5: User Story 3 - Edit and Remove Tasks (Priority: P2)

**Goal**: Edit saved task details, reject duplicate titles without losing existing values, and delete only after confirmation.

**Independent Test**: Edit and save a task, reject an edit that duplicates another title, cancel unsaved edits, cancel deletion, then confirm deletion and verify the task disappears and the current filter remains selected.

### Tests for User Story 3

> Write unit tests first and confirm they fail. Run the browser acceptance steps against the completed US2 baseline before adding edit and delete behavior.

- [X] T022 [US3] Add failing task-service unit tests for title/description updates, duplicate-title rejection preserving the prior task, and task deletion in `deliverables/curso-pswe-07/tests/unit/task-service.test.mjs`.
- [ ] T023 [US3] Run the Story 3 browser acceptance checks in `specs/001-task-tracking/quickstart.md` against the US2 baseline and confirm edit, duplicate-edit rejection, and delete actions fail before implementing them.

### Implementation for User Story 3

- [X] T024 [US3] Implement task update and delete operations in `deliverables/curso-pswe-07/src/application/task-service.mjs`; make T022 pass.
- [X] T025 [P] [US3] Add edit mode to `deliverables/curso-pswe-07/src/ui/task-form.mjs` with prefilled values, Save/Cancel behavior, validation, and duplicate-title feedback while preserving saved values on rejection.
- [X] T026 [P] [US3] Add Edit and Delete detail actions in `deliverables/curso-pswe-07/src/ui/detail-screen.mjs` and `deliverables/curso-pswe-07/src/ui/app.mjs`; require deletion confirmation, return to the list after confirmed deletion, and retain the active filter as required by FR-011 and FR-019. Use the warning color in `deliverables/curso-pswe-07/src/ui/styles.css`.
- [ ] T027 [US3] Rerun the Story 3 browser acceptance checks in `specs/001-task-tracking/quickstart.md` and confirm they pass; fix failures before final validation.

**Checkpoint**: All three user stories are independently validated.

---

## Phase 6: Polish & Cross-Cutting Quality Gates

**Purpose**: Confirm responsive design, accessibility, scope, and project quality gates across the full feature.

- [X] T028 Complete responsive layout and ensure all interactive targets are at least 44 by 44 pixels in `deliverables/curso-pswe-07/src/ui/styles.css`.
- [ ] T029 Run the visual, contrast, responsive, and out-of-scope checks in `specs/001-task-tracking/quickstart.md`; correct any findings in `deliverables/curso-pswe-07/src/ui/styles.css` or the relevant UI module.
- [ ] T030 Run `npm test` and `npm run lint` from `deliverables/curso-pswe-07/`, then run every acceptance check in `specs/001-task-tracking/quickstart.md` and resolve failures before marking the feature done.

---

## Dependencies & Execution Order

### Phase Dependencies

- **Setup (Phase 1)**: T001–T003 can run in parallel; T004 depends on T001.
- **Foundational (Phase 2)**: Depends on Setup; T006 follows failing tests in T005. Blocks all user stories.
- **User Story 1 (Phase 3)**: Depends on the persistence foundation; T007 and T008 can run in parallel, then T009 confirms acceptance failures before implementation.
- **User Story 2 (Phase 4)**: Depends on the complete US1 list/detail flow; T016 and T017 establish red tests before T018–T020. T018–T020 can then run in parallel in separate files.
- **User Story 3 (Phase 5)**: Depends on US1 and US2; T022 and T023 establish red tests before T024. T025 and T026 can run in parallel after T024 because they touch separate UI modules.
- **Polish (Phase 6)**: Depends on all three stories; run the full quality gate last.

### User Story Dependencies

- **US1 (P1)**: Starts after the persistence foundation; no dependency on another user story.
- **US2 (P2)**: Depends on US1's saved task list and detail navigation.
- **US3 (P2)**: Depends on the saved list and detail/status flow from US1 and US2.

### Test-First Order

- Write and run repository tests before T006.
- For each story, write and run failing task-service tests before service changes.
- Before each story's UI implementation, run its browser acceptance checks against the preceding baseline and confirm the new behavior fails; rerun after implementation and confirm green.

### Parallel Opportunities

- Setup tasks T001, T002, and T003 operate on separate files.
- In US1, T007 and T008 operate on separate files; T009 runs after both.
- In US2, T018, T019, and T020 operate on separate files after red checks T016–T017.
- In US3, T025 and T026 operate on separate UI modules after red checks T022–T023 and service implementation T024.
- User stories themselves are not parallel because their dependencies are required for an independently testable increment.

## Parallel Examples

### User Story 1

```text
T007 Write failing task-service unit tests in deliverables/curso-pswe-07/tests/unit/task-service.test.mjs
T008 Create the HTML shell in deliverables/curso-pswe-07/index.html and base styles in src/ui/styles.css
```

### User Story 2

```text
After T016 and T017 confirm red tests, run these separate-file tasks in parallel:
T018 Update deliverables/curso-pswe-07/src/application/task-service.mjs
T019 Update deliverables/curso-pswe-07/src/ui/list-screen.mjs and styles.css
T020 Update deliverables/curso-pswe-07/src/ui/detail-screen.mjs and app.mjs
```

### User Story 3

```text
After T022 and T023 confirm red tests and T024 updates the service, run these separate-module tasks in parallel:
T025 Update deliverables/curso-pswe-07/src/ui/task-form.mjs
T026 Update deliverables/curso-pswe-07/src/ui/detail-screen.mjs and app.mjs
```

## Implementation Strategy

### MVP First (User Story 1 Only)

1. Complete Setup and Foundational phases.
2. Complete US1 unit and red browser acceptance tests before its service and UI implementation.
3. Validate adding, opening, and retaining tasks using the US1 browser acceptance checks.
4. Stop at the US1 checkpoint for a demonstrable MVP.

### Incremental Delivery

1. Add US2 status transitions and filters; validate them while preserving US1 behavior and the active filter on return.
2. Add US3 editing and confirmed deletion; validate them while preserving US1 and US2 behavior.
3. Complete responsive, contrast, scope, test, and lint checks.

## Notes

- `[P]` marks only tasks that can safely proceed in parallel in separate files.
- Every story task is labeled with its source story; shared setup and foundation tasks have no story label.
- Use Red-Green-Refactor for each service behavior and run acceptance checks in red before each UI increment.
- Browser acceptance checks are manual; unit tests remain fast and independent.
- The implementation files are planned deliverables only; this task-generation phase does not create application source code.
