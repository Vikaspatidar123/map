/* eslint-disable react-hooks/exhaustive-deps */
import { useRouter } from 'next/router';
import React, { useContext, useEffect, useState } from 'react';

import { WaypointsContext } from '../../../common/context/WaypointsProvider';
import useGetSavedRoutes from '../../../hooks/useGetSavedRoutes';
import useRoutes from '../../../hooks/useRoutes';

import GeoCoder from './GeoCoder';
import PopularRoutes from './PopularRoutes';
import RouteDetails from './RouteDetails';
import styles from './styles.module.css';

import { decodeUuid, encodeUuid } from '@/commons/utils/queryUtils';

function SearchRoutes() {
	const router = useRouter();
	const { waypts = '' } = router.query;
	const { waypoints, setWaypoints } = useContext(WaypointsContext);
	const [isUpdated, setIsupdated] = useState(false);

	const { loading } = useRoutes();
	const { loading: savedLoading } = useGetSavedRoutes();

	const actualWaypts = waypoints.filter(({ id }) => !!id);
	const showRoutes = actualWaypts.length > 1;

	const routerDependency = actualWaypts.map(({ id }) => encodeUuid(id)).join(',');

	useEffect(() => {
		if (routerDependency || isUpdated) {
			const query = { ...router.query };
			if (!routerDependency) {
				delete query.waypts;
				router.push({ pathname: router.pathname, query });
			} else {
				router.push({
					pathname : router.pathname,
					query    : { ...query, waypts: routerDependency },
				});
			}
			if (!isUpdated) setIsupdated(true);
		}
	}, [routerDependency, isUpdated]);

	useEffect(() => {
		if (waypts && !isUpdated) {
			const initialPoints = waypts.split(',').flat().map((id) => decodeUuid(id));
			const newWaypoints = waypoints.map((option, i) => (i < initialPoints.length ? ({
				...option,
				id: initialPoints[i],
			}) : option));
			setWaypoints(newWaypoints);
		}
	}, [waypts]);

	return (
		<div>
			<GeoCoder />
			<div className={styles.horizontal_line} />
			<div className={showRoutes ? styles.hide_explore : ''}>
				<PopularRoutes />
			</div>
			{showRoutes && <RouteDetails tabType="search_routes" loading={loading || savedLoading} />}
		</div>
	);
}

export default SearchRoutes;
