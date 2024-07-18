import TagManager from 'react-gtm-consent-module';

export const initGTM = (id) => {
	TagManager.initialize({ gtmId: id });
};
