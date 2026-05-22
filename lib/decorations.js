import * as vscode from 'vscode';

const DECORATION_MARGIN = '0 0 0 1em';
const DECORATION_COLOR_THEME = 'editorCodeLens.foreground';
const DECORATION_FONT_STYLE = 'italic';
const TEXT_SEPARATOR_COMMA = ', ';
const TEXT_SEPARATOR_BULLET = ' • ';
const TEXT_HASH_PREFIX = '(';
const TEXT_HASH_SUFFIX = ')';
const TEXT_PADDING = '  ';

/**
 * Create decoration type for blame info
 * @returns {vscode.TextEditorDecorationType}
 */
export const createDecorationType = () => {
	return vscode.window.createTextEditorDecorationType({
		after: {
			margin: DECORATION_MARGIN,
			color: new vscode.ThemeColor(DECORATION_COLOR_THEME),
			fontStyle: DECORATION_FONT_STYLE
		}
	});
};

/**
 * Format blame info as display text
 * @param {{author: string, summary: string, hash: string, date: string}} blameInfo
 * @returns {string}
 */
export const formatBlameText = (blameInfo) => {
	const { author, summary, hash, date } = blameInfo;

	if (hash && date) {
		return `${author}${TEXT_SEPARATOR_COMMA}${date}${TEXT_SEPARATOR_BULLET}${summary} ${TEXT_HASH_PREFIX}${hash}${TEXT_HASH_SUFFIX}`;
	} else if (hash) {
		return `${author}${TEXT_SEPARATOR_BULLET}${summary} ${TEXT_HASH_PREFIX}${hash}${TEXT_HASH_SUFFIX}`;
	} else if (author) {
		return `${author}${TEXT_SEPARATOR_BULLET}${summary}`;
	} else {
		return summary;
	}
};

/**
 * Apply blame decoration to a specific line
 * @param {vscode.TextEditor} editor
 * @param {number} line - Line number (0-indexed)
 * @param {{author: string, summary: string, hash: string, date: string}} blameInfo
 * @param {vscode.TextEditorDecorationType} decorationType
 */
export const applyDecoration = (editor, line, blameInfo, decorationType) => {
	const text = formatBlameText(blameInfo);
	const lineText = editor.document.lineAt(line);
	const endOfLine = lineText.range.end;

	const decoration = {
		range: new vscode.Range(line, endOfLine.character, line, endOfLine.character),
		renderOptions: {
			after: {
				contentText: `${TEXT_PADDING}${text}`
			}
		}
	};

	editor.setDecorations(decorationType, [decoration]);
};

/**
 * Clear all blame decorations
 * @param {vscode.TextEditor} editor
 * @param {vscode.TextEditorDecorationType} decorationType
 */
export const clearDecorations = (editor, decorationType) => {
	editor.setDecorations(decorationType, []);
};
