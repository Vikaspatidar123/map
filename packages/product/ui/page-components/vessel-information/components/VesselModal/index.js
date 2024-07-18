import { Button, Modal, Toast } from '@cogoport/components';
import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';

import { formControls } from '../../configurations/VesselFormControls';
import useCreateVessel from '../../hooks/createVessel';
import useGetVesselByIMO from '../../hooks/getVesselByImo';
import useUpdateVessel from '../../hooks/updateVessel';

import MultiField from './MultiField';
import styles from './styles.module.css';

import { InputController } from '@/commons/forms';
import AsyncSelectController from '@/commons/forms/page-components/Controlled/AsyncSelectContoller';
import useDebounceQuery from '@/commons/hooks/useDebounceQuery';

export default function VesselModal({
	showModal = '',
	setShowModal = () => {},
	modalIMO = null,
	setModalIMO = () => {},
	refreshList = () => {},
	isAdmin = false,
}) {
	const { debounceQuery, query: IMOnumber } = useDebounceQuery();
	const formProps = useForm();
	const { handleSubmit, watch, setValue, control, reset, formState: { errors: errorVal } } = formProps;

	const resetFeildArray = () => {
		setValue('previous_owners', [formControls[4].emptyValues]);
		setValue('meta_data', [formControls[5].emptyValues]);
		setValue('vessel_image_urls', [formControls[6].emptyValues]);
	};

	const resetModal = () => {
		resetFeildArray();
		setModalIMO(null);
		reset();
	};

	const closeModal = () => {
		resetModal();
		setShowModal('');
	};
	const { createVessel } = useCreateVessel(closeModal, refreshList);
	const { updateVessel } = useUpdateVessel(closeModal, refreshList);

	useGetVesselByIMO(IMOnumber, setShowModal, formControls, setValue, showModal);

	const word_map = {
		add_vessel  : 'Add',
		edit_vessel : 'Update',
	};

	const watchIMO = watch('imo');

	useEffect(() => {
		debounceQuery(watchIMO);
	}, [watchIMO, debounceQuery]);

	const handleData = (data) => {
		if (showModal === 'add_vessel') createVessel(data);
		else if (showModal === 'edit_vessel') updateVessel(data);
	};

	const promptForRequiredFeilds = () => {
		Toast.error('Please fill all the required feilds');
	};

	useEffect(() => {
		setValue('imo', modalIMO);
	}, [modalIMO, setValue]);

	return (
		<Modal
			size="lg"
			show={showModal.length > 0}
			onClose={() => closeModal()}
			placement="center"
			className={styles.modal_container}
			closeOnOuterClick
		>
			<Modal.Header title={`${word_map[showModal]} Vessel Details`} />
			{	isAdmin && (
				<Modal.Body className={styles.modal_body_container}>
					{formControls.map((item) => {
						const { name = '', label = '', type = '', rules = {}, placeholder = '' } = item;
						if (type === 'fieldArray') {
							return (
								<div className={styles.multi_field} key={name}>
									<span className={styles.multi_field_label}>{`${label}`}</span>
									<MultiField {...item} formProps={formProps} errorVal={errorVal} />
								</div>
							);
						}
						if (name === 'owner_line_id') {
							return (
								<div className={styles.text_field} key={name}>
									<span className={styles.input_label}>{`${label}: `}</span>
									<AsyncSelectController
										asyncKey="shipping_lines"
										name={name}
										className={styles.text_input}
										control={control}
										rules={rules}
										placeholder={placeholder}
									/>
									<p className={styles.error_val}>{`  ${errorVal?.[name] ? 'required' : ''}`}</p>
								</div>
							);
						}
						return (
							<div className={styles.text_field} key={name}>
								<span className={styles.input_label}>{`${label}: `}</span>
								<InputController
									name={name}
									type={type}
									className={styles.text_input}
									control={control}
									rules={rules}
									placeholder={placeholder}
								/>
								<p className={styles.error_val}>{`  ${errorVal?.[name] ? 'required' : ''}`}</p>
							</div>
						);
					})}
				</Modal.Body>
			)}

			<Modal.Footer>
				<Button onClick={handleSubmit(handleData, (er) => promptForRequiredFeilds(er))}>
					{word_map[showModal]}
				</Button>
			</Modal.Footer>
		</Modal>
	);
}
