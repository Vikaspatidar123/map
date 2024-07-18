import dynamic from 'next/dynamic';

import SearchSelect from '../../common/SearchSelect';

import SidePanel from './SidePanel';
import styles from './styles.module.css';

const Maps = dynamic(() => import('./Map'), {
	ssr: false,
});

function ServiceDiscovery() {
	return (
		<div className={styles.container}>
			<SidePanel />
			<SearchSelect />
			<Maps />
		</div>
	);
}

export default ServiceDiscovery;
