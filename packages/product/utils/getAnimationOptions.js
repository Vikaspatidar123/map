import { L } from '@cogoport/maps';

import '@/assets/libs/motion';

const getAnimationOptions = ({ path = [], isMain, icon }) => [
	path,
	{
		opacity     : 0,
		fillOpacity : 0,
		weight      : 0.2,
	},
	{
		auto     : false,
		duration :
				isMain
					? 15000
					: 3000,
		easing: L.Motion.Ease.easeInOutQuart,
	},
	{
		removeOnEnd: true,
		icon,
	},
];

export default getAnimationOptions;
