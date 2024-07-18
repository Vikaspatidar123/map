import React, { useContext } from 'react';

import popular_trade_routes from '../../../../configurations/popular_trade_routes.json';
import PortPairs from '../RouteDetails/CardList/Card/PortPairs';

import styles from './styles.module.css';

import { WaypointsContext } from '@/ui/page-components/home/common/context/WaypointsProvider';

function PopularRoutes() {
	const { setWaypoints } = useContext(WaypointsContext);

	const handleClick = (data) => {
		setWaypoints((prev) => prev.slice(0, 2).map((loc, idx) => ({
			key : loc.key,
			id  : !idx ? data.origin.id : data.destination.id,
		})));
	};

	return (
		<div className={styles.container}>
			<p className={styles.heading}>POPULAR TRADE ROUTES</p>
			{popular_trade_routes.map((data) => (
				<div
					role="button"
					key={data.id}
					tabIndex="0"
					className={styles.card}
					onClick={() => handleClick(data)}
				>
					<PortPairs data={data} />
				</div>
			))}
		</div>
	);
}

export default PopularRoutes;
