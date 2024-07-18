/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from 'react';

import useDebounceQuery from '@/commons/hooks/useDebounceQuery';
import useRequest from '@/commons/hooks/useRequest';

const useListVesselSchedules = ({
	class_type, class_id, q, page,
}, setActiveRoute, currentSelectedId) => {
	const [{ data, loading }, trigger] = useRequest({
		url    : '/list_vessel_schedules',
		method : 'GET',
	}, { manual: true });

	const { query, debounceQuery } = useDebounceQuery();

	const getListVesselSchedules = async (val) => {
		try {
			const params = {
				filters: {
					q               : query,
					service_lane_id : val,
				},
				page,
			};
			await trigger({ params });
		} catch (error) {
			// console.log(error);
		}
	};

	useEffect(() => {
		getListVesselSchedules(currentSelectedId.id);
		setActiveRoute({});
	}, [query, class_type, class_id, page]);

	useEffect(() => {
		debounceQuery(q);
	}, [q]);

	return {
		loading, data: data?.list, total_count: data?.total_count, getListVesselSchedules,
	};
};

export default useListVesselSchedules;
