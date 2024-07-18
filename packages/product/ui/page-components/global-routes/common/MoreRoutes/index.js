import { IcMArrowUp, IcMArrowDown } from '@cogoport/icons-react';

import styles from './styles.module.css';

function MoreRoutes({ service_type }) {
	return (
		<div className={styles.container}>
			<IcMArrowUp className={`${styles.up} ${styles[service_type]}`} />
			<IcMArrowDown className={`${styles.down} ${styles[service_type]}`} />
		</div>
	);
}

export default MoreRoutes;
