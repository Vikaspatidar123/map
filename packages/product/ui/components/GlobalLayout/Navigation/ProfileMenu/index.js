import { IcMLogout } from '@cogoport/icons-react';
import { deleteCookie } from '@cogoport/utils';
import React from 'react';

import styles from './styles.module.css';

function ProfileMenu() {
	const handleClick = (e) => {
		e.preventDefault();

		deleteCookie(process.env.NEXT_PUBLIC_COGO_MAPS_AUTH_KEY);
		window.location.reload();
	};
	return (
		<button className={styles.logout} onClick={handleClick}>
			<IcMLogout />
			logout
		</button>
	);
}

export default ProfileMenu;
