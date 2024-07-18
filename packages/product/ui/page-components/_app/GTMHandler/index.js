import { useEffect } from 'react';
import CookieConsent, {
	getCookieConsentValue,
	Cookies,
} from 'react-cookie-consent';

import { initGTM } from '@/ui/helpers/gtm-utils';

function GTMHandler() {
	const handleAcceptCookie = () => {
		if (process.env.NEXT_PUBLIC_GTAG) {
			initGTM(process.env.NEXT_PUBLIC_GTAG);
		}
	};

	const handleDeclineCookie = () => {
		Cookies.remove('_ga');
		Cookies.remove('_gat');
		Cookies.remove('_gid');
	};

	useEffect(() => {
		const isConsent = getCookieConsentValue();
		if (isConsent === 'true') {
			handleAcceptCookie();
		}
	}, []);

	const container = {
		background : '#fff',
		boxShadow  : '0 1px 6px rgb(169 188 218 / 65%)',
		display    : 'flex',
		alignItems : 'center',
		color      : '#000',
		zIndex     : 9999,
	};

	return (
		<CookieConsent
			style={container}
			enableDeclineButton
			location="bottom"
			buttonStyle={{
				padding      : '8px 32px',
				borderRadius : 64,
				background   : '#fdebe9',
			}}
			declineButtonStyle={{
				padding      : '8px 32px',
				borderRadius : 64,
				background   : '#d51d10',
				color        : '#fff',
			}}
			buttonText="Accept"
			declineButtonText="Reject"
			onAccept={handleAcceptCookie}
			onDecline={handleDeclineCookie}
		>
			<>
				<h4>Notice</h4>
				<h4 style={{ fontWeight: '400' }}>
					We have selected third parties to use cookies or similar technologies for technical purposes and,
					with your consent, for other purposes as specified in the cookie policy.
					<br />
					Denying consent may make related features unavailable.
				</h4>
				<h4 style={{ fontWeight: '400' }}>
					Use the “Accept” button to consent to the use of such technologies.
					Use the “Reject” button to continue without accepting.
				</h4>

			</>

		</CookieConsent>
	);
}

export default GTMHandler;
