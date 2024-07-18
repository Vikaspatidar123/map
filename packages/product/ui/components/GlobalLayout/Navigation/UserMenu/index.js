import { Loader, Avatar, Popover } from '@cogoport/components';
import { IcMArrowDown, IcMProfile } from '@cogoport/icons-react';
import React, { useState } from 'react';
import { useSelector } from 'react-redux';

import ProfileMenu from '../ProfileMenu';
import styles from '../styles.module.css';

function UserMenu({ showLogin, setShowLogin }) {
	const [showMenu, setShowMenu] = useState(false);
	const { user, isLogged, preparingProfile } = useSelector(({ profile }) => profile);
	if (typeof preparingProfile === 'undefined' || preparingProfile) {
		return <Loader />;
	}

	return (
		<div>
			{isLogged
				? (
					<Popover
						visible={showMenu}
						caret={false}
						render={<ProfileMenu />}
						placement="bottom-end"
						className={styles.popup_container}
					>
						<button
							className={`${styles.login} ${showMenu ? styles.active_login : ''}`}
							onClick={() => { setShowMenu((s) => !s); }}
						>
							<Avatar
								size="26px"
								src={user?.picture}
								personName={user?.name}
							/>
							<span className={styles.user_name}>{user?.name}</span>
							<IcMArrowDown className={styles.icon} />
						</button>
					</Popover>
				)

				: (
					<button
						className={`${styles.login} ${showLogin ? styles.active_login : ''}`}
						onClick={() => setShowLogin(true)}
					>
						<IcMProfile />
						Login/Signup
						<IcMArrowDown className={styles.icon} />
					</button>
				)}
		</div>
	);
}

export default UserMenu;
