import * as assert from 'assert';
import { formatRelativeTime } from '../lib/format-time.js';

suite('Format Time Tests', () => {
	test('formats "just now" for recent times', () => {
		const now = new Date();
		const result = formatRelativeTime(now);
		assert.strictEqual(result, 'just now');
	});

	test('formats minutes correctly (singular)', () => {
		const oneMinuteAgo = new Date(Date.now() - 60 * 1000);
		const result = formatRelativeTime(oneMinuteAgo);
		assert.strictEqual(result, '1 minute ago');
	});

	test('formats minutes correctly (plural)', () => {
		const fiveMinutesAgo = new Date(Date.now() - 5 * 60 * 1000);
		const result = formatRelativeTime(fiveMinutesAgo);
		assert.strictEqual(result, '5 minutes ago');
	});

	test('formats hours correctly (singular)', () => {
		const oneHourAgo = new Date(Date.now() - 60 * 60 * 1000);
		const result = formatRelativeTime(oneHourAgo);
		assert.strictEqual(result, '1 hour ago');
	});

	test('formats hours correctly (plural)', () => {
		const threeHoursAgo = new Date(Date.now() - 3 * 60 * 60 * 1000);
		const result = formatRelativeTime(threeHoursAgo);
		assert.strictEqual(result, '3 hours ago');
	});

	test('formats days correctly (singular)', () => {
		const oneDayAgo = new Date(Date.now() - 24 * 60 * 60 * 1000);
		const result = formatRelativeTime(oneDayAgo);
		assert.strictEqual(result, '1 day ago');
	});

	test('formats days correctly (plural)', () => {
		const threeDaysAgo = new Date(Date.now() - 3 * 24 * 60 * 60 * 1000);
		const result = formatRelativeTime(threeDaysAgo);
		assert.strictEqual(result, '3 days ago');
	});

	test('formats weeks correctly', () => {
		const twoWeeksAgo = new Date(Date.now() - 14 * 24 * 60 * 60 * 1000);
		const result = formatRelativeTime(twoWeeksAgo);
		assert.strictEqual(result, '2 weeks ago');
	});

	test('formats months correctly', () => {
		const twoMonthsAgo = new Date(Date.now() - 60 * 24 * 60 * 60 * 1000);
		const result = formatRelativeTime(twoMonthsAgo);
		assert.strictEqual(result, '2 months ago');
	});

	test('formats years correctly (singular)', () => {
		const oneYearAgo = new Date(Date.now() - 365 * 24 * 60 * 60 * 1000);
		const result = formatRelativeTime(oneYearAgo);
		assert.strictEqual(result, '1 year ago');
	});

	test('formats years correctly (plural)', () => {
		const twoYearsAgo = new Date(Date.now() - 2 * 365 * 24 * 60 * 60 * 1000);
		const result = formatRelativeTime(twoYearsAgo);
		assert.strictEqual(result, '2 years ago');
	});
});
