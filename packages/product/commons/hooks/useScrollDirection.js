import { useState, useEffect } from 'react';

const useScrollDirection = (ref) => {
	const [scrollDir, setScrollDir] = useState(null);
	const [prevScrollTop, setPrevScrollTop] = useState(0);

	useEffect(() => {
		const cachedRef = ref?.current;
		const handleScroll = () => {
			const currentScrollTop = cachedRef.scrollTop;

			if (currentScrollTop > prevScrollTop) {
				setScrollDir('down');
			} else if (currentScrollTop < prevScrollTop) {
				setScrollDir('up');
			}

			setPrevScrollTop(currentScrollTop);
		};

		cachedRef.addEventListener('scroll', handleScroll, { passive: true });

		return () => cachedRef.removeEventListener('scroll', handleScroll);
	}, [ref, prevScrollTop]);

	return scrollDir;
};

export default useScrollDirection;
