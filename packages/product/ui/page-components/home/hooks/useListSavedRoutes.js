/* eslint-disable react-hooks/exhaustive-deps */
import { debounce } from '@cogoport/utils';
import { useCallback, useContext, useEffect } from 'react';
import { useSelector } from 'react-redux';

import { WaypointsContext } from '../common/context/WaypointsProvider';

import useRequest from '@/commons/hooks/useRequest';
import getDecodedPath from '@/commons/utils/getDecodedPath';

const useListSavedRoutes = ({ page, q }) => {
	const {
		activeTab, setActiveRoute, setRoutes,
	} = useContext(WaypointsContext);

	const userProfile = useSelector(({ profile }) => profile);
	const { isLogged } = userProfile;

	const [{ loading, data }, trigger] = useRequest({
		url    : '/list_saved_routes',
		method : 'GET',
	}, { manual: true });

	const getSavedRoutes = async (val) => {
		setActiveRoute(null);
		setRoutes([]);
		try {
			const params = {
				filters: {
					type         : 'default',
					status       : 'active',
					main_service : activeTab === 'all' ? undefined : activeTab,
					class_id     : userProfile?.user?.id,
					class_type   : 'user',
					q            : val,
				},
				page,
			};
			const resp = await trigger({ params });
			if (resp?.data?.list) {
				const routesData = (resp.data.list || []).map((loc) => {
					const route = loc?.route || {};
					const lineString = (route?.lineString || []).map((waypt) => {
						const path = getDecodedPath(waypt?.path || '');
						return { ...waypt, path };
					});
					return { ...loc, route: { ...route, lineString } };
				});
				setRoutes(routesData);
			} else {
				setRoutes([]);
			}
		} catch (error) {
			setRoutes([]);
		}
	};

	const getDebouncedRoutes = useCallback(debounce(getSavedRoutes, 500), []);

	useEffect(() => {
		if (isLogged) {
			getSavedRoutes(q);
		}
	}, [activeTab, isLogged, page]);

	useEffect(() => {
		if (q !== undefined) {
			getDebouncedRoutes(q);
		}
	}, [q, getDebouncedRoutes]);

	return {
		loading, getSavedRoutes, total_count: data?.total_count,
	};
};

export default useListSavedRoutes;
