import { IcMOpenlink } from '@cogoport/icons-react';
import { startCase } from '@cogoport/utils';
import { useRouter } from 'next/router';
import React from 'react';

import styles from '../styles.module.css';

import location_type_mapping from '@/commons/configuration/location_type_mapping';

const keys_mapping = {
	common  : [{ label: 'Address', key: 'display_name' }, { label: 'Postal Code', key: 'postal_code' }],
	seaport : [{ label: 'Port Code', key: 'port_code' }],
	airport : [{ label: 'Port Code', key: 'site_code' }],
};

function PortInfo({ data, onMouseEnter = () => {}, handleClick = () => {} }) {
	const router = useRouter();

	const handleRedirect = (e, id) => {
		e.stopPropagation();
		router.push(
			'/trade-info/[dataation_id]',
			`/trade-info/${id}`,
		);
	};

	return (
		<div
			key={data.id}
			role="button"
			tabIndex="0"
			className={styles.card}
			onMouseEnter={() => onMouseEnter({
				id  : data?.id,
				pos : [data?.latitude, data?.longitude],
			})}
			onClick={() => handleClick([data?.latitude, data?.longitude])}
		>
			<div className={styles.header}>
				<h4>{data?.name}</h4>
				<div className={`${styles.port_info} ${styles[data.type]}`}>
					{location_type_mapping[data.type].icon}
					<span>{startCase(data?.type)}</span>
				</div>
			</div>

			{[...keys_mapping.common, ...keys_mapping[data.type]].map(({ label, key }) => (
				<div key={key} className={styles.row}>
					<span>{`${label} : `}</span>
					<span className={styles.value}>{data[key] || '-'}</span>
				</div>
			))}
			<IcMOpenlink className={styles.redirect} onClick={(e) => handleRedirect(e, data.id)} />
		</div>
	);
}

export default PortInfo;
