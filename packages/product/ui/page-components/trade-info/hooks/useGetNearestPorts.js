import useRequest from '@/commons/hooks/useRequest';

const { useEffect } = require('react');

const useGetNearestPorts = ({
	id, page = 1, type = ['seaport', 'airport'], setPortsData,
}) => {
	const [{ loading, data }, trigger] = useRequest({
		method : 'get',
		url    : '/list_locations',
	});

	const getList = async () => {
		try {
			const res = await trigger({
				params: {
					filters  : { type, within: id },
					includes : { default_params_required: true },
					page,
				},
			});
			if (res?.data?.list) {
				setPortsData((prev) => ([...prev, ...res.data.list]));
			}
		} catch (er) {
			// console.log(er);
		}
	};

	useEffect(() => {
		if (id) {
			getList();
		}
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [id, page]);

	return {
		loading, total_count: data?.total_count,
	};
};

export default useGetNearestPorts;
