const MILLISECONDS_PER_SECOND = 1000;
const SECONDS_PER_MINUTE = 60;
const MINUTES_PER_HOUR = 60;
const HOURS_PER_DAY = 24;
const DAYS_PER_WEEK = 7;
const DAYS_PER_MONTH = 30;
const DAYS_PER_YEAR = 365;
const WEEKS_PER_MONTH = 4;
const MONTHS_PER_YEAR = 12;

/**
 * Format a date as relative time (e.g., "2 days ago")
 * @param {Date} date - The date to format
 * @returns {string} Formatted relative time
 */
export const formatRelativeTime = (date) => {
	const now = new Date();
	const diffMs = now - date;
	const diffSeconds = Math.floor(diffMs / MILLISECONDS_PER_SECOND);
	const diffMinutes = Math.floor(diffSeconds / SECONDS_PER_MINUTE);
	const diffHours = Math.floor(diffMinutes / MINUTES_PER_HOUR);
	const diffDays = Math.floor(diffHours / HOURS_PER_DAY);
	const diffWeeks = Math.floor(diffDays / DAYS_PER_WEEK);
	const diffMonths = Math.floor(diffDays / DAYS_PER_MONTH);
	const diffYears = Math.floor(diffDays / DAYS_PER_YEAR);

	if (diffSeconds < SECONDS_PER_MINUTE) return 'just now';
	if (diffMinutes < MINUTES_PER_HOUR) return `${diffMinutes} minute${diffMinutes > 1 ? 's' : ''} ago`;
	if (diffHours < HOURS_PER_DAY) return `${diffHours} hour${diffHours > 1 ? 's' : ''} ago`;
	if (diffDays < DAYS_PER_WEEK) return `${diffDays} day${diffDays > 1 ? 's' : ''} ago`;
	if (diffWeeks < WEEKS_PER_MONTH) return `${diffWeeks} week${diffWeeks > 1 ? 's' : ''} ago`;
	if (diffMonths < MONTHS_PER_YEAR) return `${diffMonths} month${diffMonths > 1 ? 's' : ''} ago`;
	return `${diffYears} year${diffYears > 1 ? 's' : ''} ago`;
};
