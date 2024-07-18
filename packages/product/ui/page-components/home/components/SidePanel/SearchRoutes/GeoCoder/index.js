// import { IcMPlusInCircle } from '@cogoport/icons-react';
import React, { useContext } from 'react';

import { WaypointsContext } from '../../../../common/context/WaypointsProvider';

import List from './List';
import styles from './styles.module.css';

function GeoCoder() {
	const { waypoints, setWaypoints } = useContext(WaypointsContext);

	// const n = waypoints.length;

	// const handleAddStop = () => {
	// 	setWaypoints([
	// 		...(waypoints.slice(0, waypoints.length - 1)),
	// 		{ value: '', pos: null, id: getId() }, ...waypoints.slice(-1),
	// 	]);
	// };

	return (
		<div className={styles.container}>
			<List waypoints={waypoints} setWaypoints={setWaypoints} />
			{/* {waypoints[n - 1]?.value
				&& (
					<button className={styles.button_wrapper} onClick={handleAddStop} disabled={n >= 10}>
						<IcMPlusInCircle className={styles.icon} />
						Add Stop
					</button>
				)} */}
		</div>

	);
}

export default GeoCoder;
