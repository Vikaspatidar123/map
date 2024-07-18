import { format } from '@cogoport/utils';
import Axios from 'axios';
import qs from 'qs';

import ALL_APIS from '../../configuration/apis';
import { getCookie } from '../../utils/getCookieFromCtx';

const customRubySerializer = (params) => {
	const paramsStringify = qs.stringify(params, {
		arrayFormat   : 'brackets',
		serializeDate : (date) => format(date, 'isoUtcDateTime'),
	});
	return paramsStringify;
};

const customSerializer = (params) => {
	const newParams = {};
	Object.keys(params).forEach((key) => {
		if (typeof params[key] === 'object') {
			newParams[key] = JSON.stringify(params[key]);
		} else {
			newParams[key] = params[key];
		}
	});
	const paramsStringify = qs.stringify(newParams, {
		arrayFormat   : 'brackets',
		serializeDate : (date) => format(date),
	});
	return paramsStringify;
};

const request = Axios.create({ baseURL: process.env.NEXT_PUBLIC_COGOPORT_API_URL });

request.interceptors.request.use((oldConfig) => {
	const newConfig = { ...oldConfig };
	const token = getCookie(process.env.NEXT_PUBLIC_COGO_MAPS_AUTH_KEY);
	const auth_scope = getCookie('auth_scope');
	const apiPath =	newConfig.url.split('/')[1] || newConfig.url.split('/')[0];

	const apiObject = ALL_APIS[apiPath];
	const serviceName = apiObject?.service;
	let serialize = customRubySerializer;

	if (['location'].includes(serviceName)) {
		serialize = customSerializer;
	}
	if (serviceName) {
		newConfig.url = `/${serviceName}/${apiPath}`;
	}

	return {
		...newConfig,
		timeout          : 30000,
		paramsSerializer : { serialize },
		headers          : {
			authorizationparameters: 'allowed',

			authorization      : token ? `Bearer: ${token}` : undefined,
			authorizationscope : auth_scope,
		},
	};
});

export { request };
