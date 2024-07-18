/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from 'react';

import useDebounceQuery from '@/commons/hooks/useDebounceQuery';
import useRequest from '@/commons/hooks/useRequest';

const useListServiceLanes = ({
	class_type, class_id, q, page,
}, setActiveRoute) => {
	const { query, debounceQuery } = useDebounceQuery();
	const [data, setData] = useState([]);

	const [{ data: serviceLanesData, loading:serviceLanesLoading }, serviceLanesTrigger] = useRequest({
		url    : '/list_service_lanes',
		method : 'GET',
	}, { manual: true });

	const [{ data: airRoutesData, loading: airRoutesLoading }, airRoutesTrigger] = useRequest({
		url    : '/list_air_routes',
		method : 'GET',
	}, { manual: true });

	const getServiceLanes = async () => {
		try {
			const params = {
				filters: {
					q: query,
				},
				page,
			};
			if (class_type === 'shipping_lines') {
				await serviceLanesTrigger({ params });
			} else {
				await airRoutesTrigger({ params });
			}
		} catch (error) {
			// console.log(error);
		}
	};

	useEffect(() => {
		getServiceLanes();
		setActiveRoute({});
	}, [query, class_type, class_id, page]);

	useEffect(() => {
		debounceQuery(q);
	}, [q]);

	useEffect(() => {
		if (class_type === 'shipping_lines') {
			setData(serviceLanesData);
		} else {
			setData(airRoutesData);
		}
	}, [serviceLanesData, airRoutesData, setData]);

	return {
		loading: serviceLanesLoading || airRoutesLoading, data: data?.list, total_count: data?.total_count, getServiceLanes,
	};
};

export default useListServiceLanes;
