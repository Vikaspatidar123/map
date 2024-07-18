import { Toast } from '@cogoport/components';
import { useCallback, useEffect, useState } from 'react';

import useRequest from '@/commons/hooks/useRequest';

const useGetVesselByIMO = (IMOnumber, setShowModal, formControls, setValue, showModal) => {
	const [{ loading }, trigger] = useRequest({
		url    : '/get_vessel',
		method : 'get',
	}, { manual: true });

	const [isShipIdPresent, setIsShipIdPresent] = useState(false);

	const getVesselDetails = useCallback(async () => {
		try {
			const vesselData = await trigger({
				params: {
					imo: IMOnumber,
				},
			});
			if (showModal.length > 0) {
				setIsShipIdPresent(true);
				if (vesselData?.data) {
					formControls.forEach((item) => {
						if (item.name === 'owner_line_id') {
							setValue('owner_line_id', vesselData?.data?.owner_line?.id);
						} else if (item.name !== 'imo' && item.type !== 'fieldArray') {
							const key = item.name;
							setValue(key, vesselData.data?.[key]);
						}
					});
					setValue('previous_owners', vesselData.data?.previous_owners);
					setValue('meta_data', vesselData.data?.meta_data?.map((item) => {
						const { source, data } = item;
						return { source, ...data };
					}));
					setValue('vessel_image_urls', vesselData.data?.vessel_image_urls?.map((item) => ({ image_url: item })));
				}
			}
		} catch (err) {
			setIsShipIdPresent(false);
			formControls.forEach((item) => {
				if (item.name === 'owner_line_id') {
					setValue('owner_line_id', null);
				} else if (item.name !== 'imo' && item.type !== 'fieldArray')setValue(item.name, null);
			});
			setValue('previous_owners', [formControls[4].emptyValues]);
			setValue('meta_data', [formControls[5].emptyValues]);
			setValue('vessel_image_urls', [formControls[6].emptyValues]);
		}
	}, [trigger, IMOnumber, formControls, setValue, showModal]);

	useEffect(() => {
		if (IMOnumber && IMOnumber > 0) {
			getVesselDetails();
		}
	}, [IMOnumber, getVesselDetails]);

	useEffect(() => {
		if (isShipIdPresent) {
			setShowModal('edit_vessel');
			Toast.info('Vessel already exists');
		} else setShowModal('add_vessel');
	}, [isShipIdPresent, setShowModal]);

	return { fetchingVesselData: loading };
};

export default useGetVesselByIMO;
