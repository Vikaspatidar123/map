import React from 'react';

import { TABS } from '../../../../configuration/tabs';

import styles from './styles.module.css';

import useMobileStatus from '@/commons/hooks/useMobileStatus';

function CustomTabs({
	activeTab, setActiveTab, location_type, setShowMenu,
}) {
	const { isMobile } = useMobileStatus(480);

	const activeTabIndex = TABS.findIndex((tab) => tab.value === activeTab);
	const filteredTabs = TABS.filter((tab) => !(location_type !== 'seaport' && tab.value === 'live_congestion'));

	const handleChange = (value) => {
		setActiveTab(value);

		if (isMobile) {
			setShowMenu(false);
		}
	};

	return (
		<>
			<div className={styles.container}>
				{filteredTabs.map(({ label, value, icon }) => (
					<button
						key={value}
						className={`${styles.tab} ${value === activeTab ? styles.active_tab : ''}`}
						onClick={() => handleChange(value)}
					>
						{icon}
						{label}
					</button>
				))}
				{activeTab && <div className={styles.border_left} style={{ top: `${activeTabIndex * 50}px` }} />}
			</div>
			<div className={styles.horizontal_line} />
		</>
	);
}

export default CustomTabs;
