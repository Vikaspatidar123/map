import { useMapEvents } from '@cogoport/maps';
import { useRef } from 'react';

function GetPoint({ handleClick = () => {} }) {
	const timerRef = useRef(null);

	useMapEvents({
		click(e) {
			clearTimeout(timerRef.current);

			timerRef.current = setTimeout(() => {
				handleClick(e);
			}, 200);
		},
		dblclick() {
			clearTimeout(timerRef.current);
		},
	});

	return (null);
}

export default GetPoint;
