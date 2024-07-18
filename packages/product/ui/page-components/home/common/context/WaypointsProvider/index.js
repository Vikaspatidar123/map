import { useRouter } from 'next/router';
import React, { useEffect, useMemo, useState } from 'react';

export const WaypointsContext = React.createContext();

export const getId = () => Math.floor(Math.random() * Date.now()).toString(16);
function WaypointProvider({ children }) {
	const router = useRouter();
	const { tab, ...rest } = router.query;
	const [waypoints, setWaypoints] = useState(
		[
			{
				value: '', pos: null, key: getId(), label: '',
			},
			{
				value: '', pos: null, key: getId(), label: '',
			},
		],
	);
	const [activeTab, setActiveTab] = useState('all');
	const [routes, setRoutes] = useState([]);
	const [savedRoutes, setSavedRoutes] = useState([]);
	const [activeRoute, setActiveRoute] = useState(null);
	const [bounds, setBounds] = useState([]);

	useEffect(() => {
		if (tab) {
			setActiveTab(tab);
			router.replace({
				query: { ...rest },
			});
		}
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [router.query]);

	const value = useMemo(() => ({
		bounds,
		routes,
		setBounds,
		waypoints,
		activeTab,
		setRoutes,
		activeRoute,
		savedRoutes,
		setWaypoints,
		setActiveTab,
		setSavedRoutes,
		setActiveRoute,
	}), [waypoints, routes, activeRoute, activeTab, bounds, savedRoutes]);
	return (
		<WaypointsContext.Provider value={value}>
			{children}
		</WaypointsContext.Provider>
	);
}

export default WaypointProvider;
