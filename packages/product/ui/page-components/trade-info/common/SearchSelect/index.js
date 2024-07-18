import { merge } from '@cogoport/utils';
import { useRouter } from 'next/router';
import React from 'react';

import styles from './styles.module.css';

import LocationSelect from '@/ui/components/LocationSelect';

function SearchSelect({
	locationData = null, setLocationData = () => {}, params = {}, hideSelect = false, hideDirection = 'left',
}) {
	const router = useRouter();
	const { location_id, target } = router.query;

	const onChange = (id) => {
		if (id) {
			router.push({
				pathname: '/trade-info/[id]',
			}, `/trade-info/${id}${target ? `?target=${target}` : ''}`);
		}
		if (location_id && !id) {
			router.push('/trade-info');
		}
	};

	const getSelectedOption = (option) => {
		if (option && option?.id !== locationData?.id) {
			setLocationData(option);
		}
	};

	const finalParams = target === 'live_congestion' ? merge(params, { filters: { type: 'seaport' } }) : params;

	return (
		<div className={`${styles.search_input} ${hideSelect ? styles[`hide_select_${hideDirection}`] : ''}`}>
			<LocationSelect
				size="lg"
				placeholder="Search a place"
				onChange={onChange}
				value={location_id}
				isClearable
				animateLoading
				getSelectedOption={getSelectedOption}
				params={finalParams}
			/>
		</div>
	);
}

export default SearchSelect;
