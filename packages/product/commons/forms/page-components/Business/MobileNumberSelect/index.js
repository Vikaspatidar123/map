import { Select, Input } from '@cogoport/components';

import styles from './styles.module.css';

import country_codes from '@/commons/constants/country-codes.json';

const options = country_codes.map(({ value, label }) => ({ value, label: `${value} (${label})` }));

function MobileNumberSelect({
	value, codeKey = 'country_code',
	numberKey = 'mobile_number', onChange, ...rest
}) {
	const { [codeKey]: country_code = '', [numberKey]: number = '' } =	value || {};

	const handleCodeChange = (v) => {
		onChange({ ...(value || {}), [codeKey]: v });
	};

	const handleNumberChange = (e) => {
		onChange({ ...(value || {}), [numberKey]: e });
	};
	return (
		<div className={styles.mobile_number_select}>
			<Select
				{...rest}
				value={country_code}
				options={options}
				style={{ width: '80px' }}
				onChange={handleCodeChange}
			/>
			<span className={styles.horizontal_line} />
			<Input
				type="number"
				value={number}
				placeholder="Enter mobile number"
				onChange={handleNumberChange}
			/>
		</div>
	);
}

export default MobileNumberSelect;
