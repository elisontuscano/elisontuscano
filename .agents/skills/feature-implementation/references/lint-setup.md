# Lint Setup Reference

This reference provides guidance for setting up linters and formatters when a
project does not already have one configured.

---

## Python

### Ruff (Recommended — fast, all-in-one)

```bash
pip install ruff
```

**Minimal config** (`pyproject.toml`):
```toml
[tool.ruff]
target-version = "py311"
line-length = 88

[tool.ruff.lint]
select = [
  "E",    # pycodestyle errors
  "W",    # pycodestyle warnings
  "F",    # pyflakes
  "I",    # isort
  "N",    # pep8-naming
  "UP",   # pyupgrade
  "B",    # flake8-bugbear
  "S",    # flake8-bandit (security)
  "SIM",  # flake8-simplify
]

[tool.ruff.format]
quote-style = "double"
```

**Run**:
```bash
ruff check .            # Lint
ruff check . --fix      # Auto-fix
ruff format .           # Format
```

### Alternative: flake8 + black

```bash
pip install flake8 black isort
```

**Run**:
```bash
flake8 .
black .
isort .
```

---

## JavaScript / TypeScript

### ESLint (Recommended)

```bash
npm install --save-dev eslint @eslint/js
# For TypeScript:
npm install --save-dev typescript-eslint
```

**Minimal config** (`eslint.config.js` — flat config):
```javascript
import js from '@eslint/js';

export default [
  js.configs.recommended,
  {
    rules: {
      'no-unused-vars': 'error',
      'no-console': 'warn',
      'eqeqeq': 'error',
    },
  },
];
```

**For TypeScript** (`eslint.config.js`):
```javascript
import js from '@eslint/js';
import tseslint from 'typescript-eslint';

export default tseslint.config(
  js.configs.recommended,
  ...tseslint.configs.recommended,
);
```

### Prettier (Formatter)

```bash
npm install --save-dev prettier
```

**Minimal config** (`.prettierrc`):
```json
{
  "semi": true,
  "singleQuote": true,
  "trailingComma": "all",
  "printWidth": 80
}
```

**Run**:
```bash
npx eslint .                  # Lint
npx eslint . --fix            # Auto-fix
npx prettier --write .        # Format
npx prettier --check .        # Check format (CI)
```

---

## Go

### golangci-lint (Recommended)

```bash
# macOS
brew install golangci-lint

# Or from source
go install github.com/golangci/golangci-lint/cmd/golangci-lint@latest
```

**Minimal config** (`.golangci.yml`):
```yaml
linters:
  enable:
    - errcheck
    - govet
    - staticcheck
    - unused
    - gosimple
    - ineffassign
    - misspell
    - gofmt
```

### Formatter (built-in)

```bash
gofmt -w .
# or
goimports -w .
```

**Run**:
```bash
golangci-lint run ./...
gofmt -l .                   # List unformatted files
```

---

## Rust

### Clippy (built-in linter)

```bash
rustup component add clippy
```

### Rustfmt (built-in formatter)

```bash
rustup component add rustfmt
```

**Run**:
```bash
cargo clippy -- -D warnings    # Lint (treat warnings as errors)
cargo fmt                      # Format
cargo fmt -- --check           # Check format (CI)
```

---

## Java

### Checkstyle

**Maven** (`pom.xml`):
```xml
<plugin>
  <groupId>org.apache.maven.plugins</groupId>
  <artifactId>maven-checkstyle-plugin</artifactId>
  <version>3.3.0</version>
  <configuration>
    <configLocation>google_checks.xml</configLocation>
  </configuration>
</plugin>
```

### SpotBugs (Bug detection)

```xml
<plugin>
  <groupId>com.github.spotbugs</groupId>
  <artifactId>spotbugs-maven-plugin</artifactId>
  <version>4.7.3.0</version>
</plugin>
```

**Run**:
```bash
mvn checkstyle:check
mvn spotbugs:check
```

---

## Adding Lint to package.json / pyproject.toml Scripts

Always register lint/format commands as project scripts so they are
discoverable:

### package.json
```json
{
  "scripts": {
    "lint": "eslint .",
    "lint:fix": "eslint . --fix",
    "format": "prettier --write .",
    "format:check": "prettier --check ."
  }
}
```

### pyproject.toml
```toml
[project.scripts]
# Or use a Makefile:
```

### Makefile (language-agnostic)
```makefile
.PHONY: lint format test

lint:
	<lint-command>

format:
	<format-command>

test:
	<test-command>
```
