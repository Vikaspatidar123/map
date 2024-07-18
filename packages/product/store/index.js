import { configureStore } from '@reduxjs/toolkit';

import profile from './profile';

export default configureStore({
	reducer: {
		profile,
	},
});
