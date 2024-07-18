import { L } from '@cogoport/maps';

const getLeafletIcon = (
	iconUrl = '/images/default.svg',
	iconSize = [24, 24],
	iconAnchor = [12.25, 24.5],
	className = '',
	...rest
) => new L.Icon({
	iconUrl,
	iconSize,
	iconAnchor,
	className,
	...rest,
});

export default getLeafletIcon;
