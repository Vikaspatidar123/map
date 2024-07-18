import dynamic from 'next/dynamic';
import React from 'react';

import styles from './styles.module.css';

const Map = dynamic(() => import('./Maps'), {
	ssr: false,
});

function RateView() {
	return <div className={styles.container}><Map /></div>;
}

export default RateView;
