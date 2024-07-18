import React, { useEffect, useRef } from 'react';

import OtpInput from './components/OtpInput';
import useTimer from './hooks/useTimer';
import styles from './styles.module.css';

function OTPInput({
	otpLength,
	setOtpValue = () => {},
	loading = false,
	sendOtp = () => {},
	resendOtpTimerDuration = 30,
	placeholder = ' ',
	timerExpiryCallback = () => {},
}) {
	const useImperativeHandleRef = useRef({});

	const timer = useTimer({ durationInSeconds: resendOtpTimerDuration });

	useEffect(
		() => timer.start(),
		// eslint-disable-next-line react-hooks/exhaustive-deps
		[],
	);

	useEffect(() => {
		timerExpiryCallback(timer.isTimeRemaining);
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [timer.isTimeRemaining]);

	const handleChange = (value) => {
		setOtpValue(value.length === otpLength ? `${value}` : '');
	};

	let abc = 'green_text';
	const timerClass = () => {
		if (timer.seconds <= 10) {
			abc = 'red_text';
			return abc;
		}
		if (timer.seconds <= 20) {
			abc = 'yellow_text';
			return abc;
		}
		return abc;
	};
	const color_text = timerClass();

	return (
		<div className={styles.container}>
			<OtpInput
				otpLength={otpLength}
				inputSize={otpLength > 4 ? 'md' : 'lg'}
				onChange={(value) => handleChange(value)}
				ref={useImperativeHandleRef}
				placeholder={placeholder}

			/>

			<div className={styles.resend_otp_container}>

				{timer.seconds >= 1
					? (
						<div className={styles.timer_text}>
							<div className={`${styles[color_text]}`}>
								{timer.minutes}
								:
								{timer.seconds}
							</div>

						</div>
					)

					: (
						<div
							role="presentation"
							className={styles.resend_text}
							onClick={() => {
								sendOtp({ timer });

								useImperativeHandleRef.current?.resetOtp();
							}}
							disabled={timer.isTimeRemaining || loading}
						>
							Resend OTP?
						</div>
					)}

			</div>
		</div>
	);
}

export default OTPInput;
