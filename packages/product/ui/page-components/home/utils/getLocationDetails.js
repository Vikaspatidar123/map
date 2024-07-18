const getLocationDetails = (data, type) => {
	const { search_type } = data;

	const suffixConfig = {
		air   : 'airport',
		ocean : 'port',
	};

	const suffix = suffixConfig[`${type}_${search_type}`] || suffixConfig[search_type];
	const objName = `${type}_${suffix}`;
	const location = (data[objName] || {}).name || '';

	const port_code = (data[objName] || {}).port_code
		|| (data[objName] || {}).postal_code
		|| null;

	const { id } = data[objName] || {};

	const display_name = (data[objName] || {}).display_name || '';

	const country = ((data[objName] || {}).country || {}).name || '';

	const mainLocation = (data[`${type}_main_${objName}`] || {}).name;

	return {
		name: mainLocation || location,
		port_code,
		country,
		id,
		display_name,
	};
};

export default getLocationDetails;
