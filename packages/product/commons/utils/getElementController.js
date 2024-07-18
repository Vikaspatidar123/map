import { InputController, MobileNumberSelectController } from '../forms';

export default (type) => {
	switch (type) {
		case 'text':
		case 'password':
		case 'email':
		case 'number':
			return InputController;
		case 'mobile-number-select':
			return MobileNumberSelectController;
		default:
			return null;
	}
};
