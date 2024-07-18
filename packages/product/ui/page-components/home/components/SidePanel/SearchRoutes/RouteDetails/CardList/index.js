import React, { useState } from 'react';

import Card from './Card';
import Header from './Header';
import styles from './styles.module.css';

function CardList({
	activeTab, data, tabType, refetchRoutes,
}) {
	const [isOpen, setIsOpen] = useState(activeTab !== 'all');
	const {
		main_service, status, id,
	} = data || {};
	const routes = tabType === 'saved_routes' ? [data?.route] : data?.routes || [];

	const allRoutes = (tabType === 'search_routes' && !isOpen) ? routes.slice(0, 1) : routes;
	const showFooter = tabType === 'search_routes' && activeTab === 'all' && routes.length > 1;
	const is_bookmarked = (tabType === 'saved_routes' && status === 'active');

	return (
		<div className={styles.container}>
			{tabType === 'search_routes' && <Header main_service={main_service} />}

			{allRoutes.map((route) => (
				<>
					{tabType === 'saved_routes' && (
						<Header
							key={`_${route?.summary?.total_length}`}
							main_service={main_service}
						/>
					)}
					<Card
						key={route?.id}
						route={route}
						main_service={main_service}
						tabType={tabType}
						is_bookmarked={is_bookmarked || !!route?.saved_route_id}
						route_id={id || route?.saved_route_id}
						refetchRoutes={refetchRoutes}
					/>
				</>
			))}

			{showFooter && (
				<button
					className={styles.more_btn}
					onClick={() => setIsOpen(!isOpen)}
				>
					{isOpen ? 'see less' : `${routes.length - 1} more routes`}
				</button>
			)}
		</div>
	);
}

export default CardList;
