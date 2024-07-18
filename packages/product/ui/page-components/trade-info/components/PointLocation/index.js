import { IcMExpand } from '@cogoport/icons-react';
import dynamic from 'next/dynamic';
import React, { useEffect, useState } from 'react';

import useGetNearestPorts from '../../hooks/useGetNearestPorts';

import LeftPanel from './LeftPanel';
import RightPanel from './RightPanel';
import styles from './styles.module.css';

const Maps = dynamic(() => import('./Map'), {
	ssr: false,
});

function PointLocation() {
	const [locationData, setLocationData] = useState(null);
	const [activeTab, setActiveTab] = useState('');
	const [hoveredPort, setHoveredPort] = useState(null);
	const [page, setPage] = useState(1);
	const [portsData, setPortsData] = useState([]);
	const { total_count } = useGetNearestPorts({ id: locationData?.id, page, setPortsData });
	const [showMenu, setShowMenu] = useState(false);
	const [bounds, setBounds] = useState(null);

	useEffect(() => {
		if (locationData?.id) {
			setPage(1);
			setPortsData([]);
		}
	}, [locationData?.id]);

	return (
		<div className={styles.container}>
			<div
				className={`${styles.map_container} ${activeTab ? styles.minimap_container : ''}`}
			>
				<Maps
					locationData={locationData}
					activeTab={activeTab}
					hoveredPort={hoveredPort}
					nearestPorts={portsData}
					bounds={bounds}
				/>
			</div>
			<LeftPanel
				activeTab={activeTab}
				setActiveTab={setActiveTab}
				portsData={portsData}
				setHoveredPort={setHoveredPort}
				showMenu={showMenu}
				setShowMenu={setShowMenu}
				setPage={setPage}
				page={page}
				total_count={total_count}
				setBounds={setBounds}
				locationData={locationData}
				setLocationData={setLocationData}
			/>
			{activeTab && (
				<>
					<RightPanel
						showMenu={showMenu}
						activeTab={activeTab}
						locationData={locationData}
					/>
					<IcMExpand
						className={styles.close_icon}
						onClick={(e) => {
							e.stopPropagation();
							setActiveTab('');
						}}
					/>
				</>

			)}
		</div>
	);
}

export default PointLocation;
