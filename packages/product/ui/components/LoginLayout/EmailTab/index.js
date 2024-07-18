import { Button } from '@cogoport/components';
import { IcMEyeopen, IcMEyeclose } from '@cogoport/icons-react';
import React, { useState } from 'react';

import FormElement from '../../FormElement';
import useAuthentication from '../hooks/useAuthentication';

import styles from './styles.module.css';

import patterns from '@/commons/constants/patterns';

const controls = [
	{
		type        : 'email',
		label       : 'Email',
		name        : 'email',
		placeholder : 'Email here...',
		rules       : {
			required : 'Email is required',
			pattern  : {
				value   : patterns.emailValidator,
				message : 'Email is not valid',
			},
		},
	},
	{
		type        : 'password',
		label       : 'Password',
		name        : 'password',
		placeholder : 'Password here...',
		rules       : { required: 'Password is required' },
	},
];

function EmailTab({ activeUserType }) {
	const [showPassword, setShowPassword] = useState(false);
	const {
		handleSubmit,
		onSubmit,
		control,
		errors,
		authLoading,
	} = useAuthentication({ activeUserType });

	const toggleVisibility = () => {
		setShowPassword((s) => !s);
	};

	const Suffix = showPassword
		? <IcMEyeclose className={styles.icon_open} onClick={toggleVisibility} />
		: <IcMEyeopen className={styles.icon_close} onClick={toggleVisibility} />;

	const passwordType = showPassword ? 'text' : 'password';

	return (
		<div className={styles.container}>
			<div className={styles.sub_container}>
				{controls.map((ctr) => (
					<FormElement
						key={ctr.name}
						control={control}
						errors={errors}
						{...ctr}
						suffix={ctr.name === 'password' ? Suffix : ''}
						type={ctr.name === 'password' ? passwordType : ctr.type}
					/>
				))}
			</div>

			<Button
				themeType="accent"
				size="lg"
				style={{ width: '100%' }}
				onClick={handleSubmit(onSubmit)}
			>
				{authLoading ? 'Submitting' : 'Submit'}
			</Button>
		</div>
	);
}

export default EmailTab;
