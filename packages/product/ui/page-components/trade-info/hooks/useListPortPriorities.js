import useRequest from '@/commons/hooks/useRequest';

const { useEffect } = require('react');

const useListPortPriorities = ({
	page, country_id, port_type, is_icd,
}) => {
	const [{ loading, data }, trigger] = useRequest({
		method : 'get',
		url    : '/list_port_priorities',
	});

	const getList = async () => {
		try {
			await trigger({
				params: {
					filters: { country_id, port_type, is_icd },
					page,
				},
			});
		} catch (er) {
			// console.log(er);
		}
	};

	useEffect(() => {
		if (country_id) {
			getList();
		}
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [page, country_id, port_type, is_icd]);

	return {
		loading, total_count: data?.total_count, list: data?.list,
	};
};

export default useListPortPriorities;
