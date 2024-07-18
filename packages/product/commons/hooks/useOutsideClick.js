import { useEffect, useRef } from 'react';

function useOutsideClick(ref, callback) {
	const callbackRef = useRef();

	useEffect(() => {
		callbackRef.current = callback;
	}, [callback]);

	useEffect(() => {
		function handleClickOutside(event) {
			if (ref.current && !ref.current.contains(event.target)) {
				callbackRef.current();
			}
		}

		document.addEventListener('click', handleClickOutside);

		return () => {
			document.removeEventListener('click', handleClickOutside);
		};
	}, [ref]);
}

export default useOutsideClick;
