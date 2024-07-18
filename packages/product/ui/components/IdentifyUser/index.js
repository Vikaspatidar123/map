import { Modal, Button } from '@cogoport/components';
import { useState } from 'react';

import LoginLayout from '../LoginLayout';

import styles from './styles.module.css';

import users_mapping from '@/commons/configuration/users_mapping';

function IdentifyUser({ show, onClose = () => {}, utm_medium }) {
	const [activeUserType, setActiveUserType] = useState(users_mapping[0]);
	const [showLoginPortal, setShowLoginPortal] = useState(false);

	return (
		<>
			<Modal
				size="md"
				show={show}
				onClose={onClose}
				placement="center"
				className={styles.modal_container}
			>
				<Modal.Header title="Help us know you better ..." />
				<p className={styles.header_description}>
					What do you intend to accomplish with Cogoport?  This will help us serve you better.
				</p>
				<Modal.Body>
					{users_mapping.map((user) => (
						<button
							key={user.label}
							className={`${styles.pill} 
							${user.label === activeUserType.label ? styles.active_btn : ''}`}
							onClick={() => setActiveUserType(user)}
						>
							{user.icon}
							<div>
								<p className={styles.main_title}>{user.label}</p>
								<p className={styles.description}>{user.description}</p>
							</div>
						</button>
					))}

				</Modal.Body>

				<Modal.Footer>
					{activeUserType?.redirect_url ? (
						<a
							href={`${activeUserType.redirect_url}&utm_medium=${utm_medium}`}
							target="_blank"
							rel="noreferrer"
						>
							<Button themeType="secondary">Sign up</Button>
						</a>
					) : null}
					<Button
						themeType="accent"
						onClick={() => setShowLoginPortal(true)}
					>
						Login
					</Button>

				</Modal.Footer>
			</Modal>
			{showLoginPortal ? (
				<Modal
					show={showLoginPortal}
					placement="center"
					className={styles.modal_container}
				>
					<LoginLayout
						mobileLoginAllowed={activeUserType?.mobile_login_allowed}
						signupUrl={`${activeUserType.redirect_url}&utm_medium=${utm_medium}`}
						onClose={() => setShowLoginPortal(false)}
						activeUserType={activeUserType}
					/>
				</Modal>
			) : null}
		</>
	);
}

export default IdentifyUser;
