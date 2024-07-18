export default {
	shipping_lines: {
		filters     : { type: ['seaport'], is_icd: false },
		placeholder : 'Seaport',
		asyncKey    : 'shipping_lines',
	},
	air_lines: {
		filters     : { type: ['airport'] },
		placeholder : 'Airport',
		asyncKey    : 'air_lines',
	},
	truck: {
		placeholder : 'Location',
		asyncKey    : 'locations',
		control     : {
			placeholder : 'Select Country',
			asyncKey    : 'locations',
			endpoint    : '/list_locations',
			valueKey    : 'id',
			labelKey    : 'display_name',
			params      : {
				filters  : { type: ['country'] },
				includes : { flag_image_url: true, flag_icon_url: true, default_params_required: true },
			},
		},
	},
};
