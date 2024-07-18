import { baseLayer } from '@/assets/assets';

export const maxBounds = [
	[-90, -Infinity],
	[90, Infinity],
];

const getDefaultMapProps = ({ isMobile = false }) => {
	const position = isMobile ? 'bottomright' : 'topright';

	return {
		baseLayer,
		maxBounds,
		maxZoom        : 12,
		zoomPosition   : position,
		layersPosition : position,
		scaleControl   : !isMobile,
	};
};

export default getDefaultMapProps;
