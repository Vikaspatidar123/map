import { IcMArrowLeft, IcMPlus } from '@cogoport/icons-react';
import { useContext, useEffect } from 'react';

import { WaypointsContext } from '../../common/context/WaypointsProvider';

import CreateRouteTab from './CreateRouteTab';
import ListRouteTab from './ListRouteTab';
import styles from './styles.module.css';

function SidePanel({
	activeTab, setActiveTab, isFullView, setIsFullView,
}) {
	const { setActiveRoute, setRoutes } = useContext(WaypointsContext);
	const isCreateTab = activeTab === 'create_route';

	const handleTabChange = () => {
		setActiveTab(isCreateTab ? 'list_route' : 'create_route');
	};

	useEffect(() => {
		if (isCreateTab) {
			setActiveRoute({});
		} else {
			setRoutes([]);
		}
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [activeTab]);

	return (
		<>
			<div className={`${styles.side_container} ${isFullView && styles.hide}`}>
				<div className={styles.heading}>
					<div className={`${styles.heading_text} ${isCreateTab ? styles.next_text : ''}`}>
						<h1>Global Routes</h1>
						<h1>Create Route</h1>
					</div>
					{ false && (
						<button
							className={`${styles.plus_icon} ${isCreateTab ? styles.active : ''}`}
							onClick={handleTabChange}
						>
							<IcMPlus />
						</button>
					)}

				</div>
				{isCreateTab
					? <CreateRouteTab />
					: <ListRouteTab />}
			</div>
			<button
				onClick={() => setIsFullView((s) => !s)}
				className={`${styles.toggle_icon} ${isFullView ? styles.rotate_toggle : ''}`}
			>
				<IcMArrowLeft />
			</button>

		</>
	);
}

export default SidePanel;
