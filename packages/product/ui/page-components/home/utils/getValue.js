import { getByKey, isEmpty } from '@cogoport/utils';

const getValue = (itemData, itemField, functions) => {
	if (isEmpty(itemData) || isEmpty(itemField)) {
		return '-';
	}

	let val = getByKey(itemData, itemField.key);

	if (itemField.func) {
		if (functions[itemField.func]) {
			val = functions[itemField.func](itemData, itemField);
		}
	}
	return val;
};

export default getValue;
