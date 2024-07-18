import { Tabs, TabPanel } from '@cogoport/components';
import { IcMCross } from '@cogoport/icons-react';
import { useState } from 'react';

import EmailTab from './EmailTab';
import MobileTab from './MobileTab';
import styles from './styles.module.css';

function LoginLayout({
	signupUrl, mobileLoginAllowed, onClose, activeUserType,
}) {
	const [activeTab, setActiveTab] = useState('email');
	return (
		<div className={styles.container}>
			<IcMCross className={styles.cross_icon} onClick={onClose} />
			<div className={styles.content}>
				<div style={{ marginBottom: '8px' }}>
					<h1>Hello there!</h1>
					<p className={styles.sub_heading}>Please use your credentials to login.</p>
				</div>
				<Tabs
					activeTab={activeTab}
					themeType="secondary"
					onChange={setActiveTab}
					className={styles.tab_container}
				>
					{mobileLoginAllowed ? (
						<TabPanel name="mobile" title="Mobile">
							<MobileTab />
						</TabPanel>
					) : null}

					<TabPanel name="email" title="Email">
						<EmailTab activeUserType={activeUserType} />
					</TabPanel>
				</Tabs>

				{mobileLoginAllowed && (
					<p className={styles.sign_up_text}>
						Not registered yet?
						{' '}
						<a
							href={signupUrl}
							target="_blank"
							rel="noreferrer"
						>
							Sign up
						</a>
					</p>
				)}
			</div>
		</div>
	);
}

export default LoginLayout;
