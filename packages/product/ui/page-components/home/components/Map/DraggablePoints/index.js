import {
	CircleMarker, FeatureGroup, Marker, Tooltip,
} from '@cogoport/maps';
import React, { useContext } from 'react';

import { WaypointsContext } from '../../../common/context/WaypointsProvider';
import { tooltip } from '../styles.module.css';

import { getMapIcon } from '@/utils';

const viaPointOptions = {
	radius      : 5,
	color       : '#4f4f4f',
	fillColor   : '#7c7c7c',
	fillOpacity : 0.8,
	weight      : 1,
};
function DraggablePoints({ map }) {
	const { waypoints } = useContext(WaypointsContext);

	return (
		<FeatureGroup
			eventHandlers={{ layeradd: (e) => map?.flyToBounds(e.target.getBounds(), { maxZoom: 8 }) }}
		>
			{waypoints.map(({
				pos, name, display_name = '', display_pos,
			}, idx) => (pos || display_pos) && (
				!idx || idx === waypoints.length - 1 ? (
					<Marker
						key={`${display_name || name}_${JSON.stringify(display_pos || pos)}`}
						position={display_pos || pos}
						icon={getMapIcon(idx ? '/images/default-red.svg' : '/images/default.svg')}
					>
						<Tooltip offset={[0, -20]}>
							<div className={tooltip}>{(display_name || name).split(',')[0]}</div>
						</Tooltip>
					</Marker>
				) : (
					<CircleMarker
						key={`${display_name || name}_${JSON.stringify(display_pos || pos)}`}
						center={display_pos}
						{...viaPointOptions}
					>
						<Tooltip>
							<div className={tooltip}>{name || display_name}</div>
						</Tooltip>
					</CircleMarker>
				)
			))}
		</FeatureGroup>
	);
}

export default DraggablePoints;
