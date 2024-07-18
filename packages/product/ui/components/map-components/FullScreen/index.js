import { L } from '@cogoport/maps';
import 'leaflet-fullscreen/dist/Leaflet.fullscreen';
import 'leaflet-fullscreen/dist/leaflet.fullscreen.css';
import { useEffect } from 'react';

function Fullscreen({ map, position = 'bottomright' }) {
	useEffect(() => {
		const fullScreenControl = new L.Control.Fullscreen({
			title: {
				false : 'View Fullscreen',
				true  : 'Exit Fullscreen',
			},
			position,
		});
		if (map) {
			map.addControl(fullScreenControl);
		}
		return () => {
			map?.removeControl(fullScreenControl);
		};
	}, [map, position]);
	return (null);
}

export default Fullscreen;
