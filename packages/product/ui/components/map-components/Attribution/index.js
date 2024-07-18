/* eslint-disable max-len */
import { useEffect } from 'react';

function Attribution({ map }) {
	useEffect(() => {
		if (map) {
			map?.attributionControl?.setPrefix('<a href="https://www.cogoport.com/en/terms-and-conditions/" target="_blank">&copy; Cogoport T&C</a> | <a href="https://www.cogoport.com/en/privacy-policy/" target="_blank">Privacy & data protection</a> | <a href="https://leafletjs.com/" target="_blank" >Leaflet</a>');
		}
	}, [map]);
	return null;
}

export default Attribution;
