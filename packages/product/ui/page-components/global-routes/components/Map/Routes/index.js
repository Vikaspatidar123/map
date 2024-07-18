import { Polyline, FeatureGroup } from '@cogoport/maps';
import React, { useContext } from 'react';

import { WaypointsContext } from '../../../common/context/WaypointsProvider';
import { class_type_mapping } from '../../../common/utils';

import { servicePathOptions } from '@/commons/configuration/color-options';

function Routes() {
	const { routes, globalFilters } = useContext(WaypointsContext);

	return (
		<FeatureGroup>
			{routes.map(({ route }) => (
				<Polyline
					positions={route}
					{...servicePathOptions(class_type_mapping[globalFilters.class_type], true)}
				/>
			))}
		</FeatureGroup>
	);
}

export default Routes;
