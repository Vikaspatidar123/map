import React from 'react';

import {
	tab, active_tab, icon, shipping_line_card, logo_icon, applied_filters_container,
} from '../styles.module.css';

import { iconMappings } from '@/commons/configuration/color-options';
import { class_type_mapping } from '@/ui/page-components/global-routes/common/utils';

function AppliedFilters({ globalFilters }) {
	const {
		class_type, short_name, logo_url,
	} = globalFilters;
	return (
		<div className={applied_filters_container}>
			<button
				className={[tab, active_tab,
				].join(' ')}
			>
				<div className={icon}>
					{iconMappings[class_type_mapping[class_type]]}
				</div>
			</button>

			{short_name && (
				<div className={shipping_line_card}>
					<div
						className={logo_icon}
						style={{ backgroundImage: `url(${logo_url})` }}
					/>
					<span>{short_name}</span>
				</div>
			)}
		</div>
	);
}

export default AppliedFilters;
