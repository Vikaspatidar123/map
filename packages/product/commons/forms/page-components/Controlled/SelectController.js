import { Select } from '@cogoport/components';
import React from 'react';
import { Controller } from 'react-hook-form';

function SelectController(props) {
	const {
		name, control, rules, value, ...rest
	} = props;

	return (
		<Controller
			key={name}
			control={control}
			name={name}
			defaultValue={value}
			rules={rules}
			render={({ field: { onChange, onBlur, value : newValue } }) => (
				<Select
					{...rest}
					key={name}
					id={name}
					onChange={onChange}
					value={newValue}
					onBlur={onBlur}
					data-test-value={value}
				/>
			)}
		/>
	);
}
export default SelectController;
