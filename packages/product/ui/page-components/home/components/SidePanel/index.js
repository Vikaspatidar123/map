import { IcMArrowUp, IcCBookmark } from '@cogoport/icons-react';
import React, { useContext, useEffect, useRef } from 'react';

import { WaypointsContext } from '../../common/context/WaypointsProvider';

import SavedRoutes from './SavedRoutes';
import SearchRoutes from './SearchRoutes';
import styles from './styles.module.css';

import useSwipeUp from '@/commons/hooks/useSwipeUp';

function SidePanel({
	tab, setTab, isMobile, setIsFull, isFull,
}) {
	const { setRoutes, setSavedRoutes } = useContext(WaypointsContext);
	const ref = useRef(null);
	const { swipedUp } = useSwipeUp(ref);
	const isSavedTab = tab === 'saved_routes';

	const handleTabChange = () => {
		setTab(isSavedTab ? 'search_routes' : 'saved_routes');
	};

	useEffect(() => {
		if (swipedUp) {
			setIsFull(false);
		}
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [swipedUp]);

	useEffect(() => {
		setRoutes([]);
		setSavedRoutes([]);
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [tab]);

	return (
		<div className={styles.container} ref={ref}>
			<div className={styles.heading}>
				<div className={`${styles.heading_text} ${isSavedTab ? styles.next_text : ''}`}>
					<h1>Shipment Planner</h1>
					<h1>Saved Routes</h1>
				</div>
				<IcCBookmark
					className={!isSavedTab ? styles.remove : ''}
					onClick={handleTabChange}
				/>
			</div>
			{isSavedTab ? <SavedRoutes /> : <SearchRoutes />}
			{isMobile ? (
				<IcMArrowUp
					className={[styles.toggle_icon, !isFull ? styles.inverse : ''].join(' ')}
					onClick={() => setIsFull((s) => !s)}
				/>
			) : null}
		</div>
	);
}

export default SidePanel;
