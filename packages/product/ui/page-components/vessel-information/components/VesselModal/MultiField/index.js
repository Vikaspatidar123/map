import { Button } from '@cogoport/components';
import { IcMDelete, IcMPlus } from '@cogoport/icons-react';
import React, { useEffect } from 'react';
import { useFieldArray } from 'react-hook-form';

import styles from './styles.module.css';

import { InputController } from '@/commons/forms';
import AsyncSelectController from '@/commons/forms/page-components/Controlled/AsyncSelectContoller';
import UploadController from '@/commons/forms/page-components/Controlled/UploadController';

function MultiField({ multiCards = true, name : parentName = '', controls = [], formProps = {}, emptyValues:childEmptyValues, errorVal = {} }) {
	const { control = () => {} } = formProps;
	const { fields, append, remove } = useFieldArray({
		control,
		name: parentName,
	});

	useEffect(() => {
		if (fields.length === 0) {
			remove(0);
			append(childEmptyValues);
		}
	}, [remove, append, fields, childEmptyValues]);

	return (
		<div className={styles.cards_container}>
			{
			fields.map((card, fieldIndex) => (
				<div className={`${multiCards ? styles.ind_card : ''}`} key={card.id}>
					{controls.map((field) => {
						const { name = '', label = '', type = '', rules = {}, placeholder = '' } = field;
						if (name === 'owner_line_id') {
							return (
								<div className={styles.text_field}>
									<span className={styles.input_label}>{`${label}: `}</span>
									<AsyncSelectController
										name={`${parentName}.${fieldIndex}.${name}`}
										asyncKey="shipping_lines"
										placeholder="Select Owner Line"
										className={styles.text_input}
										control={control}
									/>
									<p className={styles.error_val}>{`  ${errorVal?.[`${parentName}.${fieldIndex}.${name}`] ? 'required' : ''}`}</p>
								</div>
							);
						}
						if (name === 'customUI') {
							return (<p className={styles.custom_label}>{label}</p>);
						}
						if (type === 'fileUpload') {
							return (
								<div className={styles.text_field}>
									<span className={styles.input_label}>{`${label}: `}</span>
									<UploadController
										name={`${parentName}.${fieldIndex}.${name}`}
										asyncKey="shipping_lines"
										placeholder="Select Owner Line"
										className={styles.text_input}
										control={control}
									/>
									<p className={styles.error_val}>{`  ${errorVal?.[`${parentName}.${fieldIndex}.${name}`] ? 'required' : ''}`}</p>
								</div>
							);
						}
						return (
							<div className={styles.text_field}>
								<span className={styles.input_label}>{`${label}: `}</span>
								<InputController
									name={`${parentName}.${fieldIndex}.${name}`}
									type={type}
									className={styles.text_input}
									rules={rules}
									placeholder={placeholder}
									control={control}
								/>
								<p className={styles.error_val}>{`${errorVal?.[parentName]?.[fieldIndex]?.[name] ? 'required' : ''}`}</p>
							</div>
						);
					})}
					{
						multiCards && fields.length > 1
						&& (
							<div className={styles.footer_data}>
								<div className={styles.footer_left} />
								<div className={styles.footer_right}>
									<IcMDelete className={styles.delete_icon} onClick={() => remove(fieldIndex)} />
								</div>
							</div>
						)
					}
				</div>
			))
		}
			{
			multiCards && (
				<div className={styles.edit_button_container}>
					<Button className={styles.edit_button} onClick={() => append(childEmptyValues)}><IcMPlus style={{ fontSize: '24px' }} /></Button>
				</div>
			)
		}

		</div>
	);
}

export default MultiField;
