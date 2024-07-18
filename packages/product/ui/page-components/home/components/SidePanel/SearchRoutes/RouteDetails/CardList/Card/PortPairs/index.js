import { Tooltip } from '@cogoport/components';
import { IcMArrowRight } from '@cogoport/icons-react';

import styles from './styles.module.css';

import getLocations from '@/ui/page-components/home/utils/getLocations';
import getMainLocation from '@/utils/getMainLocation';
import toTitleCase from '@/utils/toTitleCase';

function PortPairs({ data }) {
	const { origin, destination } =	getLocations({ ...data, search_type: data?.main_service }) || {};
	const codePattern = /\([A-Z]+\)/;

	const getPortCode = (str = '') => {
		const res = codePattern.exec(str)?.[0] || '';
		return res.replace(/[\W_]+/g, ' ');
	};

	const renderLocationDetails = (location) => {
		const mainLocation = getMainLocation(location?.display_name || '');
		return (
			<div className={styles.loc_box}>
				<p
					className={styles.port_code}
				>
					{location?.port_code || getPortCode(location?.display_name) || mainLocation || ''}
				</p>
				<Tooltip content={<div className={styles.content}>{location?.display_name || location?.name}</div>}>
					<p className={styles.name}>
						{toTitleCase(location?.name || location?.display_name)}
					</p>
				</Tooltip>
			</div>
		);
	};
	return (
		<div className={styles.location_container}>

			{renderLocationDetails(origin?.id ? origin : data?.origin)}

			<div className={styles.divider}>
				<div className={styles.line} />
				<IcMArrowRight />
			</div>

			{renderLocationDetails(destination?.id ? destination : data?.destination)}

		</div>
	);
}

export default PortPairs;
