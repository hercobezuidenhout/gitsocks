import { execFile } from 'child_process';
import * as path from 'path';
import { formatRelativeTime } from './format-time.js';

const PORCELAIN_AUTHOR_PREFIX = 'author ';
const PORCELAIN_SUMMARY_PREFIX = 'summary ';
const PORCELAIN_AUTHOR_TIME_PREFIX = 'author-time ';
const AUTHOR_PREFIX_LENGTH = 7;
const SUMMARY_PREFIX_LENGTH = 8;
const AUTHOR_TIME_PREFIX_LENGTH = 12;
const FULL_HASH_LENGTH = 40;
const SHORT_HASH_LENGTH = 7;
const UNCOMMITTED_HASH_PREFIX = '0000000';
const UNCOMMITTED_AUTHOR = 'You';
const UNCOMMITTED_SUMMARY = 'Not committed yet';
const UNCOMMITTED_CHANGES_SUMMARY = 'Uncommitted changes';
const MILLISECONDS_PER_SECOND = 1000;

/**
 * Parse git blame porcelain output
 * @param {string} output - Git blame output
 * @returns {{author: string, summary: string, hash: string, date: string} | null}
 */
export const parseBlameOutput = (output) => {
	const lines = output.split('\n');
	if (lines.length === 0) return null;

	let hash = '';
	let author = '';
	let summary = '';
	let authorTime = '';

	for (const line of lines) {
		if (line.startsWith(PORCELAIN_AUTHOR_PREFIX)) {
			author = line.substring(AUTHOR_PREFIX_LENGTH);
		} else if (line.startsWith(PORCELAIN_SUMMARY_PREFIX)) {
			summary = line.substring(SUMMARY_PREFIX_LENGTH);
		} else if (line.startsWith(PORCELAIN_AUTHOR_TIME_PREFIX)) {
			authorTime = line.substring(AUTHOR_TIME_PREFIX_LENGTH);
		} else if (!hash && line.match(new RegExp(`^[0-9a-f]{${FULL_HASH_LENGTH}}`))) {
			hash = line.substring(0, SHORT_HASH_LENGTH);
		}
	}

	if (hash.startsWith(UNCOMMITTED_HASH_PREFIX)) {
		return { author: UNCOMMITTED_AUTHOR, summary: UNCOMMITTED_SUMMARY, hash: '', date: '' };
	}

	let date = '';
	if (authorTime) {
		const timestamp = parseInt(authorTime) * MILLISECONDS_PER_SECOND;
		const commitDate = new Date(timestamp);
		date = formatRelativeTime(commitDate);
	}

	return author && summary ? { author, summary, hash, date } : null;
};

const GIT_COMMAND = 'git';
const GIT_BLAME_COMMAND = 'blame';
const GIT_LINE_RANGE_FLAG = '-L';
const GIT_PORCELAIN_FLAG = '--porcelain';
const GIT_FILE_SEPARATOR = '--';
const GIT_LINE_INDEX_OFFSET = 1;
const GIT_ERROR_NO_SUCH_PATH = 'no such path';
const GIT_ERROR_IN_HEAD = 'in HEAD';

/**
 * Execute git blame for a specific line
 * @param {any} repo - Git repository object
 * @param {string} filePath - Absolute file path
 * @param {number} line - Line number (0-indexed)
 * @returns {Promise<{author: string, summary: string, hash: string, date: string} | null>}
 */
export const executeGitBlame = (repo, filePath, line) => {
	return new Promise((resolve) => {
		try {
			const repoRoot = repo.rootUri.fsPath;
			const relativePath = path.relative(repoRoot, filePath);
			const lineNum = line + GIT_LINE_INDEX_OFFSET;

			execFile(
				GIT_COMMAND,
				[GIT_BLAME_COMMAND, GIT_LINE_RANGE_FLAG, `${lineNum},${lineNum}`, GIT_PORCELAIN_FLAG, GIT_FILE_SEPARATOR, relativePath],
				{ cwd: repoRoot },
				(error, stdout) => {
					if (error) {
						if (error.message.includes(GIT_ERROR_NO_SUCH_PATH) || error.message.includes(GIT_ERROR_IN_HEAD)) {
							resolve({
								author: '',
								summary: UNCOMMITTED_CHANGES_SUMMARY,
								hash: '',
								date: ''
							});
						} else {
							resolve(null);
						}
						return;
					}

					const blameInfo = parseBlameOutput(stdout);
					resolve(blameInfo);
				}
			);
		} catch (error) {
			console.error('Error executing git blame:', error);
			resolve(null);
		}
	});
};
