const getApiErrorString = (messages) => Object.keys(messages || {})
	.map((_) => `${_} ${messages[_]}`)
	.join(', ');

export default getApiErrorString;
