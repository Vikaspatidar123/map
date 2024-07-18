import React from 'react';
import { Controller } from 'react-hook-form';

import AsyncSelect from '@/ui/components/AsyncSelect';

function AsyncSelectController(props) {
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
				<AsyncSelect
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
export default AsyncSelectController;
