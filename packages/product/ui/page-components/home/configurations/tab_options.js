import { IcMSchedules } from '@cogoport/icons-react';

const tabOptions = (tabType = 'search_routes') => [
	{ label: tabType === 'saved_routes' ? 'All' : 'Suggested', value: 'all', icon: <IcMSchedules /> },
	{ label: 'Ocean', value: 'ocean' },
	{ label: 'Land', value: 'land' },
	{ label: 'Air', value: 'air' },
];

export default tabOptions;
