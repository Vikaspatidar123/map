import { format } from '@cogoport/utils';
import React from 'react';

import styles from '../styles.module.css';

import getMainLocation from '@/utils/getMainLocation';

function Waypoint({
	display_name, isLast, order, service_type, routeInfo = '', name, header_className,
	circle_radius = 12, circle_className, isVesselSchedule = false,
}) {
	return (
		<div className={styles.card}>
			<div
				className={styles.vertical_line}
				style={{
					width: `${2 * circle_radius}px`,
				}}
			>
				<span
					className={[styles.circle, styles[service_type], circle_className].join(' ')}
				>
					{order}
				</span>
				{!isLast && (
					<div
						className={[styles.line, styles[service_type]].join(' ')}
					>
						{routeInfo ? <span>{routeInfo}</span> : null}
					</div>
				)}
			</div>
			<div className={styles.text_container}>
				<h4 className={header_className}>{name || display_name}</h4>
				{
					isVesselSchedule ? (
						<div className={styles.vessels_container}>
							<p>
								<span>ETA:</span>
								{format(isVesselSchedule.eta, 'yyyy-MMM-dd')}
							</p>
							<p>
								<span>ETD:</span>
								{format(isVesselSchedule.etd, 'yyyy-MMM-dd')}
							</p>
						</div>
					) : <p>{getMainLocation(display_name || name)}</p>
				}
			</div>
		</div>
	);
}

export default Waypoint;
