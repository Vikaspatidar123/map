import { IcMArrowLeft } from '@cogoport/icons-react';
import dynamic from 'next/dynamic';
import { useState } from 'react';

import WaypointProvider from '../../common/context/WaypointsProvider';
import SidePanel from '../SidePanel';

import styles from './styles.module.css';

import useMobileStatus from '@/commons/hooks/useMobileStatus';

const Map = dynamic(() => import('../Map'), {
	ssr: false,
});

function RoutePlanner() {
	const [isFull, setIsFull] = useState(false);
	const [tab, setTab] = useState('search_routes');
	const { isMobile } = useMobileStatus(480);

	return (
		<WaypointProvider>
			<div className={styles.container}>
				<div
					className={[styles.side_panel,
						isFull ? styles.minimise : '', isMobile && !isFull ? styles.move_top : ''].join(' ')}
				>
					<SidePanel
						isMobile={isMobile}
						setIsFull={setIsFull}
						isFull={isFull}
						tab={tab}
						setTab={setTab}
					/>

					{!isMobile ? (
						<button
							className={`${styles.toggle_icon} ${isFull ? styles.rotate_toggle : ''}`}
							onClick={() => setIsFull(!isFull)}
							title="toggle this side panel"
						>
							<IcMArrowLeft />
						</button>
					) : null}
				</div>
				<div className={isFull ? styles.full_map : styles.half_map}>
					<Map
						isFull={isFull}
						isMobile={isMobile}
						tab={tab}
					/>
				</div>
			</div>
		</WaypointProvider>
	);
}

export default RoutePlanner;
