import { CogoMaps, L } from '@cogoport/maps';
import React, { useState, useEffect, useContext } from 'react';

import { WaypointsContext } from '../../common/context/WaypointsProvider';

import AnimatedRoute from './AnimateRoute';
import ChosenPoints from './ChosenPoints';

import useMobileStatus from '@/commons/hooks/useMobileStatus';
import getDefaultMapProps from '@/commons/utils/getDefaultMapProps';
import Fullscreen from '@/ui/components/map-components/FullScreen';
import MapPosition from '@/ui/components/map-components/MapPosition';

const center = [20.5937, 78.9629];

function Map({ z, prevCenter, isFullView }) {
	const [map, setMap] = useState(null);
	const { bounds, routes, activeRoute } = useContext(WaypointsContext);
	const { isMobile } = useMobileStatus(768);
	const paddingTopLeft = isFullView ? 0 : 408;

	useEffect(() => {
		const timeout = setTimeout(() => { if (map)map.invalidateSize(true); }, 110);
		return () => {
			clearTimeout(timeout);
		};
	}, [map, isFullView]);

	useEffect(() => {
		if (map && bounds instanceof L.LatLngBounds) {
			map.fitBounds(bounds, { paddingTopLeft: [paddingTopLeft, 0] });
		}
	}, [bounds, map, paddingTopLeft]);

	return (
		<CogoMaps
			center={prevCenter || center}
			style={{ height: 'calc(100vh - 56px)', width: '100%' }}
			setMap={setMap}
			zoom={z || 1}
			{...getDefaultMapProps({ isMobile })}
		>
			<Fullscreen map={map} />
			<MapPosition />
			<ChosenPoints map={map} z={z} />
			{(routes.length > 0 || activeRoute?.id) && <AnimatedRoute map={map} isFullView={isFullView} />}
			{/* <Routes /> */}
		</CogoMaps>
	);
}

export default Map;
