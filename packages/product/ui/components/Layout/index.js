import { useRouter } from 'next/router';
import React from 'react';

import documentation_nav from '@/commons/configuration/documentation_nav.json';
import DocsLayout from '@/ui/components/DocsLayout';

function Layout({ children }) {
	const router = useRouter();
	const endbarNavMap = {};
	documentation_nav.forEach(({ href, content }) => {
		endbarNavMap[href] = content || [];
	});

	return (
		<DocsLayout
			endbar={{
				nav: endbarNavMap[router.route],
			}}
			startbar={{
				nav: documentation_nav,
			}}
		>
			{children}
		</DocsLayout>
	);
}

export default Layout;
