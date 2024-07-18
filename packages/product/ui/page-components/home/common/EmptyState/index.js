import React from 'react';

import styles from './styles.module.css';

function EmptyState({
	style, header, description, children,
}) {
	return (
		<div className={styles.container} style={style}>
			<p className={styles.header}>
				{header}
			</p>
			<p className={styles.description}>{description}</p>
			{children}
		</div>
	);
}

export default EmptyState;
