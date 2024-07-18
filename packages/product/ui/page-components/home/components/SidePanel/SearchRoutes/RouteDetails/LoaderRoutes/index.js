import { Placeholder } from '@cogoport/components';
import React from 'react';

import {
	loader_container, loader_head, loader_body, loader_heading,
} from '../styles.module.css';

function LoaderRoutes() {
	return (
		<>
			<div className={loader_heading}>
				<Placeholder type="circle" radius="16px" margin="0px 6px 0px 0px" />
				<Placeholder width="50px" height="12px" margin="0px 6px" />
			</div>
			<div className={loader_container}>
				<div className={loader_head}>
					<Placeholder width="80px" height="40px" />
					<Placeholder width="80px" height="40px" />
				</div>
				<div className={loader_body}>
					<Placeholder width="50px" height="50px" />
					<Placeholder width="50px" height="50px" />
					<Placeholder width="50px" height="50px" />
				</div>
			</div>

		</>
	);
}

export default LoaderRoutes;
