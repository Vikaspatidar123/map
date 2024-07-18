import { Toast } from '@cogoport/components';
import { useContext } from 'react';

import { WaypointsContext } from '../common/context/WaypointsProvider';

import useRequest from '@/commons/hooks/useRequest';

const useCreateCustomizedRoute = ({
	globalFilters:  {
		route_name, class_id, class_type, vessel_name, decoder_key,
	},
	actualWaypts,
}) => {
	const [{ loading }, trigger] = useRequest({
		method : 'post',
		url    : '/create_customized_route',
	});

	const { setRoutes } = useContext(WaypointsContext);

	const payload = {
		route_name,
		vessel_name,
		class_id,
		decoder_key,
		class_type,
		waypoint_location_ids: actualWaypts.map((pt) => pt.id),
	};

	const createRoute = async () => {
		try {
			const res = await trigger({ data: payload });
			if (res.status === 200) {
				Toast.success('Route created successfully!!', { hideAfter: 2 });
				setRoutes([]);
			}
		} catch (err) {
			Toast.error(err.message, { hideAfter: 5 });
		}
	};

	return { loading, createRoute };
};

export default useCreateCustomizedRoute;
