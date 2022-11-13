/**
 * Converts a string to camel case. So "hello world" becomes "helloWorld".
 * 
 * @param str the string to convert
 * @returns the camelCase string
 */
 function camelize(str : string) {
    return str.replace(/(?:^\w|[A-Z]|\b\w|\s+)/g, function(match, index) {
      if (+match === 0) return ""; // or if (/\s+/.test(match)) for white spaces
      return index === 0 ? match.toLowerCase() : match.toUpperCase();
    });
}

/**
 * Converts a camelCase string to a string with spaces. So "helloWorld" becomes "Hello World".
 * 
 * @param str the string to convert
 * @param separator the separator to use, defaults to a space
 * @returns the string with spaces and deCamelized
 */
function deCamelize(str : string, separator : string = ' ') {
	const newStr = str
        .replace(/([a-z\d])([A-Z])/g, '$1' + separator + '$2')
        .replace(/([A-Z]+)([A-Z][a-z\d]+)/g, '$1' + separator + '$2');

    return newStr.charAt(0).toUpperCase() + newStr.slice(1);
}

export {
    camelize,
    deCamelize
}