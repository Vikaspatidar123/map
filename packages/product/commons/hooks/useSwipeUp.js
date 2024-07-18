import { useState, useEffect } from 'react';

function useSwipeUp(ref) {
	const [swipedUp, setSwipedUp] = useState(false);
	const [startY, setStartY] = useState(null);

	useEffect(() => {
		const handleTouchStart = (event) => {
			const touch = event.touches[0];
			setStartY(touch.pageY);
		};

		const handleTouchMove = (event) => {
			if (startY !== null) {
				const touch = event.touches[0];
				const deltaY = touch.pageY - startY;
				if (deltaY < -70) {
					setSwipedUp(true);
				}
			}
		};

		const handleTouchEnd = () => {
			setStartY(null);
			setSwipedUp(false);
		};

		const el = ref.current;
		el.addEventListener('touchstart', handleTouchStart, { passive: true });
		el.addEventListener('touchmove', handleTouchMove, { passive: true });
		el.addEventListener('touchend', handleTouchEnd, { passive: true });

		return () => {
			el.removeEventListener('touchstart', handleTouchStart);
			el.removeEventListener('touchmove', handleTouchMove);
			el.removeEventListener('touchend', handleTouchEnd);
		};
	}, [ref, startY]);

	return { swipedUp };
}

export default useSwipeUp;
