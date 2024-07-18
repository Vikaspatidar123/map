import { startCase } from '@cogoport/utils';

import styles from './styles.module.css';

import AsyncSelect from '@/ui/components/AsyncSelect';
import CustomTabs from '@/ui/page-components/global-routes/common/CustomTabs';

const control = {
	placeholder : 'Select Country',
	asyncKey    : 'locations',
	endpoint    : '/list_locations',
	valueKey    : 'id',
	labelKey    : 'name',
	params      : {
		filters  : { type: ['country'] },
		includes : { id: true, display_name: true },
	},
};
const tabOptions = ['seaport', 'airport'].map((value) => ({ label: startCase(value), value }));

function Filters({ listFilters, setListFilters }) {
	const handleChange = (val) => {
		setListFilters((prev) => ({ ...prev, port_type: val }));
	};

	const onChange = (val, obj) => {
		setListFilters((prev) => ({ ...prev, country_id: val, country_label: obj?.name }));
	};

	return (
		<div className={styles.filter_container}>
			<AsyncSelect
				{...control}
				value={listFilters.country_id}
				onChange={onChange}
				style={{ width: '200px' }}
			/>
			{
				listFilters.port_type === 'seaport' && (
					<button
						onClick={() => setListFilters((prev) => ({ ...prev, is_icd: !prev.is_icd }))}
						className={`${styles.tab} ${listFilters?.is_icd ? styles.active : ''}`}
					>
						ICD
					</button>
				)
			}
			<CustomTabs
				tabOptions={tabOptions}
				handleTabChange={handleChange}
				activeTab={listFilters.port_type}
			/>

		</div>
	);
}

export default Filters;
