export const baseLayer = [
	{
		name        : 'Cogo Maps',
		url         : `${process.env.NEXT_PUBLIC_MAPS_BASE_URL}/{z}/{x}/{y}.png`,
		attribution : '<a href="https://www.cogoport.com/en-IN/terms-and-conditions/" target="_blank">&copy; Cogoport T&C</a> | <a href="https://www.cogoport.com/en-IN/privacy-policy/" target="_blank">Privacy & data protection</a>',
		minZoom     : 0,
		maxZoom     : 15,
	},
];
export const overlay = [{
	name        : 'railway',
	attribution : '',
	url         : 'https://{s}.tiles.openrailwaymap.org/standard/{z}/{x}/{y}.png',
	maxZoom     : 19,
}];
export const pathOptions = [
	{
		color   : '#f68b21',
		opacity : 0.7,
		weight  : 5,
	},
	{
		color   : '#182A4D',
		opacity : 0.9,
		weight  : 5,
	},
];
