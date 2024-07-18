import { Accordion, Loader } from '@cogoport/components';
import { startCase } from '@cogoport/utils';
import React, { useEffect } from 'react';

import styles from './styles.module.css';

import ComingSoon from '@/public/images/ic-comming-soon.svg';
import EmptyState from '@/ui/page-components/home/common/EmptyState';
import useGetLocationServices from '@/ui/page-components/trade-info/hooks/useGetLocationServices';

const services = {
	seaport: [
		{
			name    : 'FCL Freight',
			service : 'fcl-freight',
		},
		{
			name    : 'LCL Freight',
			service : 'lcl-frieght',
		},

	],
	airport: [
		{
			name    : 'Air Domestic',
			service : 'air-freight',
		},
	],
};

const services_mapping = {
	seaport : 'shipping_lines',
	airport : 'air_lines',
};

function ServiceTab({ locationData }) {
	const { loading, data, getLocationsServices } = useGetLocationServices();
	const location_id = locationData?.id;

	useEffect(() => {
		if (location_id) {
			getLocationsServices({ location_id });
		}
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [location_id]);

	return (
		<div className={styles.container}>
			{!loading && data?.[services_mapping[locationData?.type]] && (
				(services?.[locationData?.type] || []).map((service) => (
					<Accordion
						key={service.service}
						type="text"
						title={service.name}
						className={styles.accordion_container}
					>
						<h4 className={styles.heading}>
							{startCase(services_mapping[locationData?.type])}
							{' '}
							serving at this port :
						</h4>
						<div className={styles.pill_container}>
							{(data?.shipping_lines || []).map((line) => (
								<div
									className={styles.pill}
									key={line}
								>
									<img
										src={line?.href
										|| 'https://tinyurl.com/4swjph5r'}
										alt="icon"
									/>
									{line}
								</div>
							))}
						</div>
					</Accordion>
				))
			)}
			{loading && <Loader className={styles.loader_container} />}
			{!loading && !data?.shipping_lines && (
				<EmptyState
					style={{ alignSelf: 'center', fontSize: '16px' }}
					header="Service data not available for this location"
				>
					<ComingSoon className={styles.icon} />
				</EmptyState>
			)}
		</div>
	);
}

export default ServiceTab;
