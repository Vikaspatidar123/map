const asyncFieldsLocations = () => ({
	valueKey    : 'id',
	labelKey    : 'label',
	endpoint    : '/list_locations',
	initialCall : true,
	params      : {
		page_limit      : 10,
		preferences     : { airport: true, seaport: true },
		includes        : { default_params_required: true },
		recommendations : true,
	},
});

const asyncFieldsShippingLines = () => ({
	valueKey    : 'id',
	labelKey    : 'short_name',
	endpoint    : '/list_operators',
	initialCall : true,
	params      : {
		filters    : { operator_type: 'shipping_line', status: 'active' },
		page_limit : 100,
		sort_by    : 'short_name',
		sort_type  : 'asc',
	},
});

const asyncFieldsAirLines = () => ({
	valueKey    : 'id',
	labelKey    : 'short_name',
	endpoint    : '/list_operators',
	initialCall : true,
	params      : {
		filters    : { operator_type: 'airline', status: 'active' },
		page_limit : 100,
		sort_by    : 'short_name',
		sort_type  : 'asc',
	},
});

export {
	asyncFieldsAirLines,
	asyncFieldsLocations,
	asyncFieldsShippingLines,
};
