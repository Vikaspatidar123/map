import getLocationDetails from './getLocationDetails';

const getLocations = (data) => {
	const origin = getLocationDetails(data, 'origin');
	const destination = getLocationDetails(data, 'destination');

	return { origin, destination };
};

export default getLocations;
