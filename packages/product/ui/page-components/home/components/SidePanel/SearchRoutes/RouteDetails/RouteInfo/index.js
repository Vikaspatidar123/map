import { isEmpty } from '@cogoport/utils';
import React, { useContext, useEffect, useState } from 'react';
// import { useSelector } from 'react-redux';

import { more_btn } from '../CardList/styles.module.css';

import StopInfo from './StopInfo';
import styles from './styles.module.css';
import Waypoint from './Waypoint';

import { WaypointsContext } from '@/ui/page-components/home/common/context/WaypointsProvider';
import Footer from '@/ui/page-components/home/common/Footer';
import useGetPrice from '@/ui/page-components/home/hooks/useGetPrice';

let L;

if (typeof window !== 'undefined') {
	// eslint-disable-next-line global-require
	({ L } = require('@cogoport/maps'));
}

const maxBounds = [
	[-80, -Infinity],
	[80, Infinity],
];
function RouteInfo({ activeRoute, setStopInfo, stopInfo }) {
	const { waypoints, setActiveRoute, setBounds } = useContext(WaypointsContext);

	const [serviceMapping, setServiceMapping] = useState({});

	const { routes:[route], main_service } = activeRoute;
	const actualWaypts = waypoints.filter(({ pos }) => !!pos);
	// const params = (route?.lineString || []).map(({ id, price_params }) => ({ ...price_params, id }));

	// const { user } = useSelector(({ profile }) => profile);

	const { loading, data } = useGetPrice();
	const locationPoints = (route?.lineString || []).map((leg, i) => ((leg?.waypoints || []).map((pt, idx) => ({
		...pt,
		summary   : !idx ? leg.summary : {},
		path      : !idx ? leg.path : null,
		id        : !idx ? leg?.id : null,
		path_type : (!idx || (idx < ((leg?.waypoints || []).length - 1))) ? leg?.type : null,
		temp_name : !(idx + i) ? actualWaypts[0]?.display_name : actualWaypts.slice(-1)?.[0]?.display_name,
		temp_id   : !(idx + i) ? actualWaypts[0]?.id : actualWaypts.slice(-1)?.[0]?.id,
	})))).flat();

	const onClick = (from = {}, to = {}) => {
		setStopInfo({ from, to });
		const bounds = L.latLngBounds((from?.path || to?.path || maxBounds));
		setBounds(bounds);
	};

	// useEffect(() => {
	// 	getPrice({ price_params: params, user_id: user?.id });
	// }, []);
	const dependency = locationPoints.map(({ location_id }) => location_id).join('_');

	useEffect(() => {
		const allServices = (locationPoints || []).reduce((acc, { location_id = '', services = {} }) => {
			acc[location_id] = { prev: services.prev || [], next: services.next || [] };
			return acc;
		}, {});

		setServiceMapping(allServices);
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [dependency]);

	return (
		<div className={styles.container}>
			<Footer
				data={stopInfo || route}
				allowSingle={!stopInfo}
				loading={loading}
				price_data={data}
				showPrice
			/>
			{stopInfo ? (
				<StopInfo
					stopInfo={stopInfo}
					price_data={data}
					loading={loading}
				/>
			) : (
				<>
					<button className={more_btn} onClick={() => setActiveRoute(null)}>Back to all routes</button>
					<div style={{ marginTop: '16px' }}>
						{(locationPoints).map((loc, idx) => {
							const isLast = (idx === locationPoints.length - 1) && isEmpty(loc?.services?.next);
							const isMain = (main_service === loc?.path_type);
							const handleClear = (value, key) => {
								const keyMap = ['next', 'prev'];
								const curKey = keyMap[+(key === 'prev')];
								const prevKey = keyMap[+(key !== 'prev')];

								setServiceMapping({
									...serviceMapping,
									[loc?.location_id]: {
										[curKey]: [...(serviceMapping[loc?.location_id]?.[curKey] || [])
											.map((service) => (service?.value === value ? {
												...service,
												hide: !service?.hide,
											} : service))],
										[prevKey]: serviceMapping[loc?.location_id]?.[prevKey],
									},
								});
							};

							return (
								<>
									{(serviceMapping[loc?.location_id]?.prev || []).map(({ value, type, hide }) => (
										<Waypoint
											key={`${type}_${loc?.location_id}`}
											isServicePt
											hide={hide}
											fromData={{ display_name: value, type, path_type: loc?.path_type }}
											onClear={() => handleClear(value, 'prev')}
											isMain={isMain}
										/>
									))}
									<Waypoint
										key={loc?.location_id}
										fromData={loc}
										isMain={isMain}
										toData={locationPoints[idx + 1]}
										isLast={isLast}
										onClick={onClick}
									/>
									{(serviceMapping?.[loc?.location_id]?.next || [])
										.map(({ value, type, hide }, i) => (
											<Waypoint
												key={`${type}_${loc?.location_id}`}
												isServicePt
												isMain={isMain}
												hide={hide}
												isLast={i === (serviceMapping?.[loc?.location_id]?.next
													|| []).length - 1
												&& (idx === locationPoints.length - 1)}
												fromData={{ display_name: value, type, path_type: loc?.path_type }}
												onClear={() => handleClear(value, 'next')}
											/>
										))}
								</>
							);
						})}
					</div>
				</>
			)}
		</div>
	);
}

export default RouteInfo;
