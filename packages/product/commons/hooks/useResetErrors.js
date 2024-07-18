/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from 'react';

const useResetErrors = ({ errors, currentStateErrors, setErrors }) => {
	useEffect(() => {
		Object.keys(errors).forEach((key) => {
			if (!currentStateErrors[key]) {
				// eslint-disable-next-line no-param-reassign
				delete errors[key];
			}
		});
		setErrors({ ...errors });
	}, [JSON.stringify(currentStateErrors)]);
};

export default useResetErrors;
