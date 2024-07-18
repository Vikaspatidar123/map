import { Loader, Pagination, Button } from '@cogoport/components';
import { IcMFship } from '@cogoport/icons-react';
import { isEmpty } from '@cogoport/utils';
import React, { useContext, useEffect, useRef } from 'react';

import Waypoint from '../../../../common/Body/Waypoint';
import { WaypointsContext } from '../../../../common/context/WaypointsProvider';
import useListServiceLanes from '../../../../hooks/useListServiceLanes';

import styles from './styles.module.css';

import getDecodedPath from '@/commons/utils/getDecodedPath';
import { maxBounds } from '@/commons/utils/getDefaultMapProps';
import MoreRoutes from '@/ui/page-components/global-routes/common/MoreRoutes';
import EmptyState from '@/ui/page-components/home/common/EmptyState';

let L;

if (typeof window !== 'undefined') {
	// eslint-disable-next-line global-require
	({ L } = require('@cogoport/maps'));
}

function List({ listFilters, setListFilters, setCurrentSelectedId }) {
	const { setActiveRoute, activeRoute, setBounds } = useContext(WaypointsContext);
	const { data = [], loading, total_count } = useListServiceLanes(listFilters, setActiveRoute);

	const cardRef = useRef(null);

	const handleClick = (item) => {
		const points = getDecodedPath(item?.route?.points);
		const bounds = L.latLngBounds(!isEmpty(points) ? points : maxBounds);
		setBounds(bounds);

		setActiveRoute({ ...item, class_type: listFilters.class_type });
	};

	const showVesselSchedules = (val, name) => {
		setCurrentSelectedId({ id: val, name });
	};

	useEffect(() => {
		cardRef.current?.scrollIntoView({
			behavior : 'smooth',
			block    : 'center',
			inline   : 'center',
		});
	}, [activeRoute?.id]);

	return (
		<div className={styles.container}>
			{loading ? (
				<div className={styles.loader_container}>
					<Loader />
				</div>
			)
				: data.map((item) => {
					const isActive = activeRoute?.id === item?.id;
					const size = (item?.service_lane_links || []).length;
					const service_lane_links = !isActive
						? (item?.service_lane_links || []).filter((loc, i) => !i || i === size - 1)
						: (item?.service_lane_links || []);

					return (
						<div
							key={item?.id || item?.location_id}
							role="button"
							tabIndex="0"
							className={`${styles.card} ${isActive ? styles.active_card : ''}`}
							onClick={() => handleClick(item)}
							style={{ backgroundImage: `url(${item?.operator?.logo_url})` }}
							ref={isActive ? cardRef : null}
						>
							<div className={styles.header}>
								<div>
									<h3 style={{
										fontSize   : '15px',
										fontWeight : '600',
										maxWidth   : '290px',
									}}
									>
										{item?.name}
									</h3>

									{item?.operator?.business_name && (
										<p
											className={styles.vessel_container}
										>
											<IcMFship className={styles.vessel_icon} />
											{item?.operator?.business_name}
										</p>
									)}
									<p style={{ fontWeight: '500', fontSize: '13px' }}>
										Distance:
										<span style={{ marginLeft: '8px', fontWeight: '400' }}>
											{Math.round(item?.route?.length)}
											km
										</span>

									</p>
								</div>
							</div>

							{ service_lane_links.map((pt) => (
								<Waypoint
									key={pt.location_id}
									display_name={pt.display_name}
									isLast={pt.order === size - 1}
									order={(pt?.order || 0) + 1}
									service_type={item?.main_service}
									header_className={styles.location_text}
									circle_className={`${styles.circle} 
										${(!pt?.order || pt?.order === size - 1)
										? styles.large_circle : ''}`}
									circle_radius={18}
									routeInfo={(size > 2 && !isActive)
										? <MoreRoutes service_type={item?.main_service} /> : null}
								/>
							))}
							<Button onClick={() => showVesselSchedules(item.id, item?.name)} className={styles.vessel_schedules_button}>Show Vessel Schedules</Button>
						</div>
					);
				})}

			{!loading && !data?.length && (
				<EmptyState
					header="No Routes found!!"
					description="Looks like there are no routes available."
				/>
			)}

			{Number(total_count) > 10 ? (
				<Pagination
					type="compact"
					currentPage={listFilters.page}
					totalItems={total_count}
					pageSize={10}
					onPageChange={(page) => setListFilters((prev) => ({ ...prev, page }))}
				/>
			) : null}
		</div>
	);
}

export default List;
