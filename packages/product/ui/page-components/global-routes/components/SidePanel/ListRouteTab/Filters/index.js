import { Input } from '@cogoport/components';
import { IcMSearchlight } from '@cogoport/icons-react';
// import { startCase } from '@cogoport/utils';
import React, { useEffect } from 'react';

import styles from './styles.module.css';

// import AsyncSelect from '@/ui/components/AsyncSelect';
// import { WaypointsContext } from '@/ui/page-components/global-routes/common/context/WaypointsProvider';
import CustomTabs from '@/ui/page-components/global-routes/common/CustomTabs';
// import asyncTypeMapping from '@/ui/page-components/global-routes/configurations/async-type-mapping';
import tabOptions from '@/ui/page-components/global-routes/configurations/tab-options';

function Filters({ listFilters, setListFilters, setCurrentSelectedId }) {
	const activeTab = listFilters.class_type;
	// const { setGlobalFilters } = useContext(WaypointsContext);
	// const extraProps = activeTab === 'truck' ? asyncTypeMapping[activeTab]?.control : {};

	// const handleChange = (val) => {
	// 	setListFilters((prev) => ({
	// 		...prev,
	// 		class_id: val,
	// 	}));
	// };

	const handleTabChange = (value) => {
		setCurrentSelectedId({});
		setListFilters((prev) => ({ ...prev, class_type: value }));
		// setGlobalFilters((prev) => ({ ...prev, class_type: value }));
	};

	useEffect(() => {
		setListFilters((prev) => ({ ...prev, class_id: '' }));
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [activeTab]);

	return (
		<div className={styles.container}>
			<div className={styles.header_container}>
				<CustomTabs
					handleTabChange={handleTabChange}
					activeTab={listFilters?.class_type}
					tabOptions={tabOptions}
				/>

				{/* <AsyncSelect
					key={activeTab}
					asyncKey={asyncTypeMapping[activeTab].asyncKey}
					placeholder={`Select ${startCase(activeTab).slice(0, -1)}`}
					value={listFilters?.class_id}
					onChange={handleChange}
					style={{ width: '180px', zIndex: '3' }}
					size="sm"
					isClearable
					{...extraProps}
				/> */}
			</div>
			<Input
				prefix={<IcMSearchlight />}
				placeholder={`route name, location${listFilters.class_type === 'shipping_lines'
					? ', vessel name' : ''}, operator`}
				type="text"
				autocomplete="off"
				value={listFilters?.q || ''}
				onChange={(val) => setListFilters((prev) => ({ ...prev, q: val, page: 1 }))}
			/>
		</div>
	);
}

export default Filters;
