import { isEmpty } from '@cogoport/utils';
import { useRef, useState } from 'react';

import EndBar from './EndBar';
import StartBar from './StartBar';
import styles from './styles.module.css';

import useMobileStatus from '@/commons/hooks/useMobileStatus';
import useSwipeHorizontal from '@/commons/hooks/useSwipeHorizontal';

function DocsLayout({
	children = null,
	startbar = {},
	endbar = {},
}) {
	const [showMobileStartbar, setShowMobileStartbar] = useState(false);
	const ref = useRef();

	const { isMobile } = useMobileStatus(768);
	const { swipedLeft, swipedRight } = useSwipeHorizontal(ref);

	if (swipedLeft && showMobileStartbar) {
		setShowMobileStartbar(false);
	}
	if (swipedRight && !showMobileStartbar) {
		setShowMobileStartbar(true);
	}

	return (
		<div
			className={`
				${styles.container}
				${styles.has_startbar}
				${styles.has_endbar}
			`}
			ref={ref}
		>
			<div className={styles.inner_container}>
				<main className={styles.children_container}>
					{children}
				</main>

				{!isEmpty(endbar.nav)
					&& (
						<EndBar
							className={startbar.className}
							style={endbar.style}
							nav={endbar.nav}
						/>
					)}

			</div>

			<StartBar
				className={startbar.className}
				style={startbar.style}
				nav={startbar.nav}
				mobileShow={showMobileStartbar}
				onClickLink={() => setShowMobileStartbar(false)}
				isMobile={isMobile}
			/>

		</div>

	);
}

export default DocsLayout;
