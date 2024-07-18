import {
	CogoMaps, L,
} from '@cogoport/maps';
import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';

// import DraggablePoints from './DraggablePoints';
// import MapClick from './MapClick';
import styles from './styles.module.css';
import useGetRates from './useGetRates';

import getDefaultMapProps from '@/commons/utils/getDefaultMapProps';
import Fullscreen from '@/ui/components/map-components/FullScreen';
import getLeafletIcon from '@/utils/getLeafletIcon';

function Map({
	isFull, z = 4, prevCenter = [20.5937, 78.9629], isMobile,
}) {
	const [map, setMap] = useState(null);
	const { newRates } = useGetRates();
	const userProfile = useSelector(({ profile }) => profile);

	const allpoint = [];

	newRates.forEach((item) => {
		const headingText = item.heading;
		const p = new L.Marker(
			item.point,
			{ icon: getLeafletIcon('/images/default-red.svg') },
		);
		const h = new L.Marker(item.point, {
			icon: new L.DivIcon({
				html       : `${item.heading} - USD ${item.price}`,
				iconSize   : [headingText.length > 25 ? 200 : 150, 40],
				iconAnchor : [-18, headingText.length > 14 ? 32 : 26],
				className  : styles.heading_text,
			}),
		});
		allpoint.push(p);
		allpoint.push(h);
	});

	const renderPoint = () => new L.FeatureGroup(allpoint);

	useEffect(() => {
		const featureGroup = renderPoint();
		if (map) {
			map.addLayer(featureGroup);
		}
		return () => {
			if (map && featureGroup) map?.removeLayer(featureGroup);
		};

	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [map]);

	useEffect(() => {
		const timeout = setTimeout(() => { if (map)map.invalidateSize(true); }, 135);
		return () => {
			clearTimeout(timeout);
		};
	}, [map, isFull]);

	const height = !isMobile ? 'calc(100vh - 56px)' : '400px';

	if (!userProfile?.user?.id) {
		return null;
	}

	return (
		<CogoMaps
			center={prevCenter}
			style={{ height, width: '100%' }}
			setMap={setMap}
			zoom={z}
			{...getDefaultMapProps({ isMobile })}
		>
			<Fullscreen map={map} />
		</CogoMaps>
	);
}

export default Map;
