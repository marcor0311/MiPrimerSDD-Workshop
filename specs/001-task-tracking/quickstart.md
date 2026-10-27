# Quickstart: Validate Daily Task Tracking

This guide is for use after the application source and tests have been implemented under `deliverables/curso-pswe-07/`. It covers the three user stories in the spec. Persistence validation assumes the same normal browser profile and localhost origin are used throughout.

## Prerequisites

- Python 3.11 or newer
- Node.js 20.9 or newer (for ESLint 9)
- A current desktop or mobile browser

## Red-Green Acceptance Cycle

Before implementing each user story, run that story's acceptance checks against the latest completed baseline. Confirm the new behavior fails or is unavailable while already completed stories still work; this is the red check. Implement the story, then rerun its checks and confirm they pass before moving to the next story. The browser checks are manual acceptance tests and complement the automated task-service unit tests.

## Run the application

From the repository root, start a local-only static server:

```bash
python3 -m http.server 8000 --bind 127.0.0.1 --directory deliverables/curso-pswe-07
```

Open `http://127.0.0.1:8000` in the browser. The Python standard-library server supports selecting a directory and binding to localhost.

## Run unit tests

In a second terminal:

```bash
cd deliverables/curso-pswe-07
npm install
npm test
npm run lint
```

Expected result: dependencies install successfully, all task-service unit tests pass, and ESLint reports no errors. Unit tests use an independent fake repository and do not depend on browser storage or one another.

## Acceptance checks

Run each story independently. Clear the app's site data before each story if you need a clean initial state.

### Story 1: Create and view tasks

1. Confirm the browser tab/window title and list header show `Curso-PSWE-07`.
2. With no saved tasks, confirm the list displays “No tasks yet. Add one to get started.”
3. Add a task with a title and no description; confirm it appears as Pending. Open it and confirm “No description” is shown.
4. Try to add a blank title, a whitespace-only title, and a title already used by another task; each attempt must be rejected with a validation message.
5. Add a title that differs from an existing one only by capitalization or surrounding spaces; confirm it is also rejected.
6. Add a task with a unique title and description; open its row and confirm both values.
7. Close and reopen the browser, return to the same localhost address, and confirm saved task details and status remain.

### Story 2: Track and filter completion

1. Create one Pending task and mark another Done.
2. Select All, Pending, and Done; verify each filter shows the correct rows and the active filter is highlighted.
3. On a Done row, verify the title is struck through and muted and a status indicator is visible.
4. Open each task and toggle its status in both directions; verify the action label changes and the list reflects the new status.
5. Return from a task detail opened from Pending or Done; verify the same filter remains active.
6. Select a filter with no matches and verify “No tasks match this filter.” appears.

### Story 3: Edit and remove tasks

1. Open a task, select Edit, and verify the form contains its saved title and description plus Save and Cancel.
2. Change both fields and save; verify the detail and list show the updated values.
3. Edit a task title to match another task after trimming spaces and ignoring capitalization; verify the change is rejected and the previous title remains.
4. Make unsaved changes and select Cancel; verify the saved values remain unchanged.
5. Select Delete and cancel the confirmation; verify the task remains saved. Repeat from a filtered list and confirm deletion; verify the app returns to the list with the same filter active and the task absent.

## Responsive and visual checks

- Check both screens at a narrow mobile viewport and a desktop viewport; verify content fits and controls remain usable.
- Measure each touch/click target; it must be at least 44 by 44 pixels.
- Verify light background, generous whitespace, one sans-serif font family, one accent color for primary actions and active filter, larger/bolder titles, muted descriptions and “No description”, distinct warning color for Delete, and WCAG 2.2 AA minimum text contrast.
- Verify no account, category, due date, priority, search, or sync feature is exposed.

## Limitations

Browser storage is local to the same origin/profile and may be cleared by the browser or user. Private browsing can remove it when the session ends. The persistence acceptance check is for a normal browser profile and is not a backup guarantee.
