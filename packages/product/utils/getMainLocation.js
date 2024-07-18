function getMainLocation(display_name = '') {
	return display_name.split(',').map((word) => word.trim()).filter((word) => word !== '')
		.reduceRight((acc, word) => (acc.includes(word) || acc.length >= 2 ? acc : [word, ...acc]), [])
		.slice(0, 2)
		.join(', ');
}

export default getMainLocation;
