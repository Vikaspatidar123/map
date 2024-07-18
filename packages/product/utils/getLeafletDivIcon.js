import { L } from '@cogoport/maps';
import ReactDOMServer from 'react-dom/server';

const getLeafletDivIcon = (
	SvgIcon,
	className,
	iconSize = [20, 20],
	iconAnchor = [10, 12],
	...rest
) => new L.DivIcon({
	html: ReactDOMServer.renderToString(SvgIcon),
	iconSize,
	iconAnchor,
	className,
	...rest,
});

export default getLeafletDivIcon;
