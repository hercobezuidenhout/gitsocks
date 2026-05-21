# Gitsocks

A lightweight VS Code extension that displays inline git blame information for the currently active line in your editor.

## Features

- **Real-time blame annotations**: See git blame information as you move your cursor
- **Inline display**: Blame info appears at the end of each line
- **Comprehensive details**: Shows author, relative commit time, commit message, and short hash
- **Uncommitted change detection**: Displays "Uncommitted changes" for files not yet in git history
- **Fast and responsive**: 50ms debounce ensures smooth performance
- **Theme-aware**: Uses your editor's CodeLens colors for seamless integration

## How It Works

Simply open any file in a git repository and move your cursor. The git blame information will appear at the end of the current line:

```
Author Name, 2 days ago • Commit message (abc1234)
```

For uncommitted files, you'll see:
```
Uncommitted changes
```

## Requirements

- VS Code 1.120.0 or higher
- A git repository

## Extension Settings

This extension does not contribute any settings. It works automatically when you open files in a git repository.

## Contributing

Contributions are welcome! Please follow these guidelines:

### Commit Messages

This project follows [Conventional Commits](https://www.conventionalcommits.org/en/v1.0.0/). Use the following format:

```
<type>: <description>

[optional body]

[optional footer(s)]
```

**Common types:**
- `feat:` - New feature
- `fix:` - Bug fix
- `docs:` - Documentation changes
- `test:` - Test additions or changes
- `refactor:` - Code refactoring
- `chore:` - Maintenance tasks

**Examples:**
```
feat: add configuration option for blame text color
fix: handle files with no git history
docs: update installation instructions
```

### Workflow

1. Fork the repository
2. Create a feature branch (`git checkout -b feat/your-feature`)
3. Make your changes with conventional commits
4. Run tests: `npm test`
5. Submit a pull request

### Pull Request Guidelines

- **Trunk-based development**: All PRs will be squashed into `main` when merged
- **Issue tracking**: Link your PR to a GitHub issue (e.g., "Closes #123")
- **CHANGELOG entries**: Each entry must reference a GitHub issue for tracking (e.g., "- Added feature X [#123](https://github.com/hercobezuidenhout/gitsocks/issues/123)")
