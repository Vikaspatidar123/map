const markerColor = {
	sea   : 'rgb(12,187,245)',
	truck : '#1eb041',
	plane : 'purple',
};
const getMarkerOptions = (type, isMain) => ({
	fillColor   : markerColor[type],
	color       : '#f6f7f9',
	weight      : 2,
	radius      : isMain ? 6.5 : 5,
	fillOpacity : 0.95,
});

export default getMarkerOptions;
