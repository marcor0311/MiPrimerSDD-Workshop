# Data Model: Daily Task Tracking

## Task

Represents one item in the user's personal list.

| Field | Meaning | Rules |
|---|---|---|
| `id` | Stable internal identity for selecting and editing a task | Required; unique; not shown to the user. It remains stable when the title changes. |
| `title` | Short task name | Required; non-empty after trimming surrounding whitespace; unique after trimming and case-insensitive comparison. |
| `description` | Optional supporting detail | May be empty or absent. When empty or absent, detail view shows “No description”. |
| `status` | Completion state | Required; one of `Pending` or `Done`; new tasks start `Pending`. |

## Relationships

- A single local task list contains zero or more tasks.
- Tasks have no parent, category, owner account, or relationship to another task.

## State Transitions

- Create produces a `Pending` task.
- The status action changes `Pending` to `Done` or `Done` to `Pending`.
- Confirmed deletion removes the task from the list; cancelling confirmation leaves it unchanged.
- A create or edit that would duplicate another task's normalized title is rejected; an edit rejection preserves the saved task.

## Persistence Notes

- The complete list is retained across normal close/reopen in the same browser profile and origin.
- No timestamps, history, synchronization state, or other fields are required by the spec.
