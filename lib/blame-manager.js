import { executeGitBlame } from './git-blame.js';
import { applyDecoration, clearDecorations } from './decorations.js';

const DEBOUNCE_DELAY_MS = 50;
const FILE_SCHEME = 'file';

/**
 * Creates a blame manager that handles blame updates with debouncing
 * @param {any} gitApi - VS Code Git API
 * @param {vscode.TextEditorDecorationType} decorationType
 * @returns {{updateBlame: Function, dispose: Function}}
 */
export const createBlameManager = (gitApi, decorationType) => {
	let debounceTimer;

	const updateBlame = async (editor) => {
		if (!editor || !editor.document) {
			return;
		}

		clearTimeout(debounceTimer);

		debounceTimer = setTimeout(async () => {
			const line = editor.selection.active.line;
			const repo = gitApi.getRepository(editor.document.uri);

			if (repo && editor.document.uri.scheme === FILE_SCHEME) {
				const blameInfo = await executeGitBlame(repo, editor.document.uri.fsPath, line);

				if (blameInfo) {
					applyDecoration(editor, line, blameInfo, decorationType);
				} else {
					clearDecorations(editor, decorationType);
				}
			} else {
				clearDecorations(editor, decorationType);
			}
		}, DEBOUNCE_DELAY_MS);
	};

	const dispose = () => {
		clearTimeout(debounceTimer);
	};

	return { updateBlame, dispose };
};
