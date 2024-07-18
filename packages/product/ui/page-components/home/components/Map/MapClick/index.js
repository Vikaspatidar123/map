import { Marker, L } from '@cogoport/maps';
import React, { useContext, useState } from 'react';

import { WaypointsContext } from '../../../common/context/WaypointsProvider';

import LocDetails from './LocDetails';
import styles from './styles.module.css';

import useListNearestLocations from '@/commons/hooks/useListNearestLocations';
import GetPoint from '@/ui/components/map-components/GetPoint';
import Point from '@/ui/components/map-components/Point';
import getLeafletIcon from '@/utils/getLeafletIcon';
import isValidPoint from '@/utils/isValidPoint';

function MapClick() {
	const [selectedPt, setSelectedPt] = useState(null);
	const { loading, data, getNearestLocations } = useListNearestLocations();
	const { setWaypoints } = useContext(WaypointsContext);

	const handleMapClick = (e) => {
		if (!selectedPt) getNearestLocations({ filters: { latitude: e.latlng.lat, longitude: e.latlng.lng } });
		setSelectedPt(selectedPt ? null : [e.latlng.lat, e.latlng.lng]);
	};

	const handleClick = (e, idx) => {
		L.DomEvent.stopPropagation(e);
		setWaypoints((prev) => prev.map((pt, i) => (i === idx ? {
			value        : data?.id,
			id           : data?.id,
			key          : pt.key,
			pos          : selectedPt,
			display_name : data?.display_name,
			type         : data?.type,
		} : pt)));
		setSelectedPt(null);
	};

	const onClose = (e) => {
		L.DomEvent.stopPropagation(e);
		setSelectedPt(null);
	};

	return (
		<>
			<GetPoint handleClick={handleMapClick} />
			{isValidPoint(selectedPt) && <Point position={selectedPt} isActive={loading} />}
			{isValidPoint(selectedPt) && !loading
			&& (
				<Marker
					position={selectedPt}
					icon={getLeafletIcon(
						'/logo.svg',
						[24, 24],
						[12.25, 24.5],
						styles.icon,
					)}
					className={styles.marker}
					eventHandlers={{
						add: (e) => {
							e.target.openPopup();
						},
					}}
				/>
			)}

			{(selectedPt && !loading) && (
				<LocDetails
					data={data}
					handleClick={handleClick}
					onClose={onClose}
				/>
			)}
		</>
	);
}

export default MapClick;
