import { Loader } from '@cogoport/components';
import {
	FeatureGroup, L, LayerGroup, Polyline,
} from '@cogoport/maps';
import { isEmpty } from '@cogoport/utils';
import React, {
	useContext, useEffect, useRef, useState,
} from 'react';

import { WaypointsContext } from '../../../common/context/WaypointsProvider';
import AnimatedRoute from '../AnimatedRoute';
import { loader, tooltip } from '../styles.module.css';

import {
	alternatePathOptions,
	servicePathOptions,
} from '@/commons/configuration/color-options';
import getDecodedPath from '@/commons/utils/getDecodedPath';
import Point from '@/ui/components/map-components/Point';
import isString from '@/utils/isString';

function Routes({
	map, tab, routes, isMoving,
}) {
	const {
		activeRoute, activeTab, routesLoading, waypoints, setBounds,
	} = useContext(WaypointsContext);

	const [bbox, setBbox] = useState(null);
	const routeRef = useRef(null);

	const actualWaypts = waypoints.filter(({ pos }) => !!pos);

	let actualRoute = activeRoute ? [activeRoute] : routes;

	actualRoute = (activeTab === 'all' || tab === 'saved_routes')
		? actualRoute : actualRoute.filter(({ main_service }) => main_service === activeTab);

	useEffect(() => {
		if (map && bbox) {
			const bounding_box = routeRef?.current ? routeRef.current.getBounds() : bbox;

			if (!isEmpty(bounding_box) && bounding_box instanceof L.LatLngBounds) {
				map?.flyToBounds(bounding_box, { maxZoom: 7 });
			}
			if (routeRef?.current) routeRef.current?.bringToFront();
		}
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [activeRoute, map, JSON.stringify(bbox), activeTab]);

	const serviceRoutes = (tab === 'saved_routes' && !activeRoute)
		? []
		: actualRoute.map(({ routes: temp }) => temp).flat();

	return (
		routesLoading ? (
			<Loader
				themeType="primary"
				className={loader}
			/>
		) : (
			<LayerGroup eventHandlers={{ layeradd: (e) => setBounds(e.target.getBounds()) }}>
				{
				serviceRoutes.map((route, idx) => {
					const { lineString = [] } = route || {};
					const routeWaypoints = lineString.map((leg, i) => (leg?.waypoints || [])
						.map((pt) => ({
							...pt,
							display_name: (pt?.display_name) || (!i
								? actualWaypts[0]?.display_name : actualWaypts.slice(-1)[0]?.display_name),
						})));

					const positions = [lineString.map(({ path }) => (isString(path)
						? getDecodedPath(path) : path))];
					const isActive = route?.id === activeRoute?.id;

					return (
						<FeatureGroup
							key={route?.id}
							ref={isActive ? routeRef : null}
							eventHandlers={{
								add: (e) => (!idx ? setBbox(e.target.getBounds())
									: setBbox((prev) => prev.extend(e.target.getBounds()))),
							}}
						>
							<Polyline
								positions={positions}
								pathOptions={alternatePathOptions(isMoving)}
							/>

							{lineString.map(({ path, type, id }) => {
								const actualPath = isString(path) ? getDecodedPath(path) : path;

								return (
									<>
										{type === 'haulage'
									&& (
										<Polyline
											key={`${id}_${type}`}
											positions={actualPath}
											pathOptions={alternatePathOptions(isMoving, type)}
										/>
									)}
										<Polyline
											key={id}
											positions={actualPath}
											pathOptions={servicePathOptions(type, isMoving)}
										/>
									</>
								);
							})}
							{routeWaypoints.flat().map(({ coordinates, display_name = '', type }, i) => (
								<Point
									key={`${display_name}_${type}_${JSON.stringify(coordinates)}`}
									position={coordinates}
									tooltipText={<div className={tooltip}>{display_name.split(',')[0]}</div>}
									service_name={type}
									pane={!i || (i === routeWaypoints.flat().length - 1) ? 'shadowPane' : 'markerPane'}
									size={[13, 13]}
								/>
							))}
						</FeatureGroup>
					);
				})
				}

				{(activeRoute && tab === 'search_routes')
				&& (
					<AnimatedRoute
						map={map}
						activeRoute={activeRoute}
					/>
				)}
			</LayerGroup>
		)
	);
}

export default Routes;
