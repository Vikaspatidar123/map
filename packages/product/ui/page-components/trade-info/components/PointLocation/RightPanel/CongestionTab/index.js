import React from 'react';

import styles from './styles.module.css';

import ComingSoon from '@/public/images/ic-comming-soon.svg';

function CongestionTab() {
	return (
		<h3 className={styles.container}><ComingSoon /></h3>
	);
}

export default CongestionTab;
