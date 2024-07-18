import { startCase } from '@cogoport/utils';

const labelMapping = {
	seaport : 'Port',
	airport : 'Airport',
	road    : 'Location',
};
const options = (type) => [
	{ label: 'Address', key: 'display_name' },
	{ label: `${startCase(labelMapping[type])} Type`, key: 'type', subKey: 'actual_location_type' },
	{ label: `${startCase(labelMapping[type])} Code`, key: 'site_code' },
	{ label: 'Postal Code', key: 'postal_code' },
	{ label: 'Country', key: 'country_code' },
	{ label: 'ICD port', key: 'is_icd' },
	{ label: 'latitude', key: 'latitude' },
	{ label: 'longitude', key: 'longitude' },
];

export default options;
