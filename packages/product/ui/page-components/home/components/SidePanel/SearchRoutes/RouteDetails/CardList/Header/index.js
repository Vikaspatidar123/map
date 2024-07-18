import { startCase } from '@cogoport/utils';

import { header, type_text } from '../styles.module.css';

import { iconMappings } from '@/commons/configuration/color-options';

function Header({ main_service }) {
	return (
		<div className={header}>
			<div className={main_service}>{iconMappings[main_service]}</div>
			<p className={type_text}>{startCase(main_service)}</p>
		</div>
	);
}

export default Header;
