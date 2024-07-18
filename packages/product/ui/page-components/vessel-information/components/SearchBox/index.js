import { Input } from '@cogoport/components';
import { IcMSearchlight } from '@cogoport/icons-react';

import styles from './styles.module.css';

function SearchBox(props) {
	const { searchText = '', setSearchText = () => {} } = props;
	return (
		<div className={styles.main_container}>
			<Input
				type="text"
				className={styles.search_box}
				value={searchText}
				suffix={<IcMSearchlight className={styles.search_icon} />}
				placeholder="Search IMO Number, Country, Name, ..."
				onChange={setSearchText}
			/>
		</div>
	);
}

export default SearchBox;
