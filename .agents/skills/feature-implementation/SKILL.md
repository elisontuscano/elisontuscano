---
name: feature-implementation
description: >-
  Use this skill when the user asks to implement a feature, build functionality
  from a spec or requirement document, or deliver a complete feature end-to-end.
  This skill orchestrates the full implementation lifecycle: creating a feature
  branch, analyzing the spec, implementing the code, ensuring all tests and lint
  checks pass, running iterative multi-agent code reviews until approved, and
  raising a pull request to the development branch.
---

# Feature Implementation Skill

This skill defines the end-to-end procedure for implementing a feature from a
specification. Follow every phase in order. Do NOT skip phases.

> [!IMPORTANT]
> This is a multi-phase workflow. Each phase has explicit entry criteria,
> actions, and exit criteria. Do not proceed to the next phase until all exit
> criteria of the current phase are met.

---

## Phase 0 — Pre-Flight Checks

Before starting any work, validate the environment:

1. **Confirm the development branch exists** and is up to date:
   ```bash
   git fetch origin
   git checkout development
   git pull origin development
   ```
2. **Identify the project's language, framework, and tooling**:
   - Look for `package.json`, `pyproject.toml`, `Cargo.toml`, `go.mod`,
     `pom.xml`, `Makefile`, or equivalent.
   - Identify the test runner (e.g., `pytest`, `jest`, `go test`, `cargo test`).
   - Identify the linter (e.g., `eslint`, `ruff`, `flake8`, `golangci-lint`,
     `clippy`). If none is configured, install and configure one appropriate for
     the project (see [Lint Setup Reference](./references/lint-setup.md)).
3. **Run existing tests** to establish the baseline:
   ```bash
   # Use the project's test command
   <test-command>
   ```
   - If tests fail at this point, **stop and report** to the user. Do not
     proceed with a broken baseline.
4. **Run lint checks** to establish the baseline:
   ```bash
   # Use the project's lint command
   <lint-command>
   ```
   - If linting fails at this point, **stop and report** to the user.

### Exit Criteria — Phase 0
- [ ] On `development` branch, fully up to date with `origin/development`
- [ ] Project language/framework/tooling identified
- [ ] Test runner identified (or noted as absent — will be set up in Phase 3)
- [ ] Linter identified (or will be set up in Phase 3)
- [ ] Baseline tests pass (or no tests exist yet)
- [ ] Baseline lint passes (or no linter configured yet)

---

## Phase 1 — Spec Analysis & Planning

Thoroughly understand what needs to be built before writing any code.

1. **Read the spec/requirement document** provided by the user. If no document
   is provided, ask the user to clarify the requirements before proceeding.
2. **Produce a structured implementation plan** covering:
   - **Goal**: One-sentence summary of the feature.
   - **Acceptance Criteria**: Bullet list of testable conditions that define
     "done."
   - **Affected Files**: List of files that will be created or modified.
   - **Dependencies**: Any new libraries, services, or config changes needed.
   - **Edge Cases & Risks**: Known pitfalls and how they'll be handled.
   - **Test Plan**: What unit tests (and integration tests, if applicable) will
     be added or updated.
3. **Present the plan to the user** and wait for approval before proceeding. Use
   the `/grill-me` command pattern to resolve any ambiguities interactively.

### Exit Criteria — Phase 1
- [ ] Spec fully understood; ambiguities resolved with user
- [ ] Implementation plan produced and approved by user
- [ ] Acceptance criteria defined

---

## Phase 2 — Branch Creation

Create and check out a feature branch from `development`.

1. **Branch naming convention**: `feature/<short-description>`
   - Use lowercase, hyphen-separated words.
   - Example: `feature/user-authentication`, `feature/payment-gateway`
2. **Create and checkout**:
   ```bash
   git checkout development
   git pull origin development
   git checkout -b feature/<short-description>
   ```
3. **Push the branch upstream** immediately to establish tracking:
   ```bash
   git push -u origin feature/<short-description>
   ```

### Exit Criteria — Phase 2
- [ ] Feature branch created from latest `development`
- [ ] Branch pushed to `origin` with tracking set
- [ ] Working tree is clean

---

## Phase 3 — Implementation

Write the code. Follow these principles:

