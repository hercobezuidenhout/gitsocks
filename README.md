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

## Known Issues

None at this time. Please report issues on the [GitHub repository](https://github.com/hercobezuidenhout/gitsocks/issues).

## Release Notes

### 0.0.1

Initial release of Gitsocks:
- Inline git blame annotations
- Real-time updates as cursor moves
- Relative time formatting (e.g., "2 days ago")
- Support for uncommitted changes
- Theme-aware styling

## Resources

- [VS Code Extension API Documentation](https://code.visualstudio.com/api) - Learn more about building VS Code extensions

## License

MIT

---

**Enjoy!**
