// LEARN check how exactly does the color outputting work
/**
 * Prints a colored console log message to `stdout` without newline.  
 * Supported colors are `gray`, `blue`, `green`, `yellow`, `red` & `magenta`
 * 
 * @param {String} consoleMessage Message to be printed to the console.
 * @param {String} color          Color of the message, can be: `gray`, `blue`, `green`, `yellow`, `red` or `magenta`
 */
export function consoleLogColor(consoleMessage, color) {
	switch (color.toLowerCase()) {
		case "gray":
			/* prints to 'stdout' without newline */
			process.stdout.write('\u001b[' + 90 + 'm' + consoleMessage + '\u001b[0m');
			break;

		case "blue":
			/* prints to 'stdout' without newline */
			process.stdout.write('\u001b[' + 36 + 'm' + consoleMessage + '\u001b[0m');
			break;

		case "green":
			/* prints to 'stdout' without newline */
			process.stdout.write('\u001b[' + 32 + 'm' + consoleMessage + '\u001b[0m');
			break;

		case "yellow":
			/* prints to 'stdout' without newline */
			process.stdout.write('\u001b[' + 33 + 'm' + consoleMessage + '\u001b[0m');
			break;

		case "red":
			/* prints to 'stdout' without newline */
			process.stdout.write('\u001b[' + 31 + 'm' + consoleMessage + '\u001b[0m');
			break;

		case "magenta":
			/* prints to 'stdout' without newline */
			process.stdout.write('\u001b[' + 35 + 'm' + consoleMessage + '\u001b[0m');
			break;

		default:
			// TODO create a proper console error/warning
			consoleLogColor("ERROR:", "red");
			console.log(" consoleLogColor invalid color parameter name");
			// LEARN why does this return undefined?
			// console.log(consoleLogColor("ERROR:", "red"), " consoleLogColor invalid color parameter name");
	}
}

/**
 * Prints a magenta colored timestamp, without a newline, in the following format:  
 * [dd/mm/yyyy-hh:mm:ss]    
 */
export function printTimestamp() {
    /* create a date with the current date/time with the current format:
     * dd/mm/yyyy, hh:mm:ss */
	 var l_timestamp_s = new Date().toLocaleString("en-GB");
	 /* change it to the following format: dd/mm/yyyy-hh:mm:ss */
	 l_timestamp_s = l_timestamp_s.replace(", ", "-");
 
	 consoleLogColor("[" + l_timestamp_s + "]", "magenta");
}

// TODO Create a function or functions for displaying INFO, WARN, ERROR messages;