import { getByKey } from '@cogoport/utils';

import styles from './styles.module.css';

import getFormattedPrice from '@/assets/getFormattedPrice';
import truck_types from '@/ui/page-components/home/constants/truck_types.json';

export default {
	renderPrice: (data, field) => {
		const {
			price, currency,
		} = getByKey(data, field.key) || {};

		return (
			<div className={styles.price_container}>
				{getFormattedPrice(price || data?.price, currency || data?.currency, {
					currencyDisplay: 'symbol',
				})}
			</div>
		);
	},
	renderShippingLine: (data, field) => {
		const shipping_line = getByKey(data, field.key);
		return (

			<div className={styles.container}>
				<div className={styles.logo} style={{ backgroundImage: `url(${shipping_line?.logo_url})` }} />
				<p className={styles.label}>{shipping_line.business_name}</p>
			</div>

		);
	},
	renderTruckType: (data, field) => {
		const truck_type = getByKey(data, field.key);
		return (
			<p className={styles.label}>{truck_types[truck_type].label}</p>
		);
	},
};
