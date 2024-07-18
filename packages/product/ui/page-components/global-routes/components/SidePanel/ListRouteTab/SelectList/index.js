import React from 'react';

import AirList from '../AirList';
import DetailsList from '../DetailsList';
import List from '../List';

function SelectList(props) {
	const {
		listFilters,
		setListFilters,
		currentSelectedId,
		setCurrentSelectedId,
		resetFilters,
	} = props;

	if (currentSelectedId && Object.keys(currentSelectedId).length > 0) {
		return (
			<DetailsList
				listFilters={listFilters}
				setListFilters={setListFilters}
				currentSelectedId={currentSelectedId}
				setCurrentSelectedId={setCurrentSelectedId}
			/>
		);
	}

	if (listFilters?.class_type === 'air_lines') {
		return (
			<AirList
				listFilters={listFilters}
				setListFilters={setListFilters}
				setCurrentSelectedId={setCurrentSelectedId}
				resetFilters={resetFilters}
			/>
		);
	}

	return (
		<List
			listFilters={listFilters}
			setListFilters={setListFilters}
			setCurrentSelectedId={setCurrentSelectedId}
			resetFilters={resetFilters}
		/>
	);
}

export default SelectList;
