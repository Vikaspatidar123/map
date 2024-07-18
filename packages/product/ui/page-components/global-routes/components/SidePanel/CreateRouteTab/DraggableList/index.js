import update from 'immutability-helper';
import { useCallback, useContext } from 'react';

import { getId, WaypointsContext } from '../../../../common/context/WaypointsProvider';

import Card from './Card';
import styles from './styles.module.css';

function DraggableList() {
	const { waypoints, setWaypoints, setActiveKey } = useContext(WaypointsContext);
	const moveCard = useCallback((dragIndex, hoverIndex) => {
		setWaypoints((prev) => update(prev, {
			$splice: [
				[dragIndex, 1],
				[hoverIndex, 0, prev[dragIndex]],
			],
		}));
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	const handleDelete = (key) => {
		const newKey = getId();
		setActiveKey(newKey);
		setWaypoints((prev) => [...prev.filter((loc) => loc.key !== key && loc.pos), {
			value: '', label: '', pos: null, key: newKey,
		}]);
	};

	return (
		<div className={styles.container}>
			{waypoints.map((loc, i) => (
				loc.pos && (
					<Card
						key={loc.key}
						index={i}
						id={loc.key}
						data={loc}
						moveCard={moveCard}
						handleDelete={handleDelete}
						isLast={!waypoints?.[i + 1]?.pos}
						isFirst={!i}
					/>
				)
			))}
		</div>
	);
}

export default DraggableList;
