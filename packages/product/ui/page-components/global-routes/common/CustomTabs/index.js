import React from 'react';

import styles from './styles.module.css';

import { iconMappings } from '@/commons/configuration/color-options';

function CustomTabs({ handleTabChange, tabOptions, activeTab = [] }) {
	return (
		<div className={styles.tabs}>
			{tabOptions.map(({ value, props = {}, icon }) => (
				<button
					key={value}
					className={[styles.tab, activeTab === value ? styles.active_tab : ''].join(' ')}
					onClick={() => handleTabChange(value)}
					{...props}
				>
					<div className={styles.icon}>
						{icon || iconMappings[value]}
					</div>
				</button>
			))}
		</div>
	);
}

export default CustomTabs;
