import { Loader } from '@cogoport/components';
import React from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';

import PortInfo from './PortInfo';
import styles from './styles.module.css';

let L;

if (typeof window !== 'undefined') {
	// eslint-disable-next-line global-require
	({ L } = require('@cogoport/maps'));
}

function NearestList({
	portsData = [], setHoveredPort = () => {}, handleNext = () => {}, total_count,
	setBounds = () => {}, height = 500,
}) {
	const handleClick = (pos) => {
		const bounds = L.latLngBounds([pos]);
		setBounds(bounds);
	};

	return (
		<div
			className={styles.container}
			onMouseLeave={() => setHoveredPort(null)}
		>
			<h1>Nearby Ports</h1>

			<InfiniteScroll
				dataLength={portsData.length}
				next={handleNext}
				hasMore={total_count > portsData.length}
				loader={(
					<div className={styles.loading}>
						<Loader className={styles.loader} />
					</div>
				)}
				endMessage={(<h4 className={styles.loading}>Nothing more to show!!</h4>)}
				height={height}
			>
				{portsData.map((loc) => (
					<PortInfo
						data={loc}
						onMouseEnter={setHoveredPort}
						setBounds={setBounds}
						handleClick={handleClick}
					/>
				))}
			</InfiniteScroll>
		</div>
	);
}

export default NearestList;
