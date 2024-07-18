import {
	CogoMaps, L, Marker, Popup,
} from '@cogoport/maps';
// eslint-disable-next-line no-unused-vars
import { GestureHandling } from 'leaflet-gesture-handling';
import React from 'react';

import 'leaflet-gesture-handling/dist/leaflet-gesture-handling.css';
import useMobileStatus from '@/commons/hooks/useMobileStatus';
import getDefaultMapProps from '@/commons/utils/getDefaultMapProps';

function Map() {
	const center = [20.5937, 78.9629];
	const { isMobile } = useMobileStatus(768);
	const icon = new L.Icon({ iconUrl: '/images/default-red.svg', iconSize: [20, 20] });

	return (
		<CogoMaps
			center={center}
			style={{ height: '450px', width: '100%' }}
			zoom={4}
			{...getDefaultMapProps({ isMobile })}
			gestureHandling
		>
			<Marker position={center} icon={icon}>
				<Popup>
					This is a popup
				</Popup>
			</Marker>
		</CogoMaps>
	);
}

export default Map;
