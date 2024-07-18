import { Loader } from '@cogoport/components';
import React from 'react';

import styles from './styles.module.css';

function LoadingState() {
	return (
		<div className={styles.container}>
			<Loader style={{ width: '48px', height: '48px' }} />
			getting your Routes
		</div>
	);
}

export default LoadingState;
