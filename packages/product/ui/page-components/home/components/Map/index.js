import { Button, Tooltip, Toast } from '@cogoport/components';
import {
	CogoMaps, L,
} from '@cogoport/maps';
import React, { useState, useEffect, useContext } from 'react';

import { WaypointsContext } from '../../common/context/WaypointsProvider';

import DraggablePoints from './DraggablePoints';
import MapClick from './MapClick';
import Routes from './Routes';
import styles from './styles.module.css';

import getDefaultMapProps from '@/commons/utils/getDefaultMapProps';
import Fullscreen from '@/ui/components/map-components/FullScreen';

function Map({
	isFull, z = 5, prevCenter = [20.5937, 78.9629], isMobile, tab,
}) {
	const [enableClick, setEnableClick] = useState(true);
	const [map, setMap] = useState(null);
	const [isMoving, setIsMoving] = useState(false);

	const { routes = [], savedRoutes = [], bounds } = useContext(WaypointsContext);
	const all_routes = [...savedRoutes, ...routes];

	const handleClickStatus = () => {
		Toast.success(`Click on map ${enableClick ? 'disabled' : 'enabled'}`, { hideAfter: 1 });
		setEnableClick((prev) => !prev);
	};

	useEffect(() => {
		const timeout = setTimeout(() => { if (map)map.invalidateSize(true); }, 135);
		return () => {
			clearTimeout(timeout);
		};
	}, [map, isFull]);

	useEffect(() => {
		if (map && bounds instanceof L.LatLngBounds) {
			map.flyToBounds(bounds, { maxZoom: 7 });
		}
	}, [bounds, map]);

	useEffect(() => {
		if (map) {
			map.on('zoomstart', () => { setIsMoving(true); });
			map.on('zoomend', () => { setIsMoving(false); });
			map.on('moveend', () => { setIsMoving(false); });
		}
	}, [map]);

	const height = !isMobile ? 'calc(100vh - 56px)' : '400px';

	return (
		<CogoMaps
			center={prevCenter}
			style={{ height, width: '100%' }}
			setMap={setMap}
			zoom={z}
			{...getDefaultMapProps({ isMobile })}
		>
			<Fullscreen map={map} />
			{tab === 'search_routes' && (
				<>
					<DraggablePoints map={map} />
					{enableClick && <MapClick />}
				</>
			)}
			{(all_routes.length > 0) && (
				<Routes
					map={map}
					tab={tab}
					routes={all_routes}
					isMoving={isMoving}
				/>
			)}

			<Tooltip
				caret={false}
				content={enableClick ? 'Disable click on map' : 'Enable click on map'}
			>
				<Button
					themeType="secondary"
					size="sm"
					title="enable click on map"
					className={`${styles.btn_icon} ${!enableClick ? styles.disable : ''} leaflet-bar`}
					onClick={handleClickStatus}
				/>
			</Tooltip>

		</CogoMaps>
	);
}

export default Map;
