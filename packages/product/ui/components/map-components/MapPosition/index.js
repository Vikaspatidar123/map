import { useMapEvents } from '@cogoport/maps';
import { useRouter } from 'next/router';

function MapPosition() {
	const router = useRouter();

	const handleQuery = (z, { lat, lng }) => {
		const center = `${lat}, ${lng}`;
		router.replace({
			query: { ...router.query, z, center },
		});
	};
	const map = useMapEvents({
		zoomend() {
			handleQuery(map.getZoom(), map.getCenter());
		},
		moveend() {
			handleQuery(map.getZoom(), map.getCenter());
		},
	});
	return null;
}

export default MapPosition;
