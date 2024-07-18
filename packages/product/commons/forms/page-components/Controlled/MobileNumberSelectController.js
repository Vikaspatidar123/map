import { Controller } from 'react-hook-form';

import MobileNumberSelect from '../Business/MobileNumberSelect';

function MobileNumberSelectController({
	itemKey,
	name,
	value,
	control,
	...rest
}) {
	return (
		<Controller
			key={itemKey}
			control={control}
			name={name}
			defaultValue={value}
			rules={rest.rules}
			shouldUnregister={rest.shouldUnregister}
			render={({ field: { onChange, onBlur, value: newValue } }) => (
				<MobileNumberSelect
					{...rest}
					key={itemKey}
					onChange={onChange}
					value={newValue}
					onBlur={onBlur}
				/>
			)}
		/>
	);
}
export default MobileNumberSelectController;
