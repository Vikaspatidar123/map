import { debounce } from '@cogoport/utils';

import useRequest from '@/commons/hooks/useRequest';

const { useEffect } = require('react');

const useGetWithinLocations = ({ filters, id }) => {
	const {
		endpoint, type, q, page,
	} = filters;

	const [{ loading, data }, trigger] = useRequest({
		method : 'get',
		url    : '/list_locations',
	});

	const getList = async () => {
		try {
			await trigger({
				params: {
					filters  : { type: type === 'all' ? undefined : type, q, within: id },
					includes : { default_params_required: true },
					page,
				},
			});
		} catch (er) {
			// console.log(er);
		}
	};

	const debouncedSearch = debounce(getList, 500);

	useEffect(() => {
		if (id) {
			getList();
		}
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [type, endpoint, id, page]);

	useEffect(() => {
		if (id) {
			debouncedSearch();
		}
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [q, id]);

	return { loading, data };
};

export default useGetWithinLocations;
