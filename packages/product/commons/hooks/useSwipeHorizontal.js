import { useState, useEffect } from 'react';

import useMobileStatus from './useMobileStatus';

function useSwipeHorizontal(ref) {
	const [swipedLeft, setSwipedLeft] = useState(false);
	const [swipedRight, setSwipedRight] = useState(false);
	const [startX, setStartX] = useState(null);
	const { isMobile } = useMobileStatus(768);

	useEffect(() => {
		const element = ref.current;

		const handleTouchStart = (event) => {
			if (event.touches.length === 1) {
				const touch = event.touches[0];
				setStartX(touch.pageX);
			}
		};

		const handleTouchMove = (event) => {
			if (startX !== null && event.touches.length === 1) {
				const touch = event.touches[0];
				const deltaX = touch.pageX - startX;
				if (deltaX < -50) {
					event.preventDefault();
					setSwipedLeft(true);
				}
				if (deltaX > 50) {
					event.preventDefault();
					setSwipedRight(true);
				}
			}
		};

		const handleTouchEnd = () => {
			setStartX(null);
			setSwipedLeft(false);
			setSwipedRight(false);
		};

		if (isMobile && ref) {
			element.addEventListener('touchstart', handleTouchStart, { passive: true });
			element.addEventListener('touchmove', handleTouchMove, { passive: true });
			element.addEventListener('touchend', handleTouchEnd, { passive: true });
		}

		return () => {
			if (isMobile && ref) {
				element.removeEventListener('touchstart', handleTouchStart);
				element.removeEventListener('touchmove', handleTouchMove);
				element.removeEventListener('touchend', handleTouchEnd);
			}
		};
	}, [ref, startX, isMobile]);

	return { swipedLeft, swipedRight };
}

export default useSwipeHorizontal;
