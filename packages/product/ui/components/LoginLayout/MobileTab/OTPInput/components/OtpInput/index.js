import { Input } from '@cogoport/components';
import React, { memo, forwardRef } from 'react';

import useOtpInput from './hooks/useOtpInput';
import styles from './styles.module.css';

function OtpInput(props, ref) {
	const {
		otpLength, inputSize = 'md', onChange = () => {}, placeholder,
	} = props;

	const {
		values = {},
		otpContainerRef = null,
		otpInputElementsRef = null,
		handleChange = () => {},
	} = useOtpInput({
		otpLength,
		onChange,
		ref,
	});

	const appliedPlaceholder = placeholder || ' ';

	return (
		<div className={styles.container} ref={otpContainerRef}>
			{Object.keys(values).map((key, index) => (
				<Input
					type="number"
					key={key}
					size={inputSize}
					value={values[key]}
					onChange={handleChange(index)}
					placeholder={appliedPlaceholder}
					ref={(element) => {
						otpInputElementsRef.current[index] = element;
					}}
					className={styles.input_item}
				/>
			))}
		</div>
	);
}

export default memo(forwardRef(OtpInput));
