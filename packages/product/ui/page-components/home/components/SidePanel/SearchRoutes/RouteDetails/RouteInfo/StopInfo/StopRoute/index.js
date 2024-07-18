import { IcMArrowDown } from '@cogoport/icons-react';
import React, { useState } from 'react';

import { btn } from '../../styles.module.css';

import Accordion from './Accordion';
import styles from './styles.module.css';

import { iconMappings } from '@/commons/configuration/color-options';

function StopRoute({
	data, isLast, singlePt, isRoad,
}) {
	const [isOpen, setIsOpen] = useState(false);
	const {
		description, display_name, type, location_id, temp_name, temp_id,
	} = data;
	return (
		<div className={styles.location_container}>
			<div className={styles.vertical_line}>
				<div className={[styles.circle, isLast ? styles.secondary_circle : ''].join(' ')} />
				{!isLast && !singlePt && <div className={styles.colored_line} />}
				{!isLast && !singlePt && iconMappings[isRoad ? 'road' : type]}
			</div>

			<div style={{ width: '100%' }}>
				<p>{display_name || temp_name}</p>
				<p>{description}</p>
				{isOpen && <Accordion id={location_id || temp_id} type={type} />}
				<button
					className={[btn, styles.accordion_btn].join(' ')}
					aria-expanded={isOpen}
					onClick={() => setIsOpen(!isOpen)}
				>
					Details
					<IcMArrowDown />
				</button>
			</div>
		</div>
	);
}

export default StopRoute;
