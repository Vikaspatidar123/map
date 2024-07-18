export const getCookieFromCtx = (name, ctx) => {
	try {
		const cookieString = ctx?.req?.headers?.cookie || '';
		const arr = cookieString.match(new RegExp(`${name}=([^;]+)`)) || [];
		return arr[1];
	} catch (err) {
		return null;
	}
};

export const getCookieFromBrowser = (name) => {
	if (typeof window !== 'undefined') {
		try {
			// eslint-disable-next-line no-undef
			const arr = document.cookie.match(new RegExp(`${name}=([^;]+)`)) || [];
			return arr[1];
		} catch (err) {
			return null;
		}
	}
	return null;
};

export const getCookie = (name, ctx) => {
	let cookie;
	if (ctx) {
		cookie = getCookieFromCtx(name, ctx);
	} else {
		cookie = getCookieFromBrowser(name);
	}
	return cookie;
};
