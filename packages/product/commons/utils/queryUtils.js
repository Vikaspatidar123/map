export function encodeUuid(uuid) {
	const uuidBytes = uuid.replace(/-/g, '')
		.match(/.{2}/g)
		.map((byteStr) => parseInt(byteStr, 16));

	const encoded = btoa(String.fromCharCode(...uuidBytes));

	return encoded;
}

export function decodeUuid(encodedUuid) {
	try {
		const decodedBytes = atob(encodedUuid)
			.split('')
			.map((char) => char.charCodeAt(0));

		const hexUuid = decodedBytes.map((byte) => byte.toString(16).padStart(2, '0'))
			.join('');
		const uuid = [
			hexUuid.slice(0, 8),
			'-',
			hexUuid.slice(8, 12),
			'-',
			hexUuid.slice(12, 16),
			'-',
			hexUuid.slice(16, 20),
			'-',
			hexUuid.slice(20),
		].join('');
		return uuid;
	} catch (e) {
		return encodedUuid;
	}
}
