import { Toast } from '@cogoport/components';

import useRequest from '@/commons/hooks/useRequest';
import getApiErrorString from '@/commons/utils/getApiError';

const useDeleteVessel = (refreshList = () => {}) => {
	const [{ loading }, trigger] = useRequest({
		url    : '/update_vessel',
		method : 'post',
	}, { manual: true });

	const deleteVessel = async (imo) => {
		try {
			await trigger({
				data: {
					imo,
					status: 'inactive',
				},
			});
			Toast.success('Vessel deleted successfully', { hideAfter: 3 });
			refreshList();
		} catch (err) {
			const errorsNew = err?.response?.data || {};
			Toast.error(getApiErrorString(errorsNew), { hideAfter: 3 });
		}
	};

	return { deleteVessel, deletingVessel: loading };
};

export default useDeleteVessel;
