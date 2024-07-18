import React from 'react';
import { Controller } from 'react-hook-form';

import FileUploader from '../Business/FileUploader';

function UploadController(props) {
	const {
		name, control, rules, value, ...rest
	} = props;

	return (
		<Controller
			key={name}
			control={control}
			name={name}
			rules={rules}
			defaultValue={value}
			render={({ field: { onChange, onBlur, value: newValue } }) => (
				<FileUploader
					{...rest}
					key={name}
					id={name}
					onChange={onChange}
					value={newValue}
					defaultValues={newValue}
					onBlur={onBlur}
					data-test-value={value}
				/>
			)}
		/>
	);
}
export default UploadController;
