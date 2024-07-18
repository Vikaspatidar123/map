import { useSelector } from 'react-redux';

const { Toast } = require('@cogoport/components');

const { default: useRequest } = require('@/commons/hooks/useRequest');

const useCreateSavedRoute = ({ setIsBookmarked, setRouteId }) => {
	const userProfile = useSelector(({ profile }) => profile);

	const [{ loading }, trigger] = useRequest({
		url    : '/create_saved_route',
		method : 'post',
	});

	const payload = {
		class_id   : userProfile?.user?.id,
		class_type : 'user',
	};

	const createSavedRoute = async (data) => {
		try {
			const res = await trigger({ data: { ...data, ...payload } });
			if (res.status === 200) {
				Toast.success('Route saved successfully!!', { hideAfter: 1 });
				setIsBookmarked(true);
				setRouteId(res.data);
			}
		} catch (err) {
			Toast.error(err.message, { hideAfter: 1 });
		}
	};
	return { loading, createSavedRoute };
};

export default useCreateSavedRoute;
