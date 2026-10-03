# Code Review Checklist

This checklist is used by the two review agents during Phase 6. Each reviewer
focuses on their assigned perspective but may flag issues from either category.

---

## Reviewer 1 — Correctness & Logic

### Functional Correctness
- [ ] Does the implementation satisfy ALL acceptance criteria from the spec?
- [ ] Are all edge cases handled (null, empty, boundary values, overflow)?
- [ ] Are error paths handled gracefully (try/catch, error returns, fallbacks)?
- [ ] Are there any off-by-one errors in loops or array indexing?
- [ ] Are race conditions possible in concurrent code?
- [ ] Is data validated at trust boundaries (user input, API responses)?

### Security
- [ ] No hardcoded secrets, API keys, or passwords
- [ ] User input is sanitized/escaped before use in queries, commands, or HTML
- [ ] Authentication and authorization checks are in place where needed
- [ ] Sensitive data is not logged or exposed in error messages
- [ ] Dependencies are from trusted sources and reasonably up to date

### Data Integrity
- [ ] Database transactions are used where atomicity is needed
- [ ] State mutations are consistent and predictable
- [ ] No data loss scenarios in error paths

### Spec Compliance
- [ ] Every acceptance criterion has a corresponding test
- [ ] No features beyond what the spec requires (no scope creep)
- [ ] API contracts match the spec (routes, request/response shapes, status codes)

---

## Reviewer 2 — Quality & Maintainability

### Code Readability
- [ ] Variable and function names are clear and descriptive
- [ ] Functions are focused (single responsibility)
- [ ] No overly complex expressions — break them up if hard to read
- [ ] Comments explain **why**, not **what** (code should be self-documenting)
- [ ] Magic numbers and strings are replaced with named constants

### Architecture & Design
- [ ] SOLID principles are followed where applicable
- [ ] No unnecessary coupling between modules
- [ ] DRY — no significant code duplication
- [ ] Abstractions are at the right level (not over- or under-engineered)
- [ ] New code fits the existing architecture patterns

### Test Quality
- [ ] Tests cover happy path, error cases, and edge cases
- [ ] Test names clearly describe the scenario being tested
- [ ] Tests are independent — no shared mutable state
- [ ] No flaky tests (network calls, timing, random data without seeds)
- [ ] Mocks/stubs are used appropriately for external dependencies
- [ ] Test coverage is meaningful (not just line coverage)

### Performance
- [ ] No obvious N+1 query patterns
- [ ] No unnecessary allocations in hot paths
- [ ] Large collections use streaming/pagination where appropriate
- [ ] Caching is used where beneficial and invalidated correctly

### Documentation
- [ ] Public APIs have documentation (docstrings, JSDoc, GoDoc)
- [ ] README updated if the feature changes setup, usage, or configuration
- [ ] Breaking changes are documented
- [ ] Complex algorithms have explanatory comments

---

## Review Verdicts

Each reviewer MUST end their review with one of:

### APPROVED
> No remaining MAJOR issues. Minor issues and suggestions are optional to fix.

### CHANGES REQUESTED
> One or more MAJOR issues must be fixed before approval.

When issuing CHANGES REQUESTED, clearly list:
1. Each MAJOR issue with:
   - File and line number
   - Description of the problem
   - Suggested fix
2. Each MINOR issue (same format)
3. Any SUGGESTIONS (nice-to-haves)

---

## Issue Severity Definitions

| Severity | Definition | Must Fix? |
|---|---|---|
| **MAJOR** | Bugs, security flaws, spec violations, missing error handling, missing tests for critical paths | Yes — blocks approval |
| **MINOR** | Naming improvements, minor style issues, small refactors, non-critical documentation | Should fix, but won't block |
| **SUGGESTION** | Alternative approaches, performance micro-optimizations, nice-to-have improvements | Optional |
