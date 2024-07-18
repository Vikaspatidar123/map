/* eslint-disable no-undef */
/* eslint-disable react-hooks/exhaustive-deps */
import { Toast } from '@cogoport/components';
import { useRef, useEffect, useCallback } from 'react';

const useOtpInputEvents = ({
	otpLength = 0,
	setOtp = () => {},
	otpContainerRef = null,
	otpInputElementsRef = [],
}) => {
	const isCtrlDown = useRef(false);

	// eslint-disable-next-line react-hooks/exhaustive-deps
	const validateInputKeydownEvent = useCallback((event) => {
		if (Number.isInteger(+event.key)) {
			return;
		}

		if (event.key === 'Backspace') {
			if (event.target.value) {
				return;
			}

			const currentFocusedOtpInputElementIndex =	otpInputElementsRef.current.indexOf(event.target);

			const nextOtpInputElementToFocus =	otpInputElementsRef.current[currentFocusedOtpInputElementIndex - 1];
			nextOtpInputElementToFocus?.focus();

			return;
		}

		if (event.key === 'Tab') {
			return;
		}

		if (['Control', 'Meta'].includes(event.key)) {
			isCtrlDown.current = true;
		}

		if (isCtrlDown.current && event.key === 'v') {
			isCtrlDown.current = false;

			return;
		}

		event.preventDefault();
	});

	const validateInputPasteEvent = useCallback((event) => {
		event.preventDefault();

		try {
			let content = '';

			if (event.clipboardData) {
				content = event.clipboardData.getData('text/plain');
			} else if (window.clipboardData) {
				content = window.clipboardData.getData('Text');
			}

			content = content.replace(/[^0-9]/g, '').substring(0, otpLength);

			const currentFocusedOtpInputElementIndex = otpInputElementsRef.current.indexOf(event.target);

			setOtp((previousState) => {
				const newStateValues = {};

				for (let i = 0; i < otpLength; i += 1) {
					if (i >= currentFocusedOtpInputElementIndex) {
						newStateValues[`otp-${i + 1}`] = content[i - currentFocusedOtpInputElementIndex] || '';
					}
				}

				return {
					...previousState,
					...newStateValues,
				};
			});
		} catch (error) {
			Toast.info('Copy-Paste not working', { hideAfter: 1 });
		}
	});

	const validateInputs = useCallback((event) => {
		if (event.type === 'keydown') {
			validateInputKeydownEvent(event);
		}

		if (event.type === 'paste') {
			validateInputPasteEvent(event);
		}
	}, []);

	useEffect(() => {
		const events = ['keydown', 'paste'];
		events.forEach((eventType) => {
			otpContainerRef.current?.addEventListener(eventType, validateInputs);
		});

		return () => {
			events.forEach((eventType) => {
				otpContainerRef.current?.removeEventListener(eventType, validateInputs);
			});
		};
	}, []);
};

export default useOtpInputEvents;
