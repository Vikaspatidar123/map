import Head from 'next/head';
import { useRouter } from 'next/router';
import pageProgessBar from 'nprogress';
import React, { useEffect, useRef } from 'react';
import { Provider } from 'react-redux';

import '@cogoport/components/dist/themes/base.css';
import '@cogoport/components/dist/themes/dawn.css';
import 'nprogress/nprogress.css';

import GTMHandler from './GTMHandler';

import AuthenticationProvider from '@/commons/Authenticate';
import meta_config from '@/commons/configuration/meta_config.json';
import store from '@/store';
import GlobalLayout from '@/ui/components/GlobalLayout';
import Layout from '@/ui/components/Layout';
import MetaTags from '@/ui/components/MetaTags';

function App({ Component, pageProps }) {
	const router = useRouter();
	const prevRoute = useRef(null);
	const pathName = router.route.split('/')[1];

	const actualRouteChanged = (url) => {
		const [pathname, params] = url.split('?');
		const isRouteChanged = pathname !== prevRoute.current || !params;
		prevRoute.current = pathname;
		return isRouteChanged;
	};

	useEffect(() => {
		const onRouteChangeStart = (url) => {
			if (actualRouteChanged(url)) {
				pageProgessBar.start();
				pageProgessBar.set(0.4);
			}
		};

		const onRouteChangeComplete = () => {
			pageProgessBar.done();
		};

		router.events.on('routeChangeStart', onRouteChangeStart);
		router.events.on('routeChangeComplete', onRouteChangeComplete);
		router.events.on('routeChangeError', onRouteChangeComplete);

		return () => {
			router.events.off('routeChangeStart', onRouteChangeStart);
			router.events.off('routeChangeComplete', onRouteChangeComplete);
			router.events.off('routeChangeError', onRouteChangeComplete);
		};
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	return (
		<Provider store={store}>
			<Head>
				<meta name="viewport" content="width=device-width, initial-scale=1.0" />
				<title>
					CogoMaps
				</title>
			</Head>
			<AuthenticationProvider>
				<GlobalLayout>
					<MetaTags {...meta_config[`/${pathName}`]} />

					{router.route.includes('/documentation') ? (
						<Layout>
							<Component {...pageProps} />
						</Layout>
					) : <Component {...pageProps} />}
				</GlobalLayout>
			</AuthenticationProvider>
			<GTMHandler />
		</Provider>
	);
}

export default App;
