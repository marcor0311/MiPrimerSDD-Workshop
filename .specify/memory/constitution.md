<!-- Sync Impact Report
Version change: unratified scaffold → 1.0.0
Modified principles: none
Added sections: six project principles; Plan and Quality Gates; Compliance Review
Removed sections: placeholder-only scaffold sections
Follow-up TODOs: none
-->
# Curso-PSWE-07 Constitution

## Core Principles

### I. Simplicity First (YAGNI)
Implementations MUST satisfy only requirements in the spec and MUST use the simplest working solution. Added complexity MUST be justified in the plan. Rationale: unnecessary features and abstractions increase maintenance cost.

### II. Simple, Clear Design
Code MUST use small, single-responsibility functions and modules with intention-revealing names. It MUST NOT abstract one-off logic, remove duplication without a real repeated pattern, or optimize prematurely. Rationale: direct designs are easier to understand and change.

### III. Structured Architecture
Code MUST separate UI, application logic, and persistence, with dependencies flowing UI → logic → persistence. UI MUST NOT access storage directly; persistence MUST be behind a small replaceable interface. Rationale: clear boundaries keep behavior testable and storage replaceable.

### IV. Test-Driven Development (Non-Negotiable)
Production code MUST follow Red-Green-Refactor, beginning with a failing test; no production code may be added without a test requiring it. Business logic MUST have unit tests, each user story MUST have an acceptance test for its acceptance scenarios, and tests MUST be fast and independent. Rationale: tests demonstrate required behavior and catch regressions early.

### V. Spec Is the Source of Truth
Every implementation task MUST trace to a spec requirement; anything not specified is out of scope. Ambiguous requirements MUST be clarified before implementation. Rationale: traceability prevents unrequested work and incorrect assumptions.

### VI. Dependencies and Quality
Projects MUST prefer the standard library and platform features; a third-party dependency MUST be added only when it removes more complexity than it introduces. Code MUST pass linting and all tests before it is considered done. Rationale: fewer dependencies and enforced quality gates reduce maintenance and defects.

## Plan and Quality Gates

Every plan MUST include a “Constitution Check” that verifies compliance with these principles before implementation begins.

## Compliance Review

Plans and completed work MUST be reviewed against this constitution; any exception MUST be justified in writing in the plan.

## Governance

This constitution overrides other practices. Amendments MUST include a written rationale and a version bump. Reviews MUST verify compliance before work is considered complete.

**Version**: 1.0.0 | **Ratified**: 2026-10-26 | **Last Amended**: 2026-10-26
