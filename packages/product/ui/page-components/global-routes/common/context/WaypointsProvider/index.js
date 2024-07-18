import React, { useEffect, useMemo, useState } from 'react';

export const WaypointsContext = React.createContext();

export const getId = () => Math.floor(Math.random() * Date.now()).toString(16);
function WaypointProvider({ children }) {
	const initialId = getId();
	const [waypoints, setWaypoints] = useState(
		[
			{
				value: '', pos: null, key: initialId,
			},
		],
	);
	const [activeKey, setActiveKey] = useState(initialId);
	const [globalFilters, setGlobalFilters] = useState({
		class_type: 'shipping_lines',
	});
	const [routes, setRoutes] = useState([]);
	const [activeRoute, setActiveRoute] = useState({});
	const [bounds, setBounds] = useState([]);

	const actualWaypts = waypoints.filter(({ pos }) => !!pos);

	useEffect(() => {
		setActiveKey(initialId);
		setWaypoints([
			{
				value: '', pos: null, key: initialId,
			},
		]);
		setRoutes([]);
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [globalFilters.class_type]);

	const value = useMemo(() => ({
		activeKey,
		setActiveKey,
		bounds,
		actualWaypts,
		setBounds,
		setRoutes,
		routes,
		globalFilters,
		setGlobalFilters,
		waypoints,
		setWaypoints,
		activeRoute,
		setActiveRoute,
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}), [waypoints, routes, activeRoute, globalFilters, bounds, activeKey]);

	return (
		<WaypointsContext.Provider value={value}>
			{children}
		</WaypointsContext.Provider>
	);
}

export default WaypointProvider;
