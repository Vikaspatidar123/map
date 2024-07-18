/* eslint-disable max-len */
import { Tabs, TabPanel } from '@cogoport/components';
import dynamic from 'next/dynamic';
import React, { useState } from 'react';

import CodeBlock from '../../common/CodeBlock';
import DocsPage from '../../common/DocsPage';

import styles from './styles.module.css';

const Map = dynamic(() => import('../../common/Map'), {
	ssr: false,
});

function GettingStarted() {
	const [activeTab, setActiveTab] = useState('npm');
	// eslint-disable-next-line no-template-curly-in-string
	const newVar = '${process.env.NEXT_PUBLIC_MAPS_BASE_URL}/{z}/{x}/{y}.png';
	return (
		<DocsPage title="Getting Started">
			<section id="intro" className={styles.section_container}>
				<h2>Introduction</h2>
				<p>
					Cogoport Components provides plenty of map components to integrate your
					web applications with leaflet map library,
					and we will improve components experience consistently. Install
					<code> @cogoport/maps </code>
					to get started.
				</p>
				<p>
					We are using leaflet and react-leaflet as base libraries.
				</p>
			</section>
			<section id="installation" className={styles.section_container}>
				<h2>Installation</h2>
				<p>Install Cogomaps using any Package registry</p>
				<Tabs
					activeTab={activeTab}
					themeType="secondary"
					onChange={setActiveTab}
				>
					<TabPanel name="npm" title="npm">
						<CodeBlock>
							npm install @cogoport/maps
						</CodeBlock>
					</TabPanel>
					<TabPanel name="yarn" title="yarn">
						<CodeBlock>
							yarn add @cogoport/maps
						</CodeBlock>
					</TabPanel>
					<TabPanel name="pnpm" title="pnpm">
						<CodeBlock>
							pnpm install @cogoport/maps
						</CodeBlock>
					</TabPanel>
				</Tabs>

				<br />
				<p>After installation, components can be imported using named imports. </p>
				<CodeBlock>
					{'import { CogoMaps, L, Marker, Popup} from \'@cogoport/maps\';'}
				</CodeBlock>
			</section>
			<section id="setup" className={styles.section_container}>
				<h2>Setup</h2>
				<div>
					<p>Create a Map component using components from @cogoport/maps</p>
					<CodeBlock>
						{`const center = [20.5937, 78.9629];
const icon = new L.Icon({ iconUrl: '/images/default-red.svg', iconSize: [20, 20] });
NEXT_PUBLIC_MAPS_BASE_URL = https://maps.dev.cogoport.io/cogo-tiles // testing purposes
const baseLayer = [
	{
		name        : 'Cogo Maps',
		url         : \`${newVar}\`,
		attribution : '<a href="https://www.cogoport.com/en/terms-and-conditions/">&copy;Cogoport T&C</a> | <a href="https://www.cogoport.com/en/privacy-policy/">Privacy & data protection</a>',
		minZoom     : 0,
		maxZoom     : 15,
	},
];
return (
	<CogoMaps
		center={center}
		style={{ height: '700px', width: '100%' }}
		zoom={4}
		baseLayer={baseLayer}
	>
		<Marker position={center} icon={icon}>
			<Popup>
				This is a popup
			</Popup>
		</Marker>
	</CogoMaps>
);
						`}
					</CodeBlock>
					<br />
					<p>Import the map component with next/dynamic.</p>
					<CodeBlock>
						{`const Map = dynamic(() => import('../Map'), {
	ssr: false,
});`}
					</CodeBlock>
					<br />
					<p>Now use it in any react component</p>
					<CodeBlock>
						{`<div className={styles.container}>
	<h2>This is an interactive map !!</h2>
	<Map />
</div>`}
					</CodeBlock>
					<br />
					<p>This is how it will look</p>
				</div>
				<div className={styles.container}>
					<h2>This is an interactive map !!</h2>
					<Map />
				</div>
				<br />
				<p>
					For detailed documentation on Leaflet
					<a
						className={styles.styled_link}
						href="https://leafletjs.com/reference.html"
						target="_blank"
						rel="noreferrer"
					>
						click here.

					</a>

					<span style={{ marginLeft: '12px' }}>
						For working examples on react-leaflet
						<a
							className={styles.styled_link}
							href="https://react-leaflet.js.org/docs/example-popup-marker/"
							target="_blank"
							rel="noreferrer"
						>
							click here.
						</a>

					</span>
				</p>

			</section>

		</DocsPage>
	);
}

export default GettingStarted;
