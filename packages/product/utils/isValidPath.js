import { L } from '@cogoport/maps';

const isValidPath = (array) => {
	if (!Array.isArray(array)) return false;
	return (array.every((point) => Array.isArray(point)
			&& point.length === 2 && typeof point[0] === 'number' && typeof point[1] === 'number'))
			|| (array.every((element) => element instanceof L.LatLng));
};

export default isValidPath;
