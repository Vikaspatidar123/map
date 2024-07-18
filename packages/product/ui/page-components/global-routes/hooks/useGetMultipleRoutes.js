import { isEmpty } from '@cogoport/utils';
import { useContext } from 'react';

import { WaypointsContext } from '../common/context/WaypointsProvider';

import useRequest from '@/commons/hooks/useRequest';
import { maxBounds } from '@/commons/utils/getDefaultMapProps';
import isValidPoint from '@/utils/isValidPoint';

let L;

if (typeof window !== 'undefined') {
	// eslint-disable-next-line global-require
	({ L } = require('@cogoport/maps'));
}

const useGetMultipleRoutes = ({ endpoint = '' }) => {
	const {
		setRoutes, setWaypoints, actualWaypts, setBounds,
	} = useContext(WaypointsContext);

	const [{ loading }, trigger] = useRequest({
		url    : `/${endpoint}`,
		method : 'get',
	}, { manual: true });

	const params = { points: { coordinates: actualWaypts.map(({ pos }) => (pos).map((pt) => parseFloat(pt))) } };

	const getRoutes = async () => {
		try {
			const res = await trigger({ params });
			if (res?.data?.routes) {
				const points = res?.data?.points || [];
				const bounds = L.latLngBounds(!isEmpty(points) ? points : maxBounds);
				setBounds(bounds);

				setWaypoints((prev) => prev.map((pt, i) => (i < points.length && isValidPoint(points[i])
					? ({ ...pt, display_pos: points[i] })
					: pt)));
				setRoutes(res.data.routes);
			} else {
				setRoutes([]);
			}
		} catch (err) {
			setRoutes([]);
		}
	};

	return {
		loading, getRoutes,
	};
};

export default useGetMultipleRoutes;
