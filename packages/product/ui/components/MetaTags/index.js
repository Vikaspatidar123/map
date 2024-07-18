import Head from 'next/head';

function MetaTags({ title, description, keywords }) {
	return (
		<Head>
			{title && <title>{title}</title>}

			{/* Leave these as they are  */}
			<meta charSet="utf-8" />
			<meta httpEquiv="X-UA-Compatible" content="IE=edge" />
			<meta name="viewport" content="width=device-width, initial-scale=1" />

			{/* These are useful for search engines when crawling the internet for your website */}
			{description && <meta name="description" content={description} />}
			{keywords && <meta name="keywords" content={keywords} />}

			{/* Social Media stuff. This all makes your links look much
			 nicer and more shareable on Facebook and Twitter */}
			<meta property="og:locale" content="en_IN" />
			<meta property="og:type" content="website" />
			{title && <meta property="og:title" content={title} />}
			{description && <meta property="og:description" content={description} />}
			{title && <meta property="og:site_name" content={title} />}
			<meta
				property="og:image"
				content="https://cdn.cogoport.io/cms-prod/cogo_public/vault/original/cogoport-icon.png"
			/>
			<meta
				property="og:image:url"
				content="https://cdn.cogoport.io/cms-prod/cogo_public/vault/original/cogoport-icon.png"
			/>

			{/* Twitter meta links */}
			{description && <meta name="twitter:description" content={description} />}
			{title && <meta name="twitter:title" content={title} />}
			<meta
				property="twitter:image"
				content="https://cdn.cogoport.io/cms-prod/cogo_public/vault/original/cogoport-icon.png"
			/>
			<meta
				name="twitter:tile:image"
				content="https://cdn.cogoport.io/cms-prod/cogo_public/vault/original/cogoport-icon.png"
			/>
			<meta
				name="twitter:image:src"
				content="https://cdn.cogoport.io/cms-prod/cogo_public/vault/original/cogoport-icon.png"
			/>
			<link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
			<link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
			<link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
			<link rel="manifest" href="/site.webmanifest" />
			<link rel="mask-icon" href="/logo" color="#5bbad5" />
			<meta name="msapplication-TileColor" content="#ffc40d" />
			<meta name="theme-color" content="#ffffff" />
		</Head>
	);
}

export default MetaTags;
