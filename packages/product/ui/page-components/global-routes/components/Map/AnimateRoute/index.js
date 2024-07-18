import { L } from '@cogoport/maps';
import { useContext, useEffect } from 'react';

import '@/assets/libs/motion';
import { WaypointsContext } from '../../../common/context/WaypointsProvider';
import { class_type_mapping } from '../../../common/utils';

import { colorMappings } from '@/commons/configuration/color-options';
import getDecodedPath from '@/commons/utils/getDecodedPath';
import { getIcon } from '@/ui/components/map-components/Point';
import styles from '@/ui/components/map-components/Point/styles.module.css';

export const movingMarkerOptions = ({ color = '#000', service_name = '', distance = 3000 }) => [
	{
		color,
		opacity     : 1,
		fillOpacity : 1,
	}, {
		auto     : false,
		duration : Math.min(2000, Math.floor(distance / 3.5)),
		easing   : L.Motion.Ease.linear,
	}, {
		removeOnEnd : true,
		showMarker  : true,
		icon        : getIcon({
			className: `${styles.point_animation}
		${styles[service_name]} `,
		}),
	},
];

function AnimatedRoute({ map, isFullView }) {
	const { routes, globalFilters, activeRoute } = useContext(WaypointsContext);
	const isActiveRoute = !!activeRoute?.id;
	const service_name = isActiveRoute ? activeRoute?.class_type : globalFilters.class_type;
	const path = isActiveRoute
		? getDecodedPath(activeRoute?.route?.coordinates)
		: routes
			.map(({ route }) => (route.length > 1
				? route
				: [])).flat(1);

	const distance = isActiveRoute
		? (activeRoute?.route?.length || 10000)
		: routes.reduce((acc, { length }) => acc + length, 0);

	const sequence = L.motion.polyline(path, ...movingMarkerOptions({
		color: colorMappings[class_type_mapping[service_name]],
		service_name,
		distance,
	}));

	useEffect(() => {
		let timeout;
		if (map) {
			sequence?.addTo(map);
			if (isActiveRoute) {
				timeout = setTimeout(() => { sequence?.motionStart(); }, 700);
			} else {
				sequence?.motionStart();
			}
		}
		return () => {
			clearTimeout(timeout);
			if (map) {
				map.removeLayer(sequence);
			}
		};
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [map, isFullView, activeRoute?.id]);

	return (
		null);
}

export default AnimatedRoute;
