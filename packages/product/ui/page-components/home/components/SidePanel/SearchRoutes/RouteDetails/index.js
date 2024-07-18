import { IcMArrowBack } from '@cogoport/icons-react';
import { isEmpty } from '@cogoport/utils';
import React, {
	useContext, useEffect, useRef, useState,
} from 'react';

import CardList from './CardList';
import CustomTabs from './CustomTabs';
import LoaderRoutes from './LoaderRoutes';
import RouteInfo from './RouteInfo';
import styles from './styles.module.css';

import { WaypointsContext } from '@/ui/page-components/home/common/context/WaypointsProvider';
import EmptyState from '@/ui/page-components/home/common/EmptyState';
import tab_options from '@/ui/page-components/home/configurations/tab_options';

function RouteDetails({
	tabType, loading, refetchRoutes,
}) {
	const {
		activeTab, activeRoute, routes, savedRoutes,
	} = useContext(WaypointsContext);

	const [isSticky, setIsSticky] = useState(false);
	const [stopInfo, setStopInfo] = useState(null);
	const ref = useRef();

	const all_routes = [...savedRoutes, ...routes];

	const tabOptions = tab_options(tabType);
	const selectedRoutes = activeTab === 'all' || tabType === 'saved_routes'
		? all_routes
		: all_routes.filter(({ main_service }) => main_service === activeTab);

	useEffect(() => {
		const cachedRef = ref?.current;
		const observer = new IntersectionObserver(
			([e]) => setIsSticky(e.intersectionRatio < 1),
			{
				root      : null,
				threshold : [1],
			},
		);
		if (cachedRef) observer.observe(cachedRef);

		return () => observer?.unobserve(cachedRef);
	}, [ref]);

	return (
		<div className={styles.container}>
			<div ref={ref} className={[styles.header, isSticky ? styles.sticky : ''].join(' ')}>
				<p className={`${styles.heading} ${stopInfo ? styles.with_back_icon : ''}`}>
					{stopInfo && (
						<IcMArrowBack
							onClick={() => setStopInfo(null)}
							className={styles.back_icon}
						/>
					)}
					Route Details
				</p>
				{/* <button className={styles.event_btn}>{activeRoute ? 'Filters' : 'Options'}</button> */}
			</div>
			{!stopInfo && (
				<CustomTabs
					activeTab={activeTab}
					routes={all_routes}
					tabOptions={tabOptions}
					tabType={tabType}
				/>
			)}
			{activeRoute ? <RouteInfo activeRoute={activeRoute} setStopInfo={setStopInfo} stopInfo={stopInfo} /> : (
				<>
					{selectedRoutes.map((data) => (
						<>
							<CardList
								activeTab={activeTab}
								data={data}
								key={data?.main_service}
								tabType={tabType}
								refetchRoutes={refetchRoutes}
							/>
							{(tabType === 'search_routes' && !isEmpty(data)) ? (
								<div
									key={`${data?.routes?.[0]?.id}_${data?.main_service}`}
									className={styles.line}
								/>
							) : <br />}
						</>
					))}
					{!loading && !selectedRoutes?.length && (
						<EmptyState
							header={tabType === 'saved_routes'
								? "You don't have any saved routes" : 'No routes found !!'}
							description={tabType === 'saved_routes'
								? '' : 'No routes found for this waypoints'}
						/>
					)}
				</>
			)}
			{loading ? (
				<div>
					{[1, 2].map((i) => <LoaderRoutes key={i} />)}
				</div>
			) : null}
		</div>
	);
}

export default RouteDetails;
