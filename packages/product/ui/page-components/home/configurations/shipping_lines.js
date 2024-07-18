/* eslint-disable max-len */
export default {
	heading    : 'Ocean Rates',
	type       : 'service_providers',
	utm_medium : 'fcl',
	img_src    : 'https://cogoport-testing.sgp1.digitaloceanspaces.com/875c3d030ba91745f7163e0e7a3792e2/MicrosoftTeams-image%20%283%29.png',
	fields     : [
		{
			label    : '',
			key      : 'shipping_line',
			span     : 10,
			func     : 'renderShippingLine',
			valueKey : 'price.price',
			// onChange : (item) => {
			// 	setSelectedPrice(item);
			// },
			// checked: (val) => selectedPrice?.value === val,
		},
		{
			label : '',
			key   : 'price',
			func  : 'renderPrice',
			span  : 2,
		},
	],
	filterProps: [

	],
};
