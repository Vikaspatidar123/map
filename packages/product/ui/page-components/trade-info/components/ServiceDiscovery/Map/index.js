import {
	CogoMaps,
} from '@cogoport/maps';
import React, { useState } from 'react';

import useMobileStatus from '@/commons/hooks/useMobileStatus';
import getDefaultMapProps from '@/commons/utils/getDefaultMapProps';
import Fullscreen from '@/ui/components/map-components/FullScreen';

function Map() {
	const center = [20.5937, 78.9629];
	const [map, setMap] = useState();
	const { isMobile } = useMobileStatus(576);

	return (
		<CogoMaps
			center={center}
			style={{ height: 'calc(100vh - 56px)', width: '100vw' }}
			zoom={4}
			setMap={setMap}
			{...getDefaultMapProps({ isMobile })}
		>
			<Fullscreen map={map} />
		</CogoMaps>
	);
}

export default Map;
