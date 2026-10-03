# Test Setup Reference

This reference provides guidance for setting up test frameworks when a project
does not already have one configured.

---

## Python

### pytest (Recommended)

```bash
pip install pytest pytest-cov
```

**Minimal config** (`pyproject.toml`):
```toml
[tool.pytest.ini_options]
testpaths = ["tests"]
python_files = ["test_*.py"]
python_functions = ["test_*"]
addopts = "-v --tb=short"

[tool.coverage.run]
source = ["src"]
```

**Directory structure**:
```
tests/
├── __init__.py
├── conftest.py          # Shared fixtures
├── test_<module>.py     # One test file per module
└── integration/         # Integration tests (optional)
    └── test_<flow>.py
```

**Run**:
```bash
pytest
pytest --cov=src --cov-report=term-missing
```

---

## JavaScript / TypeScript

### Jest (Recommended for Node.js)

```bash
npm install --save-dev jest @types/jest ts-jest
```

**Minimal config** (`jest.config.js`):
```javascript
module.exports = {
  testEnvironment: 'node',
  testMatch: ['**/__tests__/**/*.test.[jt]s', '**/*.test.[jt]s'],
  collectCoverageFrom: ['src/**/*.[jt]s', '!src/**/*.d.ts'],
};
```

**For TypeScript projects**, add:
```javascript
module.exports = {
  preset: 'ts-jest',
  // ... rest of config
};
```

### Vitest (Recommended for Vite projects)

```bash
npm install --save-dev vitest
```

**Minimal config** (`vitest.config.ts`):
```typescript
import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    globals: true,
    environment: 'node',
  },
});
```

**Run**:
```bash
npx jest --coverage
# or
npx vitest run --coverage
```

---

## Go

Go has a built-in test framework. No setup needed.

**Conventions**:
- Test files: `*_test.go` in the same package
- Test functions: `func TestXxx(t *testing.T)`
- Table-driven tests are idiomatic

**Run**:
```bash
go test ./...
go test -v -cover ./...
```

---

## Rust

Rust has a built-in test framework. No setup needed.

**Conventions**:
- Unit tests go in a `#[cfg(test)] mod tests` block within the source file
- Integration tests go in the `tests/` directory

**Run**:
```bash
cargo test
cargo test -- --nocapture   # Show println! output
```

---

## Java

### JUnit 5 (Recommended)

**Maven** (`pom.xml`):
```xml
<dependency>
  <groupId>org.junit.jupiter</groupId>
  <artifactId>junit-jupiter</artifactId>
  <version>5.10.0</version>
  <scope>test</scope>
</dependency>
```

**Gradle** (`build.gradle`):
```groovy
testImplementation 'org.junit.jupiter:junit-jupiter:5.10.0'
```

**Run**:
```bash
mvn test
# or
gradle test
```

---

## General Test Writing Guidelines

1. **Arrange-Act-Assert (AAA)** pattern for every test.
2. **One assertion per test** when practical; multiple related assertions are OK.
3. **Test names should describe the scenario**: `test_login_with_invalid_email_returns_400`.
4. **Cover**:
   - Happy path
   - Error cases / exceptions
   - Edge cases (empty input, null, boundary values)
   - State transitions
5. **Use fixtures/factories** for test data — avoid hardcoding everywhere.
6. **Tests must be independent** — no shared mutable state between tests.
7. **Tests must be fast** — mock external dependencies (network, filesystem, DB).
