import { IcMRefresh } from '@cogoport/icons-react';
import { startCase } from '@cogoport/utils';
import React, { useContext } from 'react';

import { getId, WaypointsContext } from '../../../../common/context/WaypointsProvider';
import CustomTabs from '../../../../common/CustomTabs';
import asyncTypeMapping from '../../../../configurations/async-type-mapping';
import tabOptions from '../../../../configurations/tab-options';

import styles from './styles.module.css';

import AsyncSelect from '@/ui/components/AsyncSelect';
import LocationSelect from '@/ui/components/LocationSelect';

function Filters() {
	const {
		globalFilters, setGlobalFilters, activeKey, waypoints, setWaypoints, setActiveKey,
	} = useContext(WaypointsContext);
	const activeWaypoint = waypoints.filter(({ key }) => key === activeKey)?.[0] || {};

	const activeTab = globalFilters.class_type;
	const isLandTab = activeTab === 'truck';
	const isSelectedClassId = globalFilters?.class_id;

	const params = {
		filters: isLandTab
			? { country_id: isSelectedClassId } : asyncTypeMapping[activeTab]?.filters,
		page_limit: 20,
	};

	const extraProps = isLandTab ? asyncTypeMapping[activeTab]?.control : {};

	const handleTabChange = (val) => {
		if (val !== activeTab) {
			setGlobalFilters((prev) => ({
				...prev, class_type: val, short_name: '', logo_url: null, class_id: '',
			}));
		}
	};

	const handleDelete = (key) => {
		const newId = getId();
		setActiveKey(newId);
		setWaypoints((prev) => [...prev.filter((loc) => loc.key !== key && loc.pos), {
			value: '', pos: null, key: newId,
		}]);
	};

	const onChange = (value, obj) => {
		if (!value) {
			handleDelete(activeKey);
			return;
		}
		const newId = getId();
		setActiveKey(newId);
		setWaypoints((prev) => {
			const newWaypoints = prev.map((loc) => ((loc.key === activeKey)
				? { ...loc, ...obj }
				: loc)).filter((loc) => !!loc?.value);
			return [...newWaypoints, {
				value: '', pos: null, key: newId,
			}];
		});
	};

	const handleLineChange = (val, obj) => {
		setGlobalFilters((prev) => ({
			...prev,
			class_id   : val,
			short_name : obj?.short_name || obj?.country_code || obj?.display_name,
			logo_url   : obj?.logo_url || obj?.flag_icon_url || obj?.flag_image_url,
		}));
	};

	const handleReset = () => {
		const newId = getId();
		setWaypoints([{
			value: '', pos: null, key: newId,
		}]);
	};
	return (
		<div className={styles.main_container}>
			<div className={styles.flex_container}>
				<div className={styles.container}>
					<div className={styles.header_container}>
						<p>Customise</p>
						<CustomTabs
							handleTabChange={handleTabChange}
							activeTab={activeTab}
							tabOptions={tabOptions}
						/>
					</div>
					<div className={styles.select_container}>
						{
							globalFilters?.short_name && (
								<div
									className={styles.logo_icon}
									style={{ backgroundImage: `url(${globalFilters.logo_url})` }}
								/>
							)
						}
						<AsyncSelect
							key={activeTab}
							asyncKey={asyncTypeMapping[activeTab].asyncKey}
							placeholder={`Select ${startCase(activeTab).slice(0, -1)}`}
							style={{ width: '330px' }}
							value={isSelectedClassId}
							onChange={handleLineChange}
							{...extraProps}
						/>
					</div>
				</div>
			</div>

			<div className={styles.flex}>
				<button
					className={`${styles.refresh_icon} ${!globalFilters?.class_id ? styles.hide : ''}`}
					onClick={handleReset}
					disabled={waypoints.length < 2}
				>
					<IcMRefresh />
				</button>
				<LocationSelect
					key={activeKey}
					value={activeWaypoint.value}
					onChange={onChange}
					placeholder={!isSelectedClassId
						? `Select ${startCase(activeTab)} first`
						: `+Add ${asyncTypeMapping[activeTab].placeholder}`}
					isClearable
					params={params}
					animateLoading
					disabled={!isSelectedClassId}
				/>
			</div>
		</div>
	);
}

export default Filters;