1. **Implement incrementally** — make small, logically coherent commits. Each
   commit should leave the codebase in a working state.
2. **Follow existing project conventions**:
   - Match the existing code style, naming conventions, and file organization.
   - Respect existing abstractions and patterns.
3. **Add or update documentation** (README, inline docstrings, comments) as you
   go.
4. **Handle edge cases** identified in the plan.
5. **Commit messages** must follow Conventional Commits:
   ```
   feat: add user authentication endpoint
   fix: handle null email in validation
   test: add unit tests for auth service
   chore: configure eslint rule for auth module
   ```

### If no test framework exists:
- Set up the appropriate test framework for the project.
- See [Test Setup Reference](./references/test-setup.md) for guidance per
  language.

### If no linter exists:
- Set up an appropriate linter for the project.
- See [Lint Setup Reference](./references/lint-setup.md) for guidance per
  language.

### Exit Criteria — Phase 3
- [ ] All planned functionality implemented
- [ ] Code follows project conventions
- [ ] Changes committed with descriptive messages
- [ ] Documentation updated

---

## Phase 4 — Testing

Ensure correctness with comprehensive tests.

1. **Write unit tests** for all new code:
   - Cover the happy path, edge cases, error handling, and boundary conditions.
   - Aim for meaningful coverage, not just line count.
2. **Run the full test suite**:
   ```bash
   <test-command>
   ```
3. **All existing tests must pass**. If an existing test breaks:
   - Determine if the breakage is expected (API changed intentionally) or a bug.
   - If expected: update the test to match the new behavior, document why.
   - If a bug: fix the implementation, not the test.
4. **All new tests must pass**.
5. **Commit the tests**:
   ```bash
   git add -A
   git commit -m "test: add unit tests for <feature>"
   ```

### Exit Criteria — Phase 4
- [ ] Unit tests written for all new code paths
- [ ] Full test suite passes (0 failures)
- [ ] Tests committed

---

## Phase 5 — Lint & Code Quality

Ensure the code meets quality standards.

1. **Run the linter**:
   ```bash
   <lint-command>
   ```
2. **Fix all lint errors and warnings**. Do NOT suppress warnings without
   justification.
3. **Run the formatter** if the project has one (e.g., `prettier`, `black`,
   `gofmt`):
   ```bash
   <format-command>
   ```
4. **Re-run tests** after any formatting/lint fixes to ensure nothing broke.
5. **Commit lint/format fixes**:
   ```bash
   git add -A
   git commit -m "chore: fix lint and formatting issues"
   ```

### Exit Criteria — Phase 5
- [ ] Linter passes with 0 errors and 0 warnings
- [ ] Formatter applied (if applicable)
- [ ] Tests still pass after lint/format changes
- [ ] Changes committed

---

## Phase 6 — Multi-Agent Code Review (Iterative)

Spawn two review agents and iterate until approval.

> [!IMPORTANT]
> This phase runs in a loop. Do NOT skip to Phase 7 until BOTH reviewers
> approve with no remaining major issues.

### Step 1: Spawn Two Review Agents

Invoke two subagents with distinct review perspectives:

- **Reviewer 1 — "Correctness & Logic Reviewer"**:
  Focuses on functional correctness, logic errors, race conditions, security
  vulnerabilities, error handling gaps, and adherence to the spec/acceptance
  criteria.

- **Reviewer 2 — "Quality & Maintainability Reviewer"**:
  Focuses on code readability, naming, SOLID principles, DRY violations,
  documentation quality, test coverage completeness, and performance concerns.

### Step 2: Provide Review Context

Send each reviewer:
- The implementation plan from Phase 1
- The acceptance criteria
- The diff of all changes: `git diff development...HEAD`
- The list of new/modified files
- The test results and lint results

### Step 3: Collect Review Feedback

Each reviewer produces a structured review with:
- **MAJOR** issues (must fix — bugs, security flaws, spec violations, missing
  tests)
- **MINOR** issues (should fix — style, naming, small improvements)
- **SUGGESTIONS** (optional — nice-to-haves)
- **APPROVED** or **CHANGES REQUESTED** verdict

### Step 4: Process Feedback & Iterate

