import { useEffect, useMemo, useState } from 'react';

const useMobileStatus = (threshold = 768) => {
	const [isMobile, setIsMobile] = useState(false);

	useEffect(() => {
		if (typeof window !== 'undefined') {
			const mediaQuery = window.matchMedia(`(max-width: ${threshold}px)`);
			setIsMobile(mediaQuery.matches);
		}
	}, [threshold]);

	const mobileStatus = useMemo(() => ({ isMobile }), [isMobile]);

	return mobileStatus;
};

export default useMobileStatus;
