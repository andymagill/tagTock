/**
 * Formats a duration in milliseconds as a string in the format "HH:mm:ss".
 *
 * @param {number} ms - The duration in milliseconds.
 * @returns {string} The formatted time string.
 */
export function formatTime(ms) {
	const seconds = Math.floor(ms / 1000) % 60;
	const minutes = Math.floor(ms / (1000 * 60)) % 60;
	const hours = Math.floor(ms / (1000 * 60 * 60));
	return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
}

/**
 * Converts a duration in milliseconds to an array of hours, minutes, and seconds.
 *
 * @param {number} ms - The duration in milliseconds.
 * @returns {Array<string>} An array containing the hours, minutes, and seconds as strings.
 */
export function convertDuration(ms) {
	const seconds = Math.floor(ms / 1000) % 60;
	const minutes = Math.floor(ms / (1000 * 60)) % 60;
	const hours = Math.floor(ms / (1000 * 60 * 60));

	return [
		hours.toString().padStart(2, '0'),
		minutes.toString().padStart(2, '0'),
		seconds.toString().padStart(2, '0')
	];
}
/**
 * Formats a duration in milliseconds as a string in the format "HH:mm:ss".
 *
 * @param {number} ms - The duration in milliseconds.
 * @returns {string} The formatted time string.
 */
export function getTimerHTML(ms) {
	const seconds = Math.floor(ms / 1000) % 60;
	const minutes = Math.floor(ms / (1000 * 60)) % 60;
	const hours = Math.floor(ms / (1000 * 60 * 60));
	return `
		<span>${hours.toString().padStart(2, '0')}</span>
		<span>${minutes.toString().padStart(2, '0')}</span>
		<span>${seconds.toString().padStart(2, '0')}</span>
	`;
}

/**
 * Formats a duration in milliseconds as a string (e.g. "1h 2m 3s").
 *
 * @param {number} ms - The duration in milliseconds.
 * @returns {string} The formatted duration string.
 */
export function formatDuration(ms) {
	const seconds = Math.floor(ms / 1000) % 60;
	const minutes = Math.floor(ms / (1000 * 60)) % 60;
	const hours = Math.floor(ms / (1000 * 60 * 60));
	return `${hours}h ${minutes}m ${seconds}s`;
}

/**
 * Formats a date string as a short string (e.g. "Jan 12, 3pm").
 *
 * @param {string} dateStr - The date string to format (e.g. "2023-01-12T14:30:00").
 * @returns {string} The formatted date string.
 */
export function formatDateShort(dateStr) {
	const date = new Date(dateStr);
	return new Intl.DateTimeFormat('en-US', {
		month: 'short',
		day: 'numeric',
		hour: 'numeric',
		hour12: true
	}).format(date);
}

/**
 * Formats a date string as a long string (e.g. "January 12, 2023, 2:30pm").
 *
 * @param {string} dateStr - The date string to format (e.g. "2023-01-12T14:30:00").
 * @returns {string} The formatted date string.
 */
export function formatDateLong(dateStr) {
	const date = new Date(dateStr);
	return new Intl.DateTimeFormat('en-US', {
		month: 'long',
		day: 'numeric',
		year: 'numeric',
		hour: 'numeric',
		minute: 'numeric',
		hour12: true
	}).format(date);
}