```
WHILE any reviewer has verdict == "CHANGES REQUESTED" with MAJOR issues:
    1. Fix ALL MAJOR issues raised by both reviewers
    2. Fix MINOR issues where reasonable
    3. Re-run tests → must pass
    4. Re-run lint → must pass
    5. Commit fixes: git commit -m "refactor: address review feedback (round N)"
    6. Re-submit to BOTH reviewers with updated diff
    7. Collect new verdicts
END WHILE
```

### Step 5: Final Approval

Both reviewers must return:
- Verdict: **APPROVED**
- Zero remaining **MAJOR** issues

### Exit Criteria — Phase 6
- [ ] Both reviewers issued APPROVED verdict
- [ ] All MAJOR issues resolved
- [ ] Tests pass after all review fixes
- [ ] Lint passes after all review fixes

---

## Phase 7 — Sync with Development & Raise Pull Request

Ensure no merge conflicts and create the PR.

### Step 1: Sync with Development

```bash
git checkout development
git pull origin development
git checkout feature/<short-description>
git rebase development
```

- If there are **merge conflicts during rebase**:
  1. Resolve each conflict carefully, preserving the intent of both sides.
  2. After resolving: `git add <resolved-files> && git rebase --continue`
  3. Re-run tests after rebase to ensure nothing broke.
  4. Re-run lint after rebase.

### Step 2: Force Push the Rebased Branch

```bash
git push --force-with-lease origin feature/<short-description>
```

### Step 3: Create the Pull Request

Use the GitHub CLI (`gh`) to create the PR:

```bash
gh pr create \
  --base development \
  --head feature/<short-description> \
  --title "feat: <Feature Title>" \
  --body "$(cat <<'EOF'
## Summary
<One-paragraph summary of the feature>

## Changes
<Bullet list of key changes>

## Acceptance Criteria
<Paste acceptance criteria from Phase 1>

## Testing
- [ ] All existing tests pass
- [ ] New unit tests added for <feature>
- [ ] Lint checks pass
- [ ] Code reviewed and approved by 2 reviewers

## Review Notes
- Reviewed iteratively over N rounds
- All MAJOR issues resolved
- See review artifacts for full discussion
EOF
)"
```

If `gh` is not available, provide the user with:
- The exact PR title
- The full PR body/description
- The source branch and target branch
- Instructions to create it manually on GitHub

### Step 4: Post-PR Verification

1. Verify the PR was created successfully.
2. Confirm there are **no merge conflicts** shown on GitHub.
3. Report the PR URL to the user.

### Exit Criteria — Phase 7
- [ ] Feature branch rebased on latest `development`
- [ ] No merge conflicts
- [ ] Tests pass after rebase
- [ ] Lint passes after rebase
- [ ] PR created targeting `development` branch
- [ ] PR description includes summary, changes, acceptance criteria, and test status
- [ ] PR URL reported to user

---

## Quick Reference: Full Workflow Summary

```
Phase 0: Pre-Flight     → Validate environment, baseline tests & lint
Phase 1: Spec Analysis  → Understand requirements, plan, get approval
Phase 2: Branch         → Create feature/<name> from development
Phase 3: Implement      → Write code, follow conventions, commit incrementally
Phase 4: Test           → Write & run tests, all must pass
Phase 5: Lint           → Run linter & formatter, fix all issues
Phase 6: Review Loop    → 2 reviewers, iterate until both approve
Phase 7: PR             → Rebase on development, create PR, verify clean merge
```

---

## Error Recovery

| Situation | Action |
|---|---|
| Baseline tests fail in Phase 0 | Stop and report to user. Do not proceed. |
| Spec is ambiguous | Ask user for clarification. Do not guess. |
| Existing test breaks due to feature | Evaluate if intentional. Update test only if API change is expected. |
| Lint errors cannot be fixed without behavior change | Document and ask user. |
| Reviewer raises a MAJOR issue you disagree with | Respond with justification. If reviewer insists, fix it. |
| Rebase conflicts | Resolve carefully. Re-run tests and lint after resolution. |
| `gh` CLI not available | Provide manual PR instructions to user. |

---

## References

- [Test Setup Reference](./references/test-setup.md) — How to set up test
  frameworks per language
- [Lint Setup Reference](./references/lint-setup.md) — How to set up linters
  per language
- [Review Checklist](./references/review-checklist.md) — Detailed checklist for
  code reviewers
