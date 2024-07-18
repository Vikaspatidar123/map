import { useContext, useEffect } from 'react';
import { useSelector } from 'react-redux';

import { WaypointsContext } from '../common/context/WaypointsProvider';

import useRequest from '@/commons/hooks/useRequest';

const useRoutes = () => {
	const {
		waypoints, setActiveRoute, setWaypoints, setRoutes,
	} = useContext(WaypointsContext);
	const { user } = useSelector(({ profile }) => profile);
	const [{ loading }, trigger] = useRequest({
		url    : '/get_multimodal_shortest_path',
		method : 'get',
	}, { manual: true });

	const [, triggerInteraction] = useRequest({
		url    : 'create_user_interaction',
		method : 'post',
	});

	const actualWaypts = waypoints.filter(({ pos }) => !!pos)
		.map(({
			pos, id, region_id = '_', type, display_name, is_icd = false,
		}) => ({
			coordinates : pos.map((pt) => parseFloat(pt)),
			location_id : id,
			region_id,
			display_name,
			type,
			is_icd,
		}));

	const payload = {
		origin_location_id      : actualWaypts?.[0]?.location_id,
		destination_location_id : actualWaypts?.slice(-1)?.[0]?.location_id,
		user_id                 : user?.id,
	};

	const getRoutes = async () => {
		setActiveRoute(null);
		setRoutes([]);

		try {
			const resp = await trigger({
				params: {
					points  : actualWaypts,
					user_id : user?.id,
				},
			});
			if (resp?.data?.all_routes) {
				setRoutes(resp?.data?.all_routes);

				const { origin, destination } = resp?.data || {};
				const waypointStart = actualWaypts[0];
				const waypointEnd = actualWaypts[actualWaypts.length - 1];

				setWaypoints((prev) => prev.map((loc) => {
					if (loc.id === waypointStart.location_id) return { ...loc, display_pos: origin };
					if (loc.id === waypointEnd.location_id) return { ...loc, display_pos: destination };
					return loc;
				}));
			} else {
				setRoutes([]);
			}
		} catch (error) {
			// console.log(error, 'error');
			setRoutes([]);
		}
	};

	const createInteraction = async () => {
		try {
			await triggerInteraction({ data: payload });
		} catch (er) {
			// console.log(er)
		}
	};

	const dependency = actualWaypts.map(({ location_id }) => location_id).join('');

	useEffect(() => {
		if (actualWaypts.length > 1 && dependency) {
			getRoutes();
			createInteraction();
		} else {
			setActiveRoute(null);
			setRoutes([]);
		}
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [dependency]);

	return {
		loading, refetch: getRoutes,
	};
};

export default useRoutes;
