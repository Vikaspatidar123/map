import { startCase } from '@cogoport/utils';
import React from 'react';

import CongestionTab from './CongestionTab';
import InfoTab from './InfoTab';
import ServiceTab from './ServiceTab';
import styles from './styles.module.css';

import location_type_mapping from '@/commons/configuration/location_type_mapping';

const tab_mapping = {
	general         : InfoTab,
	services        : ServiceTab,
	live_congestion : CongestionTab,
};

function RightPanel({ showMenu = false, activeTab, locationData }) {
	const TabElement = tab_mapping[activeTab];

	return (
		<div className={`${styles.container} ${!showMenu ? styles.full_view : ''}`}>
			<div className={styles.header}>
				<h1>{ locationData?.display_name}</h1>
				<p>
					{location_type_mapping[locationData?.type]?.icon}
					{startCase(locationData?.type)}
				</p>
			</div>
			<TabElement locationData={locationData} />
		</div>
	);
}

export default RightPanel;
