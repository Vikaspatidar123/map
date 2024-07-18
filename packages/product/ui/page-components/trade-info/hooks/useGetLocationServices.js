import useRequest from '@/commons/hooks/useRequest';

const useGetLocationServices = () => {
	const [{ data, loading }, trigger] = useRequest({
		url    : 'get_location_services',
		method : 'get',
	});

	const getLocationsServices = async (params) => {
		try {
			await trigger({ params });
		} catch (e) {
			// console.error(e);
		}
	};

	return { data, loading, getLocationsServices };
};

export default useGetLocationServices;
