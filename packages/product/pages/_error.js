import Link from 'next/link';
import React from 'react';

import Logo from '@/public/images/cogomaps.svg';

const style = {
	width          : '100vw',
	height         : '100vh',
	display        : 'flex',
	flexDirection  : 'column',
	gap            : '24px',
	alignItems     : 'center',
	justifyContent : 'center',
};
const iconStyle = {
	height: '24px',
};
function ErrorPage({ statusCode }) {
	return (
		<div style={style}>
			<h1>{statusCode}</h1>
			<Link href="/">Back to home</Link>
			<Logo style={iconStyle} />
		</div>
	);
}

export default ErrorPage;
