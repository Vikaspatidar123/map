/* eslint-disable max-len */
export default {
	heading    : 'Air Rates',
	type       : 'service_providers',
	utm_medium : 'air',
	img_src    : 'https://cogoport-testing.sgp1.digitaloceanspaces.com/b9930497ca9b235ce03822b8b0fe2502/Screenshot%202023-02-13%20at%209.46.43%20PM.png',
	fields     : [
		{
			label    : '',
			key      : 'air_line',
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
