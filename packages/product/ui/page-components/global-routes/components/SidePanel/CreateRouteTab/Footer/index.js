import { Button, Input, Loader } from '@cogoport/components';
import { IcMTick, IcMError } from '@cogoport/icons-react';
import { startCase } from '@cogoport/utils';
import React, { useContext } from 'react';

import { WaypointsContext } from '../../../../common/context/WaypointsProvider';
import useValidateRoute from '../../../../hooks/useValidateRoute';
import {
	status_icon, success, error, status_loader, route_name_input, label_text,
} from '../styles.module.css';

import controls from '@/ui/page-components/global-routes/configurations/create_route_controls';

function Footer({ onSubmit, submitLoading }) {
	const { globalFilters, setGlobalFilters } = useContext(WaypointsContext);
	const { loading, status } = useValidateRoute(globalFilters);

	const isDisabled = status !== true || !globalFilters?.route_name
	|| (globalFilters.class_type === 'shipping_lines' && !globalFilters?.vessel_name) || submitLoading;

	const handleChange = (val, key) => {
		setGlobalFilters((prev) => ({ ...prev, [key]: val }));
	};

	const renderSuffix = () => {
		if (!globalFilters?.route_name) {
			return '';
		}
		if (loading) {
			return <Loader className={status_loader} />;
		}
		if (status === true) {
			return <IcMTick className={`${status_icon} ${success}`} />;
		}
		return (
			<IcMError className={`${status_icon} ${error}`} />
		);
	};

	const renderErrorText = () => {
		if (!globalFilters?.route_name || loading) {
			return <br />;
		}

		if (status === true) {
			return (
				<span
					style={{ marginLeft: '10px', fontSize: '10px', color: '#5aa47b' }}
				>
					This route name is available
				</span>
			);
		}
		return (
			<span
				style={{ marginLeft: '10px', fontSize: '10px', color: '#ed1c24' }}
			>
				A route with this name already exists

			</span>
		);
	};

	const hideElements = { vessel_name: globalFilters?.class_type !== 'shipping_lines' };

	return (
		<>
			{ controls.map((field) => !hideElements[field.name] && (
				<div>
					<p className={label_text}>
						{startCase(field.name)}
						:
					</p>
					<Input
						{...field}
						value={globalFilters?.[field.name] || ''}
						onChange={(val) => handleChange(val, field.name)}
						className={route_name_input}
						suffix={field.name === 'route_name' ? renderSuffix() : ''}
					/>
					{field.name === 'route_name' && renderErrorText()}
				</div>
			))}

			<Button
				size="lg"
				themeType="accent"
				onClick={onSubmit}
				disabled={isDisabled}
			>
				{submitLoading ? 'Submitting...' : 'Submit'}
			</Button>
		</>
	);
}

export default Footer;
