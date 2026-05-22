import * as assert from 'assert';
import { parseBlameOutput } from '../lib/git-blame.js';

suite('Git Blame Parser Tests', () => {
	test('parses valid git blame porcelain output', () => {
		const output = `a8c6253ab1c2d3e4f5a6b7c8d9e0f1a2b3c4d5e6 1 1 1
author Herco Bezuidenhout
author-mail <herco@example.com>
author-time 1716279613
author-tz +0200
committer Herco Bezuidenhout
committer-mail <herco@example.com>
committer-time 1716279613
committer-tz +0200
summary Add documentation and gitignore
filename extension.js
	const vscode = require('vscode');`;

		const result = parseBlameOutput(output);

		assert.ok(result);
		assert.strictEqual(result.author, 'Herco Bezuidenhout');
		assert.strictEqual(result.summary, 'Add documentation and gitignore');
		assert.strictEqual(result.hash, 'a8c6253');
		assert.ok(result.date);
	});

	test('returns null for empty output', () => {
		const result = parseBlameOutput('');
		assert.strictEqual(result, null);
	});

	test('handles uncommitted changes (zero hash)', () => {
		const output = `0000000000000000000000000000000000000000 1 1 1
author Not Committed Yet
author-time 0
summary Uncommitted changes
	const vscode = require('vscode');`;

		const result = parseBlameOutput(output);

		assert.ok(result);
		assert.strictEqual(result.author, 'You');
		assert.strictEqual(result.summary, 'Not committed yet');
		assert.strictEqual(result.hash, '');
		assert.strictEqual(result.date, '');
	});

	test('returns null when missing required fields', () => {
		const output = `a8c6253ab1c2d3e4f5g6h7i8j9k0l1m2n3o4p5q6 1 1 1
author-time 1716279613
filename extension.js`;

		const result = parseBlameOutput(output);
		assert.strictEqual(result, null);
	});

	test('handles output without timestamp', () => {
		const output = `a8c6253ab1c2d3e4f5g6h7i8j9k0l1m2n3o4p5q6 1 1 1
author John Doe
summary Fix bug
filename extension.js`;

		const result = parseBlameOutput(output);

		assert.ok(result);
		assert.strictEqual(result.date, '');
	});
});
