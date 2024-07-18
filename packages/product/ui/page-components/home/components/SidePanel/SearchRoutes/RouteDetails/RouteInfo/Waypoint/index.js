import { IcMServices, IcMCrossInCircle } from '@cogoport/icons-react';
import React from 'react';

import { line, btn } from '../styles.module.css';

import styles from './styles.module.css';

import { iconMappings } from '@/commons/configuration/color-options';

function Waypoint({
	fromData, toData, isLast, onClick = () => {}, isServicePt = false, isMain,
	onClear = () => {}, hide = false,
}) {
	const servicesCount = (fromData?.services?.prev?.length || 0) + (fromData?.services?.next?.length || 0);
	return (
		<div
			className={`${styles.container} ${isServicePt ? styles.service_container : ''}`}
		>
			<div className={styles.vertical_line}>
				<div className={[styles.icon_wrapper,
					styles[`icon_${fromData?.type}`]].join(' ')}
				>
					{isServicePt
						? (
							<button
								className={`${styles.service_btn} ${styles.editable} ${hide ? styles.hidden : ''}`}
								onClick={onClear}
							>
								<IcMServices className={styles.service_icon} />
								<IcMCrossInCircle className={`${hide ? styles.plus_icon : styles.cross_icon}`} />
							</button>
						)
						: iconMappings[fromData?.type === 'seaport' && fromData?.is_icd ? 'icd' : fromData?.type]}
				</div>
				{!isLast && (
					<div className={[line,
						styles[fromData?.path_type], isMain ? styles.primary : styles.secondary,
						isServicePt ? styles.service_line : ''].join(' ')}
					/>
				)}
			</div>

			<div className={`${hide ? styles.hide : ''}`}>
				<p
					className={`${styles.header} ${isServicePt ? styles.service : ''}`}
				>
					{fromData?.display_name || fromData?.temp_name}
				</p>
				<p className={`${styles.description} ${isServicePt ? styles.service : ''}`}>{fromData?.description}</p>
				{!isServicePt && (
					<div className={styles.btn_wrapper}>
						<p className={styles.small_text}>
							{servicesCount > 0
								? `${servicesCount} Service${servicesCount > 1 && 's'}` : ''}
						</p>
						{!isLast && (
							<button
								className={btn}
								onClick={() => onClick(fromData, toData)}
							>
								More Details
							</button>
						)}
					</div>
				)}
			</div>
		</div>
	);
}

export default Waypoint;
