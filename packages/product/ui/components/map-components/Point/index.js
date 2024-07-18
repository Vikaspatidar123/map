import { Marker, Tooltip, L } from '@cogoport/maps';
import React from 'react';

import styles from './styles.module.css';

export const getIcon = ({ className, size = [12, 12] }) => L.divIcon({
	className,
	iconSize    : L.point(...size),
	popupAnchor : [0, -15],
});

const Point = React.forwardRef(({
	position, tooltipText = '', tooltipProps = {}, isActive = false, service_name = 'default', size = [12, 12], ...rest
}, ref) => (
	<Marker
		position={position}
		icon={getIcon({
			className: `${styles.point_animation}
			${styles[service_name]} ${!isActive ? styles.hide_animation : ''}`,
			size,
		})}
		{...rest}
		ref={ref}
	>
		{tooltipText && (
			<Tooltip {...tooltipProps}>
				{tooltipText}
			</Tooltip>
		)}
	</Marker>
));

export default Point;
