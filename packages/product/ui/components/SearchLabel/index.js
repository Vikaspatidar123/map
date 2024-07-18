import { IcMProvision } from '@cogoport/icons-react';
import { startCase } from '@cogoport/utils';
import Image from 'next/image';
import React from 'react';

import styles from './styles.module.css';

import location_type_mapping from '@/commons//configuration/location_type_mapping';
import getMainLocation from '@/utils/getMainLocation';
import toTitleCase from '@/utils/toTitleCase';

function SearchLabel({
	display_name = '', type, code = '', history = false, trending = false,
}) {
	const main_location = getMainLocation(display_name) || '';
	const urlHost = 'https://cogoport-production.sgp1.digitaloceanspaces.com';

	return (
		<div className={styles.container}>
			{trending && (
				<div className={`${styles.trending} hide_later`}>
					<Image
						src={`${urlHost}/620e0fa1cd798b664d7bcaa0fae81b18/8672866_ic_fluent_arrow_trending_filled_icon.svg`}
						alt="My SVG"
						width={12}
						height={12}
					/>
				</div>
			)}
			<div className={`${styles.icon_container}`}>
				{history ? <IcMProvision /> : location_type_mapping[type]?.icon}
			</div>
			<div>
				<h4 className={`${styles.main_heading} search_label_heading_text`}>
					{toTitleCase(display_name)}
				</h4>
				<p className={`${styles.description} hide_later`}>
					{toTitleCase(main_location
					|| display_name)}

				</p>
			</div>
			<span className={`${styles.code} hide_later`}>
				{code}
			</span>

			{(history || location_type_mapping[type]?.showType)
				&& <span className={`${styles.type} hide_later`}>{startCase(type)}</span>}
		</div>

	);
}

export default SearchLabel;
