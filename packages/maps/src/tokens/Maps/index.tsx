import { ControlPosition } from 'leaflet';
import React from 'react';
import {
	MapContainer,
	TileLayer, ScaleControl, LayersControl, TileLayerProps, ControlledLayerProps, ZoomControl, MapContainerProps,
} from 'react-leaflet';

import styles from './styles.module.css';

interface ILayer extends TileLayerProps, ControlledLayerProps {}
interface MapProps extends MapContainerProps {
	children?: React.ReactNode;
	style?: object
	setMap?():void
	baseLayer?: ILayer[]
	overLay?: ILayer[]
	zoomPosition?: ControlPosition
	layersPosition?: ControlPosition
	scaleControl?: boolean,
}

/**
 * Map Component !
 */
function CogoMaps({
	children = null,
	center = [22.366904, 77.534981],
	style = {},
	setMap = () => {},
	baseLayer = [],
	overLay = [],
	preferCanvas = true,
	maxZoom = 18,
	zoomControl = true,
	scaleControl = true,
	zoomPosition = 'topright',
	layersPosition = 'topright',
	...rest
}: MapProps) {
	return (
		<div
			className={[styles.cogomaps_wrapper, baseLayer.length < 2 ? styles.hide_layercontrol : ''].join(' ')}
		>
			<MapContainer
				center={center}
				zoom={2}
				scrollWheelZoom
				preferCanvas={preferCanvas}
				style={style}
				ref={setMap}
				maxZoom={maxZoom}
				zoomControl={false}
				className={styles.cogomaps_container}
				{...rest}
			>
				{scaleControl && <ScaleControl imperial={false} />}
				{zoomControl && <ZoomControl position={zoomPosition} />}

				<LayersControl position={layersPosition}>
					{baseLayer.map((layer, idx) => (
						<LayersControl.BaseLayer
							key={layer?.name}
							name={layer?.name}
							checked={!idx}
						>
							<TileLayer
								attribution={layer?.attribution}
								url={layer.url}
								minZoom={layer?.minZoom || 1}
								maxZoom={layer?.maxZoom || 18}
							/>
						</LayersControl.BaseLayer>
					))}
					{overLay.map((layer) => (
						<LayersControl.Overlay
							name={layer?.name}
							key={layer?.name}
						>
							<TileLayer
								key={layer?.name}
								attribution={layer?.attribution}
								url={layer.url}
								minZoom={layer?.minZoom || 1}
								maxZoom={layer?.maxZoom || 18}
							/>
						</LayersControl.Overlay>
					))}
				</LayersControl>

				{children}
			</MapContainer>
		</div>
	);
}

export default CogoMaps;
