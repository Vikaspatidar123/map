import React from 'react';

import Navigation from './Navigation';

function GlobalLayout({ children }) {
	return (
		<div>
			<Navigation />
			{children}
		</div>
	);
}

export default GlobalLayout;
