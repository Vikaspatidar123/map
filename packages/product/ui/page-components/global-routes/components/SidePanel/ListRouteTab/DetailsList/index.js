import { Loader, Pagination, Tooltip } from '@cogoport/components';
import { IcMArrowBack, IcMFship } from '@cogoport/icons-react';
import { isEmpty } from '@cogoport/utils';
import React, { useContext, useEffect, useRef } from 'react';

import Waypoint from '../../../../common/Body/Waypoint';
import { WaypointsContext } from '../../../../common/context/WaypointsProvider';
import useListVesselSchedules from '../../../../hooks/useListVesselSchedules';

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

function DetailsList({ listFilters, setListFilters, currentSelectedId, setCurrentSelectedId }) {
	const { setActiveRoute, activeRoute, setBounds } = useContext(WaypointsContext);
	const { data = [], loading, total_count } = useListVesselSchedules(listFilters, setActiveRoute, currentSelectedId);

	const cardRef = useRef(null);

	const handleClick = (item) => {
		const points = getDecodedPath(item?.route?.points);
		const bounds = L.latLngBounds(!isEmpty(points) ? points : maxBounds);
		setBounds(bounds);

		setActiveRoute({ ...item, class_type: listFilters.class_type });
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
			<div className={styles.action_buttons}>
				<div
					className={styles.back_button}
					onClick={() => { setCurrentSelectedId(''); }}
					role="presentation"
				>
					<IcMArrowBack className={styles.back_icon} />
					Back
				</div>
				<Tooltip
					content={currentSelectedId.name}
				>
					<p className={styles.selcted_route_name}>
						{currentSelectedId.name}
					</p>
				</Tooltip>
			</div>
			{loading ? (
				<div className={styles.loader_container}>
					<Loader />
				</div>
			)
				: data.map((item) => {
					const isActive = activeRoute?.id === item?.id;
					const size = (item?.vessel_schedule_link || []).length;
					const vessel_schedule_link = !isActive
						? (item?.vessel_schedule_link || []).filter((loc, i) => !i || i === size - 1)
						: (item?.vessel_schedule_link || []);

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
									<Tooltip
										content={item?.operator?.business_name}
									>
										<h3 className={styles.header_name}>
											{item?.operator?.business_name}
										</h3>
									</Tooltip>

									{item?.vessel && (
										<p
											className={styles.vessel_container}
										>
											<IcMFship className={styles.vessel_icon} />
											{`${item?.vessel?.name} (${item?.vessel?.imo})`}
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

							{ vessel_schedule_link.map((pt) => (
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
									isVesselSchedule={{ eta: pt.eta, etd: pt.etd }}
								/>
							))}
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

export default DetailsList;
