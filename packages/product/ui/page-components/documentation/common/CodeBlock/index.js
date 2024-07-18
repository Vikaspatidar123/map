import { PrismAsyncLight as SyntaxHighlighter } from 'react-syntax-highlighter';
import jsx from 'react-syntax-highlighter/dist/cjs/languages/prism/jsx';
import prismdark from 'react-syntax-highlighter/dist/cjs/styles/prism/vsc-dark-plus';

import styles from './styles.module.css';

SyntaxHighlighter.registerLanguage('jsx', jsx);

function CodeBlock({
	children,
}) {
	return (
		<div className={styles.container}>
			<SyntaxHighlighter
				customStyle={{ borderRadius: 5 }}
				language="jsx"
				style={prismdark}
			>
				{children}
			</SyntaxHighlighter>
		</div>
	);
}

export default CodeBlock;
