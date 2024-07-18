import { Select } from '@cogoport/components';
import { IcMSearchlight } from '@cogoport/icons-react';
import { merge, isEmpty } from '@cogoport/utils';
import React from 'react';
import { useSelector } from 'react-redux';

import SearchLabel from '../SearchLabel';

import styles from './styles.module.css';

import useGetAsyncOptions from '@/commons//hooks/useGetAsyncOptions';
import { asyncFieldsLocations } from '@/commons//utils/getAsyncFields';

function LocationSelect({
	placeholder = 'Search a location', getSelectedOption = () => {}, params, animateLoading = false, value = '',
	onChange, source = 'cogo_maps', ...rest
}) {
	const { user } = useSelector(({ profile }) => profile);

	const getMofiFiedOptions = (options = []) => options.map((loc) => {
		const code = loc?.port_code || loc?.site_code || loc?.postal_code || loc?.country_code;
		const {
			latitude, longitude, display_name, type, name, region_id = 'id', history, trending,
		} = loc;
		return {
			...loc,
			value       : loc?.id,
			region_id,
			pos         : [latitude, longitude],
			display_pos : [latitude, longitude],
			label       : <SearchLabel {...{
				display_name: display_name || name, type, code, history, trending,
			}}
			/>,
		};
	});

	const defaultParams = asyncFieldsLocations();
	const asyncProps = useGetAsyncOptions({
		...defaultParams,
		params                : merge(params, defaultParams.params, { preferences: { user_id: user?.id || undefined } }),
		valueKey              : rest?.valueKey || defaultParams.valueKey,
		labelKey              : rest?.labelKey || defaultParams.labelKey,
		initialCall           : false,
		defaultOnChange       : onChange,
		modifiedOptions       : getMofiFiedOptions,
		createHistoryEndpoint : 'create_planet_search_history',
		source,
	});

	if (typeof getSelectedOption === 'function' && !isEmpty(value)) {
		const selectedOption = asyncProps.options.filter(
			(option) => option.id === value,
		);
		getSelectedOption(selectedOption[0]);
	}

	return (
		<div className={`${styles.wrapper} ${animateLoading && asyncProps.loading ? styles.active : ''}`}>
			<Select
				placeholder={placeholder}
				prefix={value ? '' : <IcMSearchlight />}
				value={value}
				{...rest}
				{...asyncProps}
				autocomplete="off"
			/>
			{animateLoading && <span className={asyncProps.loading ? styles.gradient_border : ''} />}
		</div>

	);
}

export default LocationSelect;
