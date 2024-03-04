import prettyMs from 'pretty-ms';
import {escapeLines} from '../arguments/escape.js';
import {verboseLog} from './log.js';
import {getCommandDuration} from './info.js';

// When `verbose` is `short|full`, print each command's completion, duration and error
export const logFinalResult = ({shortMessage, failed}, reject, verboseInfo) => {
	logResult(shortMessage, failed, reject, verboseInfo);
};

// Same but for early validation errors
export const logEarlyResult = (error, verboseInfo) => {
	logResult(escapeLines(String(error)), true, true, verboseInfo);
};

const logResult = (message, failed, reject, {verbose, verboseId, startTime}) => {
	if (verbose === 'none') {
		return;
	}

	const icon = getIcon(failed, reject);
	logDuration(startTime, verboseId, icon);
};

const logDuration = (startTime, verboseId, icon) => {
	const durationMs = getCommandDuration(startTime);
	const durationMessage = `(done in ${prettyMs(durationMs)})`;
	verboseLog(durationMessage, verboseId, icon);
};

const getIcon = (failed, reject) => {
	if (!failed) {
		return 'success';
	}

	return reject ? 'error' : 'warning';
};