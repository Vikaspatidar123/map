/* eslint-disable react-hooks/exhaustive-deps */
import { debounce } from '@cogoport/utils';
import { useCallback, useEffect } from 'react';

import useRequest from '@/commons/hooks/useRequest';

const useListSavedRoutes = ({
	class_type, class_id, q, page,
}, setActiveRoute) => {
	const [{ data, loading }, trigger] = useRequest({
		url    : '/list_saved_routes',
		method : 'GET',
	}, { manual: true });

	const getSavedRoutes = async (val) => {
		try {
			const params = {
				filters: {
					type   : 'custom',
					status : 'active',
					class_type,
					class_id,
					q      : val,
				},
				page,
			};
			await trigger({ params });
		} catch (error) {
			// console.log(error);
		}
	};

	const getDebouncedRoutes = useCallback(debounce(getSavedRoutes, 500), [class_type, class_id, page]);

	useEffect(() => {
		getSavedRoutes(q);
		setActiveRoute({});
	}, [class_type, class_id, page]);

	useEffect(() => {
		if (q !== undefined) {
			getDebouncedRoutes(q);
		}
	}, [q, getDebouncedRoutes]);

	return {
		loading, data: data?.list, total_count: data?.total_count, getSavedRoutes,
	};
};

export default useListSavedRoutes;
