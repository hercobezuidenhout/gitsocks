import * as assert from 'assert';
import * as vscode from 'vscode';

suite('Extension Integration Tests', () => {
	test('Extension should be present', () => {
		assert.ok(vscode.extensions.getExtension('hercobezuidenhout.simple-git'));
	});

	test('Extension should activate', async () => {
		const ext = vscode.extensions.getExtension('hercobezuidenhout.simple-git');
		await ext.activate();
		assert.strictEqual(ext.isActive, true);
	});

	test('Git extension should be available', () => {
		const gitExtension = vscode.extensions.getExtension('vscode.git');
		assert.ok(gitExtension, 'Git extension should be available in VS Code');
	});
});
