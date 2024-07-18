import {
	IcMProfile, IcMPartnersCogoport, IcMUpwardGraph, IcMMoney,
} from '@cogoport/icons-react';

export default [
	{
		label                : 'Importer Exporter',
		description          : 'I would like to buy services from Cogoport',
		icon                 : <IcMMoney />,
		redirect_url         : 'https://app.cogoport.com/signup?utm_source="maps"',
		mobile_login_allowed : true,
		platform             : 'app',
		auth_scope           : 'organization',
	},
	{
		label                : 'Channel Partner',
		description          : 'I would like to buy services from Cogoport',
		icon                 : <IcMPartnersCogoport />,
		redirect_url         : 'https://partners.cogoport.com/en-IN/signup?utm_source="maps"',
		mobile_login_allowed : true,
		platform             : 'partner',
		auth_scope           : 'partner',
	},
	{
		label                : 'Logistic Service Provider',
		description          : 'I would like to sell services to Cogoport',
		icon                 : <IcMUpwardGraph />,
		redirect_url         : 'https://partners.cogoport.com/en-IN/signup?utm_source="maps"',
		mobile_login_allowed : true,
		platform             : 'partner',
		auth_scope           : 'partner',
	},
	{
		label                : 'Cogoport Employee',
		description          : 'I would like to sign up as Cogoport Employee',
		icon                 : <IcMProfile />,
		redirect_url         : '',
		mobile_login_allowed : false,
		platform             : 'admin',
		auth_scope           : 'partner',
	},
];
