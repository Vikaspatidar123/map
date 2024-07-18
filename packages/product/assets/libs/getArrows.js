import { L } from '@cogoport/maps';

function distanceTo(p1, p2) {
	const x = p2.x - p1.x;
	const y = p2.y - p1.y;

	return Math.sqrt(x * x + y * y);
}

function Point(x, y, round) {
	this.x = (round ? Math.round(x) : x);
	this.y = (round ? Math.round(y) : y);
}

function myMidPoint(latlng1, latlng2, per, mapObj) {
	if (!mapObj) { throw new Error('map is not defined'); }

	let ratio;

	const p1 = mapObj.project(new L.LatLng(latlng1));
	const p2 = mapObj.project(new L.LatLng(latlng2));

	const halfDist = distanceTo(p1, p2) * per;

	if (halfDist === 0) { return mapObj.unproject(p1); }

	const dist = distanceTo(p1, p2);

	if (dist > halfDist) {
		ratio = (dist - halfDist) / dist;
		const res = mapObj.unproject(new Point(p2.x - ratio * (p2.x - p1.x), p2.y - ratio * (p2.y - p1.y)));
		return [res.lat, res.lng];
	}
	return latlng1;
}

function getAngle(latLng1, latlng2, coef) {
	const dy = latlng2[0] - latLng1[0];
	const dx = Math.cos((Math.PI / 180) * latLng1[0]) * (latlng2[1] - latLng1[1]);
	const ang = ((Math.atan2(dy, dx) / Math.PI) * 180 * coef);
	return (ang).toFixed(2);
}

function getArrows(arrLatlngs, color, arrowCount, mapObj) {
	if (!Array.isArray(arrLatlngs) || arrLatlngs.length < 2) { return []; }

	const newArrowCnt = (!arrowCount.isNaN() && toString.call(arrowCount) === '[object Number]')
		? Math.max(arrowCount, 1) : 1;

	const newColor = color ? `color:${color}` : '';

	const result = [];
	for (let i = 1; i < arrLatlngs.length; i += 1) {
		const icon = L.divIcon({
			className : 'arrow-icon',
			bgPos     : [2, 2],
			html      : `<div style="${newColor};transform: rotate(${getAngle(
				arrLatlngs[i - 1],
				arrLatlngs[i],

				-1,
			).toString()}deg)">▶</div>`,
		});

		for (let c = 1; c <= newArrowCnt; c += 1) {
			result.push(L.marker(myMidPoint(
				arrLatlngs[i],
				arrLatlngs[i - 1], (
					c / (newArrowCnt + 1)),

				mapObj,
			), { icon }));
		}
	}
	return result;
}

export default getArrows;
