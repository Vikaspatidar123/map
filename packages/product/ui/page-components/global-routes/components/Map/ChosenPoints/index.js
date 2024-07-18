import {
	FeatureGroup,
} from '@cogoport/maps';
import React, { useContext, useEffect, useState } from 'react';

import { WaypointsContext } from '../../../common/context/WaypointsProvider';

import getDecodedPath from '@/commons/utils/getDecodedPath';
import Point from '@/ui/components/map-components/Point';
import toTitleCase from '@/utils/toTitleCase';

function ChosenPoints({ map }) {
	const [timeOutId, setTimeOutId] = useState(null);
	const {
		actualWaypts, globalFilters, activeKey, routes, activeRoute, setBounds,
	} = useContext(WaypointsContext);

	const points = activeRoute?.id ? getDecodedPath(activeRoute?.route?.points) : actualWaypts;

	const handleBounds = (bounds) => {
		const id = setTimeout(() => setBounds(bounds), 5000);
		setTimeOutId(id);
	};

	useEffect(() => () => {
		clearTimeout(timeOutId);
	}, [timeOutId]);

	return (
		<FeatureGroup eventHandlers={{
			layeradd: (e) => {
				map?.flyToBounds(
					e.target.getBounds(),
					{ maxZoom: 7 },
				);
				handleBounds(e.target.getBounds());
			},
		}}
		>
			{points.map((loc) => (
				<Point
					key={loc?.id}
					position={loc?.display_pos || loc?.pos || loc}
					isActive={!routes.length && activeKey === loc?.key}
					tooltipText={toTitleCase(loc?.name || loc?.display_name)}
					service_name={activeRoute?.class_type || globalFilters?.class_type}
				/>
			))}
		</FeatureGroup>
	);
}

export default ChosenPoints;
