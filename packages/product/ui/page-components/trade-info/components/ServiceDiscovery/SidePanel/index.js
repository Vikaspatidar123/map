import { Pagination, Loader } from '@cogoport/components';
import React, { useEffect, useState } from 'react';

import useListPortPriorities from '../../../hooks/useListPortPriorities';
import PortInfo from '../../PointLocation/LeftPanel/NearestList/PortInfo';

import Filters from './Filters';
import styles from './styles.module.css';

function SidePanel() {
	const [listFilters, setListFilters] = useState({
		country_id    : '541d1232-58ce-4d64-83d6-556a42209eb7',
		country_label : 'India',
		port_type     : 'seaport',
		page          : 1,
	});

	const { list, loading, total_count } = useListPortPriorities(listFilters);

	useEffect(() => {
		setListFilters((prev) => ({ ...prev, page: 1 }));
	}, [listFilters.port_type]);

	return (
		<div className={styles.container}>
			<h1 className={styles.heading_text}>
				Trending Ports in
				{' '}
				{listFilters.country_label}
			</h1>
			<Filters
				listFilters={listFilters}
				setListFilters={setListFilters}
			/>
			{loading ? (
				<div
					className={styles.loader_container}
				>
					<Loader />
				</div>
			) : (list || []).map(({ location }) => <PortInfo data={location} />)}
			<Pagination
				type="number"
				currentPage={listFilters.page}
				totalItems={total_count || 1}
				pageSize={10}
				onPageChange={(val) => setListFilters((prev) => ({ ...prev, page: val + 1 }))}
				className={styles.pagination}
			/>
		</div>
	);
}

export default SidePanel;
