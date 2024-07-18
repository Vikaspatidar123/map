import { Avatar } from '@cogoport/components';
import { IcMProfile } from '@cogoport/icons-react';
import React from 'react';
import { useSelector } from 'react-redux';

import ProfileMenu from '../../ProfileMenu';

import styles from './styles.module.css';

function ProfileSection({ onLinkClick, setShowLogin }) {
	const { user, isLogged } = useSelector(({ profile }) => profile);

	return (
		<section className={styles.profile_div}>
			{(isLogged)
				? (
					<Avatar
						size="40px"
						src={user?.picture}
						personName={user?.name}
					/>
				)

				: <IcMProfile />}

			{(isLogged) ? (
				<div>
					<h4>{user?.name}</h4>
					<ProfileMenu />
				</div>
			) : (
				<button
					onClick={() => {
						onLinkClick();
						setShowLogin(true);
					}}
					className={styles.login_text}
				>
					Login
				</button>
			)}
		</section>
	);
}

export default ProfileSection;
