import { FixedContainer } from '@cogoport/components';
import React from 'react';

import styles from './styles.module.css';

function DocsPage({ title, children }) {
	return (
		<FixedContainer className={styles.container}>
			<article>
				<div className={styles.title_container}>
					<h1>{title}</h1>
				</div>
				{children}
			</article>
		</FixedContainer>
	);
}

export default DocsPage;
