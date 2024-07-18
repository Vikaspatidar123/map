/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-underscore-dangle */
import { ButtonIcon, Legend } from '@cogoport/components';
import { IcMRefresh } from '@cogoport/icons-react';
import {
	CogoMaps, GeoJSON, L,
} from '@cogoport/maps';
import React, {
	useEffect, useMemo, useRef, useState,
} from 'react';

import styles from './styles.module.css';

import useMobileStatus from '@/commons/hooks/useMobileStatus';
import getDefaultMapProps from '@/commons/utils/getDefaultMapProps';
import Fullscreen from '@/ui/components/map-components/FullScreen';
import Point from '@/ui/components/map-components/Point';
import getLeafletIcon from '@/utils/getLeafletIcon';
import isValidPoint from '@/utils/isValidPoint';

const items = [
	{ label: 'Seaports', color: '#1867d2', key: 'seaport' },
	{ label: 'Airports', color: '#f37166', key: 'airport' },
];

function Map({
	locationData, activeTab, hoveredPort, nearestPorts, bounds,
}) {
	const center = [20.5937, 78.9629];
	const [map, setMap] = useState();
	const { isMobile } = useMobileStatus(576);

	const geojson = locationData?.geometry ? JSON.parse(locationData.geometry) : null;
	const headingText = (locationData?.name || locationData?.displayName || '').split(',')[0];
	const selectedRef = useRef(null);
	const geometryRef = useRef(null);

	const refDependency = selectedRef?.current?._leaflet_id;

	const onEachFeature = (feature, layer) => {
		if (geojson.type !== 'Point') {
			layer?.setStyle({
				weight      : 1.5,
				fillOpacity : 0,
				dashArray   : '2 4',
				color       : '#404040',
			});
		}
	};

	const renderPoint = useMemo(
		() => (feature, latlng) => new L.FeatureGroup([
			new L.Marker(
				latlng,
				{ icon: getLeafletIcon('/images/default-red.svg') },
			),
			new L.Marker(latlng, {
				icon: new L.DivIcon({
					html       : headingText,
					iconSize   : [headingText.length > 25 ? 200 : 150, 40],
					iconAnchor : [-18, headingText.length > 14 ? 32 : 26],
					className  : styles.heading_text,
				}),
			}),
		]),
		[headingText],
	);

	const key = !!activeTab;
	const pt = [locationData?.latitude, locationData?.longitude];

	const handleRefresh = (e) => {
		e.stopPropagation();
		if (isValidPoint(pt) && map && typeof window !== 'undefined' && geometryRef?.current) {
			const geometryBounds = geometryRef.current.getBounds();
			map.fitBounds(geometryBounds, { paddingTopLeft: [400, 10] });
		}
	};

	useEffect(() => {
		const featureGroup = isValidPoint(pt) ? renderPoint(null, pt) : null;
		if (map && geojson && (geojson.type !== 'Point' || key) && featureGroup) {
			map.addLayer(featureGroup);
		}
		return () => {
			if (map && featureGroup) map?.removeLayer(featureGroup);
		};
	}, [map, locationData?.id, key]);

	useEffect(() => {
		if (map)map.invalidateSize(true);

		if (map && key && isValidPoint(pt)) {
			map.setView([pt[0], pt[1] + 3.5], 4);
		}
	}, [map, key]);

	useEffect(() => {
		const cachedRef = selectedRef?.current;

		if (map && cachedRef) {
			cachedRef.openTooltip();
		}
		return () => {
			if (cachedRef && map) {
				cachedRef.closeTooltip();
			}
		};
	}, [refDependency, map]);

	useEffect(() => {
		if (map && bounds instanceof L.LatLngBounds) {
			map.flyToBounds(bounds, { paddingTopLeft: [400, 10], maxZoom: 9, duration: 1 });
		}
	}, [JSON.stringify(bounds), map]);

	return (
		<CogoMaps
			center={center}
			style={{ height: 'calc(100vh - 56px)', width: '100vw' }}
			zoom={2}
			setMap={setMap}
			{...getDefaultMapProps({ isMobile })}
		>
			{!activeTab && <Fullscreen map={map} />}

			{!activeTab && geojson && (
				<GeoJSON
					key={locationData?.id}
					ref={geometryRef}
					data={geojson}
					onEachFeature={onEachFeature}
					pointToLayer={renderPoint}
					pane="tilePane"
					eventHandlers={{
						add: (e) => {
							map.fitBounds(e.target.getBounds(), { paddingTopLeft: [400, 10] });
						},
					}}
				/>
			)}

			{!activeTab && nearestPorts.map((loc) => {
				const position = [loc?.latitude, loc?.longitude];
				const isActive = loc?.id === hoveredPort?.id;
				return isValidPoint(position) ? (
					<Point
						ref={isActive ? selectedRef : null}
						key={loc?.id}
						position={position}
						isActive={isActive}
						service_name={loc?.type}
						size={isActive ? [14, 14] : [12, 12]}
						tooltipText={loc?.name}
						tooltipProps={{
							direction : 'bottom',
							offset    : [0, 8],
							className : styles[`tooltip_${loc?.type}`],
						}}
					/>
				) : null;
			})}
			{!activeTab && (
				<Legend
					direction="vertical"
					items={items}
					size="md"
					className={styles.legend}
				/>
			)}
			{!activeTab && (
				<ButtonIcon
					size="md"
					icon={<IcMRefresh />}
					themeType="primary"
					className={styles.refresh_btn}
					onClick={handleRefresh}
				/>
			)}
		</CogoMaps>
	);
}

export default Map;
