export default {
	heading    : 'Truck Rates',
	type       : 'service_providers',
	utm_medium : 'ftl',
	// eslint-disable-next-line max-len
	img_src    : 'https://cogoport-testing.sgp1.digitaloceanspaces.com/b9930497ca9b235ce03822b8b0fe2502/Screenshot%202023-02-13%20at%209.46.43%20PM.png',
	fields     : [
		{
			label    : '',
			key      : 'truck_type',
			span     : 10,
			func     : 'renderTruckType',
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
