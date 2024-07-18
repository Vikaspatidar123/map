import { useContext, useEffect } from 'react';
import { useSelector } from 'react-redux';

import { WaypointsContext } from '../common/context/WaypointsProvider';

import useRequest from '@/commons/hooks/useRequest';
import getDecodedPath from '@/commons/utils/getDecodedPath';

const useGetSavedRoutes = () => {
	const { setSavedRoutes, waypoints } = useContext(WaypointsContext);

	const userProfile = useSelector(({ profile }) => profile);
	const actualWaypts = waypoints.filter(({ pos }) => !!pos);

	const [{ loading }, trigger] = useRequest({
		url    : '/get_saved_route',
		method : 'GET',
	}, { manual: true });

	const getSavedRoutes = async () => {
		try {
			const params = {
				user_id                 : userProfile?.user?.id,
				origin_location_id      : actualWaypts[0]?.id,
				destination_location_id : actualWaypts.slice(-1)[0]?.id,
			};
			const resp = await trigger({ params });
			if (resp?.data?.all_routes) {
				const data = (resp.data.all_routes || []).map((loc) => {
					const routes = (loc.routes || []).map((route) => {
						const lineString = (route?.lineString || []).map((pt) => ({
							...pt,
							path: getDecodedPath(pt.path),
						}));
						return { ...route, lineString };
					});
					return { ...loc, routes };
				});
				setSavedRoutes(data);
			} else {
				setSavedRoutes([]);
			}
		} catch (error) {
			setSavedRoutes([]);
		}
	};

	const dependency = actualWaypts.map(({ id }) => id).join('');

	useEffect(() => {
		if (userProfile?.isLogged && actualWaypts.length > 1) {
			getSavedRoutes();
		} else {
			setSavedRoutes([]);
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [dependency]);

	return { loading, getSavedRoutes };
};

export default useGetSavedRoutes;
