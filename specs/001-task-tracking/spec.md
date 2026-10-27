# Feature Specification: Daily Task Tracking

**Feature Branch**: `001-task-tracking`

**Created**: 2026-10-26

**Status**: Draft

**Input**: User description: "Build a simple to-do list application named Curso-PSWE-07 to organize, persist, view, filter, edit, complete, and delete daily tasks, with a clean responsive interface and no features beyond the stated scope."

## Clarifications

### Session 2026-10-26

- Q: Should the app allow two separate tasks to have the same title? → A: No; every task title must be unique.
- Q: Should uniqueness ignore capitalization and spaces at the beginning or end of a title? → A: Yes; compare titles without regard to capitalization and after trimming surrounding spaces.

## User Scenarios & Testing *(mandatory)*

### User Story 1 - Create and View Tasks (Priority: P1)

As a user, I want to add tasks and see them in my list so that I can keep track of daily work.

**Why this priority**: Creating and viewing tasks is the core value of the application.

**Independent Test**: Add a task with a title and optional description, save it, and confirm it appears in the list and remains after closing and reopening the application.

**Acceptance Scenarios**:

1. **Given** the list has no tasks, **When** the user selects “Add task”, enters a non-empty title and an optional description, and saves, **Then** the task appears in the list with Pending status.
2. **Given** the add form is open, **When** the user saves with an empty or whitespace-only title, **Then** the task is not saved and a validation message is shown.
3. **Given** a task with a title already exists, **When** the user tries to save another task with the same title regardless of capitalization or surrounding spaces, **Then** the second task is not saved and a validation message explains that titles must be unique.
4. **Given** the list has saved tasks, **When** the user selects a task row, **Then** the To-Do Detail screen opens for that task.
5. **Given** a task has been saved, **When** the application is closed and reopened, **Then** the task and its latest title, description, and status are still available.
6. **Given** the user opens the To-Do List screen, **Then** its header and the application/window title show “Curso-PSWE-07”.
7. **Given** either screen is displayed on a mobile or desktop viewport, **Then** the layout adapts, all interactive targets are at least 44 by 44 pixels, the background is light, a single sans-serif font family is used, titles are larger and bolder than descriptions, and text meets WCAG 2.2 AA contrast minimums.

---

### User Story 2 - Track and Filter Completion (Priority: P2)

As a user, I want to mark tasks done or pending and filter the list by status so that I can focus on the work I need to do.

**Why this priority**: Status and filters let users distinguish active work from completed work.

**Independent Test**: Create pending and completed tasks, switch among All, Pending, and Done, and verify the visible rows and active filter.

**Acceptance Scenarios**:

1. **Given** a task is Pending, **When** the user selects “Mark as done” on its detail screen, **Then** its status becomes Done and the available action changes to “Mark as not done”.
2. **Given** a task is Done, **When** the user selects “Mark as not done”, **Then** its status becomes Pending and the available action changes to “Mark as done”.
3. **Given** the list contains Pending and Done tasks, **When** the user selects Pending or Done, **Then** only tasks with that status appear and the selected filter is highlighted.
4. **Given** a task is Done, **When** it appears in the list, **Then** its title is struck through and shown in a muted color, with a visible status indicator.
5. **Given** no tasks exist, **When** the list is shown, **Then** it displays “No tasks yet. Add one to get started.”
6. **Given** no tasks match the selected filter, **When** the list is shown, **Then** it displays “No tasks match this filter.”
7. **Given** the user opens a task from the Pending or Done filter, **When** the user returns from detail using the back control, **Then** the same filter remains active.

---

### User Story 3 - Edit and Remove Tasks (Priority: P2)

As a user, I want to edit task details or remove a task so that my list stays accurate.

**Why this priority**: Users need to correct task details and remove tasks they no longer need.

**Independent Test**: Open a task, edit and save its details, then request deletion and verify both confirmation and the final list result.

**Acceptance Scenarios**:

1. **Given** a task detail is open, **When** the user selects Edit, **Then** the add-task form opens with the current title and description, plus Save and Cancel actions.
2. **Given** edit mode is open, **When** the user changes the title or description and selects Save, **Then** the detail and list show the updated values.
3. **Given** edit mode is open with unsaved changes, **When** the user selects Cancel, **Then** the changes are discarded and the task retains its previously saved values.
4. **Given** a task has no description, **When** its detail is shown, **Then** the description area displays muted “No description” text.
5. **Given** a task detail is open from a filtered list, **When** the user selects Delete, **Then** a confirmation is requested; confirming removes the task and returns to the list with the same filter active, while cancelling preserves the task.
6. **Given** a task detail is open, **Then** it shows a back control, the task title, description or “No description”, a Done or Pending label, and Edit, status-toggle, and Delete actions. Delete is visually distinct with a warning color.
7. **Given** another task has a title, **When** the user edits this task to that same title with different capitalization or surrounding spaces and saves, **Then** the change is rejected and the previously saved title remains.

