import React from 'react';

import itemFunctions from './itemFunctions';
import styles from './styles.module.css';

import getValue from '@/ui/page-components/home/utils/getValue';

function Item({ fields = [], item = {} }) {
	return (
		<div className={styles.row}>
			{fields.map((itemField) => (
				<div
					key={itemField?.key}
					className={styles.col}
					style={{ width: `${((itemField?.span || 1) / 12) * 100}%` }}
				>
					{getValue(item, itemField, itemFunctions)}
				</div>
			))}
		</div>
	);
}

export default Item;
