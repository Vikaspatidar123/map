// import { Placeholder } from '@cogoport/components';
import { isEmpty } from '@cogoport/utils';
import React from 'react';

import styles from './styles.module.css';

// import getFormattedPrice from '@/assets/getFormattedPrice';

const getTime = (time = 0) => {
	const days = Math.floor(time / (3600 * 24));
	const hours = Math.floor((time % (3600 * 24)) / 3600);

	let result = '';
	if (days > 0) {
		result += `${days} day${days > 1 ? 's' : ''} `;
	}
	if (hours > 0) {
		result += `${hours} hr${hours > 1 ? 's' : ''} `;
	}
	return result;
};

function Footer({
	data, allowSingle = true, showPrice = false,
}) {
	if (!allowSingle && isEmpty(data?.to)) return null;

	let summary = data?.from?.summary;

	// let id = data?.from?.id;

	if (isEmpty(summary)) {
		summary = data?.to?.summary || {};
		// id = data?.to?.id;
	}

	const { length, time } = summary;
	const { total_length, total_time } = data?.summary || {};

	// const { total_price, total_currency } = price_data || {};

	// const { price, currency } = price_data?.prices?.[id]?.[0]?.price || {};

	const options = [
		{
			label       : 'Price',
			value       : '__',
			showElement : showPrice,
		},
		{
			label       : 'Distance',
			value       : (total_length || length),
			unit        : 'km',
			showElement : true,
		},
		{
			label       : 'Time',
			value       : getTime(total_time || time),
			showElement : true,
		},
	];
	return (
		<>
			<div className={styles.row}>
				{/* {showPrice && !id && (
					<div>
						<p className={styles.label}>Price</p>
						<p className={styles.value}>
							{loading
								? <Placeholder width="40px" height="18px" />
								: (
									<>
										{getFormattedPrice(id ? price : total_price, id ? currency : total_currency, {
											currencyDisplay: 'symbol',
										}) || 'NA'}
										{price_data?.is_partial ? <sup>*</sup> : null}
									</>
								)}
						</p>
					</div>
				)} */}

				{options.map(({
					label, value, unit, showElement,
				}) => (showElement ? (
					<div key={label}>
						<p className={styles.label}>
							{label}
						</p>
						<p className={styles.value}>
							{unit ? `${parseFloat(value).toFixed(2)} ${unit || ''}` : value}
						</p>
					</div>
				) : null))}
			</div>
			{/* {price_data?.is_partial && (
				<p className={styles.italic}>
					* Rates are only available for main Freight & may vary
				</p>
			)} */}

		</>
	);
}

export default Footer;
