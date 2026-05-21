import * as vscode from 'vscode';
import { createDecorationType } from './lib/decorations.js';
import { createBlameManager } from './lib/blame-manager.js';

/**
 * @param {vscode.ExtensionContext} context
 */
export async function activate(context) {
	console.log('simple-git extension is now active!');

	const gitExtension = vscode.extensions.getExtension('vscode.git');
	if (!gitExtension) {
		console.error('Git extension not found');
		return;
	}

	const gitExport = await gitExtension.activate();
	const gitApi = gitExport.getAPI(1);

	const blameDecorationType = createDecorationType();
	const blameManager = createBlameManager(gitApi, blameDecorationType);

	context.subscriptions.push(
		vscode.window.onDidChangeTextEditorSelection(event => {
			blameManager.updateBlame(event.textEditor);
		}),
		vscode.window.onDidChangeActiveTextEditor(editor => {
			if (editor) {
				blameManager.updateBlame(editor);
			}
		}),
		blameDecorationType
	);

	if (vscode.window.activeTextEditor) {
		blameManager.updateBlame(vscode.window.activeTextEditor);
	}
}

export function deactivate() {}
