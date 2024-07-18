import { Button, Loader } from '@cogoport/components';
import { IcMArrowBack } from '@cogoport/icons-react';
import React, { useState } from 'react';

import FormElement from '../../FormElement';
import useAuthentication from '../hooks/useAuthentication';
import useSendMobileOtp from '../hooks/useSendMobileOtp';
import { label_text } from '../styles.module.css';

import OTPInput from './OTPInput';
import styles from './styles.module.css';

const mobileSelectProps = {
	name        : 'mobile_number',
	label       : 'Mobile Number',
	type        : 'mobile-number-select',
	inputType   : 'number',
	placeholder : 'Mobile Number*',
	codeKey     : 'country_code',
	numberKey   : 'mobile_number',
	rules       : {
		required : 'Mobile number is required',
		validate : ({ mobile_number, country_code }) => ((mobile_number && country_code)
			? undefined
			: 'Mobile number is required'),
	},
};

function MobileTab() {
	// const [mobileVal, setMobileVal] = useState({ country_code: '+91', mobile_number: '' });
	const [otpValue, setOtpValue] = useState('');
	const {
		handleSubmit, control, sendOtp, loading, getValues, errors,
	} = useSendMobileOtp();

	const { authLoading } = useAuthentication({});

	const [timeExpired, setTimeExpired] = useState(false);
	const [isCodeSent, setIsCodeSent] = useState(false);

	const mobileVal = getValues('mobile_number');

	const handleClick = () => {
		if (!isCodeSent) {
			sendOtp();
		} else {
			//
		}
		setIsCodeSent(true);
	};

	return (
		<div className={styles.container}>
			{isCodeSent && <IcMArrowBack className={styles.back_icon} onClick={() => setIsCodeSent(false)} />}

			{isCodeSent && !loading
				&& (
					<div>
						<p className={`${label_text} ${styles.otp_label}`}>
							Verification code is sent to
							{' '}
							{`${mobileVal.country_code} ${mobileVal.mobile_number}` }
						</p>
						<OTPInput
							otpLength={6}
							setOtpValue={setOtpValue}
							sendOtp={sendOtp}
							timerExpiryCallback={(a) => setTimeExpired(!a)}
						/>
					</div>
				)}

			{loading
				&& (
					<div className={styles.loader_container}>
						<Loader style={{ scale: '1.5' }} />
					</div>
				)}

			{!isCodeSent && !loading ? (
				<FormElement
					errors={errors}
					control={control}
					{...mobileSelectProps}
				/>
			) : null}

			<Button
				themeType="accent"
				size="lg"
				style={{ width: '100%' }}
				onClick={handleSubmit(handleClick)}
				disabled={isCodeSent && (!otpValue || timeExpired)}
			>
				{!loading && isCodeSent ? 'Submit' : 'Request OTP'}
				{authLoading && <Loader className={styles.loader_submit} />}
			</Button>
		</div>
	);
}

export default MobileTab;
