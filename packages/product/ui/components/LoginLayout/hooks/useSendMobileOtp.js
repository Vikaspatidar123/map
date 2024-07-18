import { useForm } from 'react-hook-form';

import useRequest from '@/commons/hooks/useRequest';

const useSendMobileOtp = () => {
	const [{ loading, data }, trigger] = useRequest({
		url    : '/user_login',
		method : 'post',
	});

	const {
		handleSubmit, control, watch, setValue, getValues, formState:{ errors },
	} = useForm({ defaultValue: { mobile_number: { country_code: '+91', mobile_number: '' } } });

	const sendOtp = async (values) => {
		const payload = { ...(values?.mobile_number || {}) };

		try {
			await trigger({ data: payload });
		} catch (err) {
			// console.log(err);
		}
	};

	return {
		sendOtp, loading, status: data?.status, handleSubmit, errors, control, watch, setValue, getValues,
	};
};

export default useSendMobileOtp;
