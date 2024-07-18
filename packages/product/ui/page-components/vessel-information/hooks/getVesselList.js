// import { Toast } from '@cogoport/components';
import { useCallback, useEffect, useState } from 'react';

import useDebounceQuery from '@/commons/hooks/useDebounceQuery';
import useRequest from '@/commons/hooks/useRequest';
// import getApiErrorString from '@/commons/utils/getApiError';

const useGetVesselList = (searchText) => {
	const [pagination, setPagination] = useState(1);
	const { query, debounceQuery } = useDebounceQuery();

	const [{ data, loading }, trigger] = useRequest({
		url    : '/list_vessels',
		method : 'get',
	}, { manual: true });

	const getVesselList = useCallback(async () => {
		try {
			await trigger({
				params: {
					filters: {
						q      : query || undefined,
						status : 'active',
					},
					page: pagination,
				},
			});
		} catch (err) {
			// const errorsNew = err?.response?.data || undefined;
			// Toast.error(errorsNew ? getApiErrorString(errorsNew) : 'Error occured while fetching vessels list', { hideAfter: 3 });
		}
	}, [trigger, query, pagination]);

	useEffect(() => {
		getVesselList();
	}, [getVesselList]);

	useEffect(() => {
		debounceQuery(searchText);
	}, [debounceQuery, searchText]);

	return { getVesselList, vesselsList: data || [], searchLoading: loading, pagination, setPagination };
};

export default useGetVesselList;
