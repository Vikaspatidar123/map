import { Button } from '@cogoport/components';
import React, { useState } from 'react';
import { useSelector } from 'react-redux';

// import { heading } from '../../../styles.module.css';

// import Item from './Item';
import styles from './styles.module.css';

import users_mapping from '@/commons/configuration/users_mapping';
import CommingSoon from '@/public/images/ic-comming-soon.svg';
import IdentifyUser from '@/ui/components/IdentifyUser';

function List({ config = {} }) {
	const [show, setShow] = useState(false);
	const { isLogged } = useSelector(({ profile }) => profile);

	// if (isLogged && !data.length) return null;

	return (
		<div className={styles.container}>
			<div className={styles.blurred}>
				<div className={styles.header}>
					<p>{config?.heading}</p>
					{' '}
					{/* <button className={event_btn}>Filter</button> */}
				</div>

				{/* {isLogged && data.map((item) => (
					<Item
						key={item?.key}
						item={item}
						fields={config?.fields}
					/>
				))} */}

				{isLogged && (
					<div className={styles.banner_container}>
						<CommingSoon className={styles.coming_soon} />
					</div>
				)}

				{!isLogged && (
					<img
						src={config.img_src}
						alt="prices"
					/>
				)}
			</div>

			{!isLogged && (
				<div className={styles.sign_up_container}>
					<p>Unlock unbeatable rates!!</p>
					<Button themeType="accent" onClick={() => setShow(users_mapping[0])}>Unlock Rates</Button>
				</div>
			)}

			<IdentifyUser show={show} onClose={() => setShow(false)} utm_medium={`${config?.utm_medium}_rates`} />
		</div>
	);
}

export default List;