### Edge Cases

- The list displays “No tasks yet. Add one to get started.” when there are no saved tasks and “No tasks match this filter.” when the active filter has no matches.
- An empty or whitespace-only title cannot be saved; the form explains the validation error.
- Cancelling deletion leaves the task unchanged.
- Cancelling edit mode discards unsaved changes.
- Completing or editing a task updates its list row and remains saved after the application is reopened.

## Requirements *(mandatory)*

### Functional Requirements

- **FR-001**: The To-Do List screen MUST display the “Curso-PSWE-07” header, an Add task action, and All, Pending, and Done filters.
- **FR-002**: Users MUST be able to create a task with a required, unique title and optional description.
- **FR-003**: The system MUST reject a missing or whitespace-only title and show a validation message.
- **FR-004**: Each list row MUST show a status indicator and task title; Done titles MUST be struck through and muted.
- **FR-005**: Selecting a task row MUST open its To-Do Detail screen.
- **FR-006**: The filters MUST show all tasks, only Pending tasks, or only Done tasks, as selected; the active filter MUST be highlighted.
- **FR-007**: The list MUST show “No tasks yet. Add one to get started.” when there are no tasks and “No tasks match this filter.” when no tasks match the selected filter.
- **FR-008**: The detail screen MUST provide a back control, title, description or muted “No description” text, visible Done or Pending status, and Edit, status-toggle, and Delete actions.
- **FR-009**: Users MUST be able to change a task's title and description in edit mode; the form MUST offer Save and Cancel and validate the title.
- **FR-010**: Users MUST be able to toggle task status between Done and Pending; the action label MUST indicate the available transition.
- **FR-011**: Deletion MUST require confirmation; confirming MUST remove the task and return to the list, while cancelling MUST preserve the task.
- **FR-012**: The system MUST retain tasks and their latest saved values after the application is closed and reopened.
- **FR-013**: The application/window title MUST be “Curso-PSWE-07”.
- **FR-014**: The interface MUST use a light background, generous whitespace, one accent color for primary actions and the active filter, and one sans-serif font family. Titles MUST be larger and bolder than descriptions, and text MUST meet WCAG 2.2 AA contrast minimums.
- **FR-015**: Interactive touch and click targets MUST be at least 44 by 44 pixels, and the layout MUST adapt to mobile and desktop screen sizes.
- **FR-016**: The Delete action MUST use a distinct warning color.
- **FR-017**: The application MUST NOT include accounts, categories, due dates, priorities, search, or synchronization. Acceptance: neither screen offers these capabilities.
- **FR-018**: The system MUST compare titles after trimming surrounding spaces and without regard to capitalization. It MUST reject a title that matches another task by this rule, show a validation message, and preserve the previous title when an edit is rejected.
- **FR-019**: The system MUST preserve the active list filter when the user returns from task detail using the back control or after confirming deletion.

### Key Entities *(include if feature involves data)*

- **Task**: A daily item with a required title that is unique after trimming surrounding spaces and ignoring capitalization, an optional description, and completion status of Done or Pending.

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: Users can create, open, edit, toggle completion, and confirm deletion of tasks through the described screens and actions.
- **SC-002**: 100% of saved tasks retain their latest title, description, and status after the application is closed and reopened.
- **SC-003**: For every task list state, All shows every task, Pending shows only pending tasks, and Done shows only completed tasks.
- **SC-004**: Every interactive target measures at least 44 by 44 pixels, and the list and detail screens remain usable at mobile and desktop viewport sizes.
- **SC-005**: Every user story's acceptance scenarios pass, including title validation, empty states, cancellation, and deletion confirmation.
- **SC-006**: Both screens use the specified visual design, and text contrast meets WCAG 2.2 AA minimums.

## Assumptions

- The application is used by one person on one device; tasks persist on that device, with no account or cross-device synchronization.
- “Not done” is presented as “Pending” in status labels and list filters.
- A title containing only whitespace is treated as empty.
- Task titles are saved without surrounding spaces, and uniqueness is case-insensitive.
- The form used to add a task is reused to edit it, as requested.
- WCAG 2.2 AA is the measurable interpretation of “sufficient text contrast”.
