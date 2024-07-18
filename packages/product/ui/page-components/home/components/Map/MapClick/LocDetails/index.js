import { Button } from '@cogoport/components';
import { IcMCross } from '@cogoport/icons-react';
import Link from 'next/link';
import React from 'react';

import styles from '../styles.module.css';

import getMainLocation from '@/utils/getMainLocation';

function LocDetails({ data, handleClick, onClose }) {
	return (
		<div key={data?.id} className={styles.container}>
			<div className={styles.point_details_container}>
				{data?.id
					? (
						<>
							<h4>{data?.display_name}</h4>
							<p>
								<Link
									href={`/trade-info/${data.id}`}
								>
									{getMainLocation(data?.display_name)}
								</Link>

							</p>
							<div className={styles.btn_wrapper}>
								<Button
									themeType="accent"
									size="sm"
									onClick={(e) => handleClick(e, 0)}
								>
									Origin

								</Button>
								<Button
									size="sm"
									onClick={(e) => handleClick(e, 1)}
								>
									Destination

								</Button>
							</div>
						</>
					)
					: <h4>No location found!!</h4>}

				<IcMCross
					className={styles.cross_btn}
					onClick={onClose}
				/>
			</div>
		</div>
	);
}

export default LocDetails;
