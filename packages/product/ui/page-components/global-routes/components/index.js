import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';
import React, { useState } from 'react';

import WaypointProvider from '../common/context/WaypointsProvider';

import SidePanel from './SidePanel';
import styles from './styles.module.css';

const Map = dynamic(() => import('./Map'), {
	ssr: false,
});

function CustomiseRoute() {
	const router = useRouter();
	const { z, center = '' } = router.query;
	const prevCenter = center.split(',').map((pt) => parseFloat(pt));
	const [activeTab, setActiveTab] = useState('list_route');
	const [isFullView, setIsFullView] = useState(false);

	return (
		<WaypointProvider>
			<div className={styles.container}>
				<div className={`${styles.map}`}>
					<Map
						z={z}
						prevCenter={prevCenter.length > 1 ? prevCenter : null}
						activeTab={activeTab}
						isFullView={isFullView}
					/>
				</div>
				<SidePanel
					activeTab={activeTab}
					setActiveTab={setActiveTab}
					isFullView={isFullView}
					setIsFullView={setIsFullView}
				/>
			</div>
		</WaypointProvider>
	);
}

export default CustomiseRoute;
