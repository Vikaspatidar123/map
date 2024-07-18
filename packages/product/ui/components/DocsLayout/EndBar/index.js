import React from 'react';

import styles from './styles.module.css';

function Endbar({
	className,
	style,
	nav = [],
}) {
	return (
		<div style={style} className={`${styles.container} ${className}`}>
			<div className={styles.inner_container}>
				<p className={styles.title}>Table of contents</p>
				<ul className={styles.nav_list}>
					{nav.map((item) => (
						<li key={item.label} className={styles.nav_item}>
							<a href={item.href}>{item.label}</a>
						</li>
					))}
				</ul>
			</div>
		</div>
	);
}

export default Endbar;
