import * as assert from 'assert';
import { formatBlameText } from '../lib/decorations.js';

suite('Decorations Tests', () => {
	test('formats blame with hash and date', () => {
		const blameInfo = {
			author: 'John Doe',
			summary: 'Add feature',
			hash: 'abc1234',
			date: '2 days ago'
		};

		const result = formatBlameText(blameInfo);
		assert.strictEqual(result, 'John Doe, 2 days ago • Add feature (abc1234)');
	});

	test('formats blame with hash but no date', () => {
		const blameInfo = {
			author: 'Jane Smith',
			summary: 'Fix bug',
			hash: 'def5678',
			date: ''
		};

		const result = formatBlameText(blameInfo);
		assert.strictEqual(result, 'Jane Smith • Fix bug (def5678)');
	});

	test('formats blame with author but no hash', () => {
		const blameInfo = {
			author: 'Bob Johnson',
			summary: 'Update docs',
			hash: '',
			date: ''
		};

		const result = formatBlameText(blameInfo);
		assert.strictEqual(result, 'Bob Johnson • Update docs');
	});

	test('formats uncommitted changes (no author)', () => {
		const blameInfo = {
			author: '',
			summary: 'Uncommitted changes',
			hash: '',
			date: ''
		};

		const result = formatBlameText(blameInfo);
		assert.strictEqual(result, 'Uncommitted changes');
	});

	test('handles empty summary', () => {
		const blameInfo = {
			author: 'Alice Brown',
			summary: '',
			hash: 'xyz9876',
			date: '1 hour ago'
		};

		const result = formatBlameText(blameInfo);
		assert.strictEqual(result, 'Alice Brown, 1 hour ago •  (xyz9876)');
	});
});
