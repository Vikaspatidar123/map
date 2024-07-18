import {
	useState, useEffect, useImperativeHandle, useRef,
} from 'react';

import useKey from './useKey';
import useOtpInputEvents from './useOtpInputEvents';

const getInitialOtpValues = (otpLength = 6) => {
	const hash = {};

	for (let i = 0; i < otpLength; i += 1) {
		hash[`otp-${i + 1}`] = '';
	}

	return hash;
};

const useOtpInput = ({ otpLength = 4, onChange = () => {}, ref = null }) => {
	const [values, setValues] = useState(getInitialOtpValues(otpLength));

	const isBackSpacePressed = useKey('Backspace');

	const otpContainerRef = useRef(null);
	const otpInputElementsRef = useRef([]);

	useOtpInputEvents({
		otpLength,
		setOtp: setValues,
		otpContainerRef,
		otpInputElementsRef,
	});

	useEffect(() => {
		let isAllOtpInputValuePresent = true;
		let value = '';

		for (let i = 0; i < otpLength; i += 1) {
			if (!values[`otp-${i + 1}`]) {
				isAllOtpInputValuePresent = false;
				break;
			}

			value += values[`otp-${i + 1}`];
		}

		onChange(isAllOtpInputValuePresent ? value : '');
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [JSON.stringify(values)]);

	useEffect(() => {
		otpInputElementsRef.current.forEach((element) => {
			element.setAttribute('maxlength', 1);
			element.setAttribute('inputmode', 'numeric');
		});
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [JSON.stringify(values)]);

	const handleChange = (index) => (event) => {
		setValues((previousState) => ({
			...previousState,
			[`otp-${index + 1}`]: event,
		}));

		if (isBackSpacePressed) {
			return;
		}

		const nextOtpInputElement = otpInputElementsRef.current[index + 1];
		nextOtpInputElement?.focus();
	};

	const resetOtp = () => {
		setValues(getInitialOtpValues(otpLength));
	};

	const imperativeHandles = () => ({
		resetOtp,
	});

	useImperativeHandle(
		ref,
		imperativeHandles,
		// eslint-disable-next-line react-hooks/exhaustive-deps
		[],
	);

	return {
		values,
		otpContainerRef,
		otpInputElementsRef,
		handleChange,
		resetOtp,
	};
};

export default useOtpInput;
