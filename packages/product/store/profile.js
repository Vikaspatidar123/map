import { createSlice } from '@reduxjs/toolkit';

export const profileSlice = createSlice({
	name         : 'profile',
	initialState : {
		name: 'Cogo',
	},
	reducers: {
		setProfile: (state, otherValues) => ({ ...state, ...(otherValues.payload || {}) }),

	},
});

export const { setProfile } = profileSlice.actions;
export default profileSlice.reducer;
