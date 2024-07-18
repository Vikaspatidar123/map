import { useState, useEffect } from 'react';

const useLocalStorage = (key, initialValue) => {
	const [value, setValue] = useState(initialValue);

	const setStoredValue = (val) => {
		setValue(val);
		localStorage.setItem(key, JSON.stringify(val));
	};

	useEffect(() => {
		const data = localStorage.getItem(key);
		if (data) {
			setValue(JSON.parse(data));
		}
	}, [key]);

	return [value, setStoredValue];
};

export default useLocalStorage;
