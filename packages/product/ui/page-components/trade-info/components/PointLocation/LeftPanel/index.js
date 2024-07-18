import { IcMArrowLeft } from '@cogoport/icons-react';
import { useRouter } from 'next/router';
import React, { useEffect, useRef } from 'react';

import SearchSelect from '../../../common/SearchSelect';

import CustomTabs from './CustomTabs';
import NearestList from './NearestList';
import styles from './styles.module.css';

import useScrollDirection from '@/commons/hooks/useScrollDirection';

function LeftPanel({
	activeTab, setActiveTab, portsData, setHoveredPort, showMenu, setShowMenu,
	setPage, page, total_count, setBounds, locationData, setLocationData,
}) {
	const router = useRouter();
	const { location_id, target } = router.query;
	const ref = useRef(null);

	const direction = useScrollDirection(ref);

	const handleNext = () => {
		setPage(page + 1);
	};

	useEffect(() => {
		setShowMenu(!!location_id);
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [location_id]);

	useEffect(() => {
		setActiveTab(target);
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [target]);

	return (
		<>
			<SearchSelect
				locationData={locationData}
				setLocationData={setLocationData}
				params={{ includes: { geometry: true } }}
				hideSelect={!showMenu || direction === 'down'}
				hideDirection={direction === 'down' ? 'up' : 'left'}
			/>
			<div ref={ref} className={`${styles.container} ${showMenu ? styles.visible : ''}`}>
				<div className={styles.bg} />
				<CustomTabs
					activeTab={activeTab}
					setActiveTab={setActiveTab}
					location_type={locationData?.type}
					setShowMenu={setShowMenu}
				/>
				{!activeTab && (
					<NearestList
						page={page}
						setPage={setPage}
						portsData={portsData}
						total_count={total_count}
						setBounds={setBounds}
						setHoveredPort={setHoveredPort}
						handleNext={handleNext}
					/>
				)}
			</div>
			<button
				onClick={() => setShowMenu((s) => !s)}
				className={`${styles.toggle_icon} ${!showMenu ? styles.rotate_toggle : ''}`}
			>
				<IcMArrowLeft />
			</button>

		</>
	);
}

export default LeftPanel;
