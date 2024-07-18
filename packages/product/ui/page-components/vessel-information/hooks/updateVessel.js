import { Toast } from '@cogoport/components';

import useRequest from '@/commons/hooks/useRequest';
import getApiErrorString from '@/commons/utils/getApiError';

const useUpdateVessel = (closeModal = () => {}, refreshList = () => {}) => {
	const [{ loading }, trigger] = useRequest({
		url    : '/update_vessel',
		method : 'post',
	}, { manual: true });

	const checkOwnerDetails = (data) => {
		if (data.owner_name && data.owner_name.length > 0) {
			return false;
		}
		if (data.owner_line_id && data.owner_line_id.length > 0) {
			return false;
		}
		return true;
	};

	const updateVessel = async (formData) => {
		if (checkOwnerDetails(formData)) {
			Toast.warn('Please enter Owner Name or select Owner Line ID', { hideAfter: 5 });
			return;
		}

		const payload = formData;
		if (payload?.meta_data?.length > 0) {
			payload.meta_data = payload.meta_data.map((item) => {
				const { source, ...data } = item;
				return { source, data };
			});
		}
		payload.vessel_image_urls = payload?.vessel_image_urls.flatMap((item) => (item?.image_url?.finalUrl ? item?.image_url?.finalUrl : [])) || [];
		try {
			await trigger({
				data: payload,
			});
			Toast.success('Vessel updated successfully', { hideAfter: 3 });
			refreshList();
			closeModal();
		} catch (err) {
			const errorsNew = err?.response?.data || {};
			Toast.error(getApiErrorString(errorsNew), { hideAfter: 3 });
		}
	};

	return { updateVessel, updatingVessel: loading };
};

export default useUpdateVessel;
