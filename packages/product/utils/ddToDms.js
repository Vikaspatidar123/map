const convertDDToDMS = (pos) => {
	const direction = [['N', 'E'], ['S', 'W']];
	let posString = '';
	pos.forEach((D, lng) => {
		const dir = direction[Number(D < 0)][lng];
		const deg = (D < 0 ? (-D) : D);
		posString += `${dir} ${Math.round(deg * 100) / 100}° `;
	});
	return posString;
};
export default convertDDToDMS;
