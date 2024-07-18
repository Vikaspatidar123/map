const { Toast } = require('@cogoport/components');

const { default: useRequest } = require('@/commons/hooks/useRequest');

const useDeleteSavedRoute = ({ refetch = () => {}, setIsBookmarked = () => {}, setRouteId = () => {} }) => {
	const [{ loading }, trigger] = useRequest({
		url    : '/delete_saved_route',
		method : 'post',
	});

	const deleteSavedRoute = async (params) => {
		try {
			const res = await trigger({ params });
			if (res.status === 200) {
				Toast.success('Removed from saved!', { hideAfter: 1 });
				setIsBookmarked(false);
				setRouteId(null);
				refetch();
			}
		} catch (err) {
			Toast.error(err.message, { hideAfter: 1 });
		}
	};
	return { loading, deleteSavedRoute };
};

export default useDeleteSavedRoute;
