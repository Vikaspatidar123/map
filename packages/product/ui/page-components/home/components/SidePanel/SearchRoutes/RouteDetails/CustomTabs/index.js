import { isEmpty } from '@cogoport/utils';
import React, { useContext, useEffect } from 'react';

import styles from './styles.module.css';

import { iconMappings } from '@/commons/configuration/color-options';
import { WaypointsContext } from '@/ui/page-components/home/common/context/WaypointsProvider';

function CustomTabs({
	activeTab, routes, tabOptions, tabType,
}) {
	const { setActiveTab, setActiveRoute } = useContext(WaypointsContext);

	const isEnabled = (val) => routes
		.some(({ main_service = '' }) => (val === 'all' ? main_service : main_service === val))
		|| tabType === 'saved_routes';

	const handleClick = (val) => {
		if (val !== activeTab) {
			setActiveTab(val);
			setActiveRoute(null);
		}
	};

	useEffect(() => {
		if (!isEmpty(routes) && !isEnabled(activeTab)) {
			setActiveTab('all');
		}
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [activeTab, JSON.stringify(routes)]);

	return (
		<div className={styles.tabs}>
			{tabOptions.map(({ label, value, icon }) => (
				<button
					key={value}
					className={[styles.tab, value === activeTab ? styles.active_tab : ''].join(' ')}
					onClick={() => handleClick(value)}
					disabled={!isEnabled(value)}
				>
					<div className={styles.icon}>{icon || iconMappings[value]}</div>
					<div className={styles.label}>{label}</div>
				</button>
			))}
		</div>
	);
}

export default CustomTabs;
