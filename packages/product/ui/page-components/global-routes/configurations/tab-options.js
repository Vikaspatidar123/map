import { iconMappings } from '@/commons/configuration/color-options';

export default [
	{ label: 'Ocean', value: 'shipping_lines', icon: iconMappings.seaport },
	{ label: 'Air', value: 'air_lines', icon: iconMappings.air },
	{
		label: 'Lane', value: 'truck', props: { disabled: true, title: 'Comming soon' }, icon: iconMappings.land,
	},
];
