import { Toast } from '@cogoport/components';
import { setCookie } from '@cogoport/utils';
import { useState } from 'react';
import { useForm } from 'react-hook-form';

import useRequest from '@/commons/hooks/useRequest';
import useResetErrors from '@/commons/hooks/useResetErrors';
import getApiErrorString from '@/commons/utils/getApiError';

const useAuthentication = ({ activeUserType = {} }) => {
	const [{ loading }, trigger] = useRequest({
		url    : 'login_user',
		method : 'post',
	});
	const [errors, setErrors] = useState({});

	const {
		handleSubmit, control, watch, setValue, formState: { errors: errorVal },
	} = useForm();

	useResetErrors({ errors, setErrors, currentStateErrors: errorVal });

	const onSubmit = async (values) => {
		const finalPayload = {
			...values,
			auth_scope : activeUserType?.auth_scope,
			platform   : activeUserType?.platform,
		};

		try {
			const response = await trigger({ data: finalPayload });
			const token = response?.data?.token;
			setCookie(process.env.NEXT_PUBLIC_COGO_MAPS_AUTH_KEY, token);
			setCookie('auth_scope', activeUserType?.auth_scope);
			window.location.href = '/';
		} catch (err) {
			const errorsNew = err?.response?.data || {};
			Toast.error(getApiErrorString(errorsNew), { hideAfter: 1 });
		}
	};

	return {
		handleSubmit,
		onSubmit,
		control,
		errors,
		watch,
		setValue,
		authLoading: loading,
	};
};

export default useAuthentication;
