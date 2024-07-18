import List from './List';
import StopRoute from './StopRoute';
import styles from './styles.module.css';

import air_prices from '@/ui/page-components/home/configurations/air_prices';
import ocean_prices from '@/ui/page-components/home/configurations/shipping_lines';
import turck_prices from '@/ui/page-components/home/configurations/turck_prices';

const config_mapping = {
	seaport : ocean_prices,
	airport : air_prices,
};

function StopInfo({ stopInfo, price_data }) {
	const wayRoutes = (Object.values(stopInfo || {}) || []).filter(({ coordinates }) => !!coordinates);
	const isSingle = wayRoutes.length === 1;

	let pricesConfig = turck_prices;

	Object.entries(config_mapping).forEach(([key, val]) => {
		if (stopInfo?.from?.type === key && stopInfo?.to?.type === key) {
			pricesConfig = val;
		}
	});

	const id = stopInfo?.from?.id || stopInfo?.to?.id;
	const isRoad = wayRoutes?.[0]?.path_type === 'land' || wayRoutes?.[1]?.path_type === 'land';

	return (
		<>
			<div className={styles.container}>
				{wayRoutes.map((data, idx) => (
					<StopRoute
						key={data?.type}
						data={data}
						isLast={idx}
						singlePt={wayRoutes.length === 1}
						isRoad={isRoad}
					/>
				))}
			</div>
			<div className={styles.horizontal_line} />
			{!isSingle && [pricesConfig].map((config) => (
				<List
					key={config?.heading}
					data={price_data?.prices?.[id] || price_data}
					config={config}
				/>
			))}

		</>
	);
}

export default StopInfo;
