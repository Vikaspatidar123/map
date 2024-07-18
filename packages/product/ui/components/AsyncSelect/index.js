import { MultiSelect, Select } from '@cogoport/components';
import { isEmpty, merge } from '@cogoport/utils';

import useGetAsyncOptions from '@/commons/hooks/useGetAsyncOptions';
import { asyncFieldsShippingLines, asyncFieldsAirLines, asyncFieldsLocations } from '@/commons/utils/getAsyncFields';

const keyAsyncFieldsParamsMapping = {
	shipping_lines : asyncFieldsShippingLines,
	air_lines      : asyncFieldsAirLines,
	locations      : asyncFieldsLocations,
};

function AsyncSelect(props) {
	const {
		params,
		multiple,
		asyncKey,
		initialCall,
		getModifiedOptions,
		getSelectedOption,
		onChange,
		...rest
	} = props;

	const defaultParams = keyAsyncFieldsParamsMapping[asyncKey]?.() || {};

	const getAsyncOptionsProps = useGetAsyncOptions({
		...defaultParams,
		initialCall,
		endpoint        : defaultParams?.endpoint || rest?.endpoint,
		params          : merge(defaultParams?.params || {}, params),
		labelKey        : rest.labelKey || defaultParams.labelKey,
		valueKey        : rest.valueKey || defaultParams.valueKey,
		defaultOnChange : onChange,
	});

	if (
		typeof getModifiedOptions === 'function'
		&& !isEmpty(getAsyncOptionsProps.options)
	) {
		getAsyncOptionsProps.options = getModifiedOptions(getAsyncOptionsProps.options);
	}

	if (typeof getSelectedOption === 'function' && !isEmpty(rest.value)) {
		let selectedValue;
		if (multiple) {
			selectedValue = rest.value.slice(-1);
		} else {
			selectedValue = rest.value;
		}

		const selectedOption = getAsyncOptionsProps.options.filter(
			(option) => option.id === selectedValue,
		);

		getSelectedOption(selectedOption[0]);
	}

	const Element = multiple ? MultiSelect : Select;

	return <Element {...rest} {...getAsyncOptionsProps} />;
}

export default AsyncSelect;
