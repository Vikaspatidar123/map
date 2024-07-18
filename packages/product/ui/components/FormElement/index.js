import styles from './styles.module.css';

import getElementController from '@/commons/utils/getElementController';

function FormElement({
	errors, label, name, control, ...rest
}) {
	const errorMessage = errors?.[name]?.message || '';
	const Element = getElementController(rest.type);
	return (
		<div className={`${styles.container} ${errorMessage ? styles.error : ''}`}>
			<p className={styles.label_text}>{label}</p>
			<Element control={control} {...rest} name={name} />
			<span className={styles.error_text}>{errorMessage}</span>
		</div>
	);
}

export default FormElement;
