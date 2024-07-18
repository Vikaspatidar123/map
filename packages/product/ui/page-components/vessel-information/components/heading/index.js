import { Button } from '@cogoport/components';
import React from 'react';

import styles from './styles.module.css';

function Heading({ setShowModal = () => {}, isAdmin = false }) {
	return (
		<div className={styles.main_container}>
			<div className={styles.heading_left_container}>Vessel Information</div>
			{
				isAdmin && (
					<div className={styles.heading_right_container}>
						<Button onClick={() => setShowModal('add_vessel')}>Create New Vessel</Button>
					</div>
				)
			}
		</div>
	);
}

export default Heading;
