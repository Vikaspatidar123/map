function toTitleCase(str) {
	if (typeof str === 'string' || str instanceof String) {
		return str.replace(
			/\w\S*/g,
			(txt) => txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase(),
		);
	}
	return '';
}
export default toTitleCase;
