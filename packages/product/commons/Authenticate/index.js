import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import useRequest from '@/commons/hooks/useRequest';
import { getCookie } from '@/commons/utils/getCookieFromCtx';
import { setProfile } from '@/store/profile';

const fetchProfile = async (trigger) => {
	try {
		const response = await trigger();
		const { data: profileData } = response || {};

		if (Object.keys(profileData || {}).length === 0) return false;

		return profileData;
	} catch (err) {
		return false;
	}
};

const handleAuthentication = async (userProfile, trigger) => {
	const token = getCookie(process.env.NEXT_PUBLIC_COGO_MAPS_AUTH_KEY);

	if (!token) return false;

	if (userProfile?.id && userProfile.email) {
		return true;
	}

	const response = await fetchProfile(trigger);
	return response;
};

function AuthenticationProvider({ children }) {
	const userProfile = useSelector(({ profile }) => profile);
	const dispatch = useDispatch();

	const [, trigger] = useRequest({
		url    : '/get_user_session',
		method : 'GET',
	});

	const getLogin = async () => {
		dispatch(setProfile({ isLogged: false, preparingProfile: true }));
		const isLogged = await handleAuthentication(userProfile, trigger);
		const dataToSet = typeof isLogged === 'object' ? isLogged : {};
		dispatch(setProfile({ isLogged: !!isLogged, preparingProfile: false, ...(dataToSet || {}) }));
	};

	useEffect(() => {
		getLogin();
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	return children;
}

export default AuthenticationProvider;
