import { Toast } from '@cogoport/components';
import { debounce } from '@cogoport/utils';
import { useCallback, useContext, useEffect } from 'react';

import { WaypointsContext } from '../common/context/WaypointsProvider';

import useRequest from '@/commons/hooks/useRequest';

const useValidateRoute = ({
	class_id, route_name, class_type,
}) => {
	const [{ loading, data }, trigger] = useRequest({
		method : 'get',
		url    : '/validate_customized_route',
	});
	const { actualWaypts } = useContext(WaypointsContext);

	const waypoint_location_ids = actualWaypts.map(({ id }) => id);

	const request = async (params) => {
		try {
			const res = await trigger({ params });
			if (params?.waypoint_location_ids && res?.data?.exists) {
				Toast.error(`This route already exists as "${res.data.route_name}"`, { hideAfter: 1 });
			}
		} catch (err) {
			// console.log(err);
		}
	};

	// eslint-disable-next-line react-hooks/exhaustive-deps
	const debouncedRequest = useCallback(debounce(request, 500), []);

	useEffect(() => {
		if (route_name) {
			debouncedRequest({ class_id, route_name, class_type });
		}
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [route_name, debouncedRequest]);

	useEffect(() => {
		request({ class_type, waypoint_location_ids, class_id });
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	return { loading, status: !data?.exists, request };
};

export default useValidateRoute;
