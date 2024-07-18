const isValidPoint = (pt = []) => {
	if (Array.isArray(pt) && pt.length === 2 && pt.every((n) => typeof n === 'number')) {
		return true;
	}
	return false;
};

export default isValidPoint;
