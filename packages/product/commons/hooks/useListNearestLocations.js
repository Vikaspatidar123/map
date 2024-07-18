import useRequest from './useRequest';

const useListNearestLocations = () => {
	const [{ loading, data }, trigger] = useRequest({
		url    : 'list_nearest_available_location',
		method : 'GET',
	});

	const getNearestLocations = async (params) => {
		try {
			await trigger({ params });
		} catch (err) {
			// console.log(err);
		}
	};

	return { loading, data: data?.list?.[0], getNearestLocations };
};

export default useListNearestLocations;
