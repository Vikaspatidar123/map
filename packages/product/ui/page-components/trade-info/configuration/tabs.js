import { IcMMap, IcMServices, IcMHome } from '@cogoport/icons-react';

export const TABS = [{
	label : 'General Information',
	value : 'general',
	icon  : <IcMHome />,
}, {
	label : 'Services',
	value : 'services',
	icon  : <IcMServices />,
}, {
	label : 'Live Congestion',
	value : 'live_congestion',
	icon  : <IcMMap />,
}];
