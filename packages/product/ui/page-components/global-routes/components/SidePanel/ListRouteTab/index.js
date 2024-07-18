import { useEffect, useState } from 'react';

import Filters from './Filters';
import SelectList from './SelectList';
import styles from './styles.module.css';

function ListRouteTab() {
	const [listFilters, setListFilters] = useState({ class_type: 'shipping_lines', class_id: '', q: '', page: 1 });
	const [currentSelectedId, setCurrentSelectedId] = useState({});
	const resetFilters = () => {
		setListFilters({ class_type: 'shipping_lines', class_id: '' });
	};
	useEffect(() => {
		setListFilters((prev) => ({ ...prev, q: '', page: 1 }));
	}, [listFilters.class_type, currentSelectedId]);
	return (
		<div className={styles.container}>
			<Filters
				listFilters={listFilters}
				setListFilters={setListFilters}
				setCurrentSelectedId={setCurrentSelectedId}
			/>
			<SelectList
				listFilters={listFilters}
				setListFilters={setListFilters}
				currentSelectedId={currentSelectedId}
				setCurrentSelectedId={setCurrentSelectedId}
				resetFilters={resetFilters}
			/>
		</div>
	);
}

export default ListRouteTab;
