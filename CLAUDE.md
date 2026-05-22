# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Claude Do's and Dont's

### Don't

- Add comments to the code unless it is JSDocs

### Do

- Add JSDocs to all JavaScript functions

## Project Overview

This is a VS Code extension called "nuwetak" that displays inline git blame information for the currently active line in the editor. It shows the author, commit message, and commit hash next to the line where your cursor is positioned.

**Features:**
- Real-time git blame display as you move your cursor
- Shows author, commit message, and short commit hash
- Debounced updates (300ms) to avoid performance issues
- Handles uncommitted changes gracefully
- Uses VS Code's built-in Git extension API

## Development Commands

```bash
# Install dependencies
npm install
```

## Running and Debugging

To test the extension during development:
1. Open the project in VS Code
2. Press F5 or use "Run Extension" launch configuration
3. A new VS Code window opens with the extension loaded
4. Use `Ctrl+Shift+P` (or `Cmd+Shift+P` on macOS) to access commands

Current commands:
- `Hello World` - Test command that shows an information message

## Testing

- Test framework: Mocha via `@vscode/test-cli`
- Test files: Located in `test/**/*.test.js`
- Test configuration: `.vscode-test.mjs`
- Tests run in a VS Code extension host environment

To run a single test file:
```bash
npx vscode-test test/extension.test.js
```

## Project Structure

```
.
├── extension.js              // Extension entry point
├── lib/
│   ├── format-time.js        // Time formatting utilities
│   ├── git-blame.js          // Git blame execution and parsing
│   ├── decorations.js        // VS Code decoration management
│   └── blame-manager.js      // Blame update coordination
├── .vscode/
│   └── launch.json           // Debug configuration
├── package.json              // Extension manifest
├── LICENSE
└── README.md
```

## Architecture

**Extension Entry Point**: `extension.js` (46 lines)
- Activates Git API
- Creates decoration type
- Registers event listeners
- Delegates to blame manager

**Modules**:
- **`lib/format-time.js`** - Pure utility for relative time formatting ("2 days ago")
- **`lib/git-blame.js`** - Executes git blame command and parses porcelain output
- **`lib/decorations.js`** - Creates and applies VS Code text decorations
- **`lib/blame-manager.js`** - Coordinates blame updates with debouncing
- `activate(context)` - Async function called when extension activates
  - Accesses VS Code's built-in Git extension API
  - Sets up decoration types for blame display
  - Registers event listeners for cursor and editor changes
- `deactivate()` - Called when extension deactivates
- Commands are registered via `vscode.commands.registerCommand()`
- Disposables are pushed to `context.subscriptions` for cleanup

**Git Blame Flow**:
1. Extension activates and gets VS Code's Git API via `vscode.extensions.getExtension('vscode.git')`
2. Cursor position changes trigger `onDidChangeTextEditorSelection` event
3. Debounced update (300ms) prevents excessive git calls
4. Get repository for current file using Git API's `getRepository()`
5. Execute `git blame -L {line},{line} --porcelain` for specific line via `execFile`
6. Parse porcelain output to extract author, summary, and commit hash
7. Apply decoration using `setDecorations()` with `after` content text

**Key Components**:
- **Decoration Type**: Created once with theme-aware colors for blame text
- **Event Listeners**: Track cursor position and active editor changes
- **Git Integration**: Uses repository object from VS Code's Git extension
- **Debouncing**: 300ms timeout prevents performance issues during rapid cursor movement

**Activation**: Extension activates on VS Code startup (`activationEvents: ["*"]`) to enable immediate blame tracking

**VS Code API Version**: Requires VS Code ^1.120.0

## Configuration Files

- `eslint.config.mjs` - ESLint configuration (ES2022, Node + CommonJS + Mocha globals)
- `jsconfig.json` - JavaScript language configuration (Node16 modules, ES2022 target)
- `.vscode/launch.json` - Debug configuration for running the extension
