import { debounce } from '@cogoport/utils';

import useRequest from './useRequest';

const useGetCogoLocations = () => {
	const [{ data, loading }, trigger] = useRequest({
		url    : '/list_locations',
		method : 'GET',
	}, { manual: true });

	const getLocations = async (params) => {
		try {
			const res = await trigger({
				params: {
					filters    : params?.filters || {},
					preference : { airport: true, seaport: true },
					includes   : {
						default_params_required: true,
						...(params.includes || {}),
					},
					page                     : 1,
					page_limit               : 10,
					pagination_data_required : false,
				},
			});
			if (res?.data) {
				return res?.data?.list || [];
			}
		} catch (error) {
			// console.log(error);
			return [];
		}
		return null;
	};

	const debouncedSearch = debounce(getLocations, 500);

	return {
		results: data?.list, loading, getLocations, debouncedSearch,
	};
};

export default useGetCogoLocations;
