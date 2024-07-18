import useRequest from '@/commons/hooks/useRequest';

const useGetPrice = () => {
	const [{ data, loading }, trigger] = useRequest({
		url    : '/get_route_rates',
		method : 'get',
	}, { manual: true });

	const getPrice = async (params) => {
		try {
			await trigger({ params });
		} catch (err) {
			// console.log(err);
		}
	};

	return { data, loading, getPrice };
};

export default useGetPrice;
