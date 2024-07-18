import { IcMCrossInCircle, IcMSort } from '@cogoport/icons-react';
import { isEmpty } from '@cogoport/utils';
import React from 'react';

import styles from './styles.module.css';
import VerticalLine from './VerticalLine';

import LocationSelect from '@/ui/components/LocationSelect';

function List({ waypoints = [], setWaypoints = () => {} }) {
	const n = waypoints.length;

	const handleDelete = (key) => {
		setWaypoints((prev) => prev.filter((loc) => loc.key !== key));
	};

	const handleSwap = () => {
		const newWaypoints = [...waypoints];
		newWaypoints.reverse();
		setWaypoints(newWaypoints);
	};

	const onChange = (value, obj, key) => {
		setWaypoints((prev) => prev.map((loc) => {
			if (loc.key === key) {
				return value ? { ...loc, ...obj } : { key, value: '', label: '' };
			}
			return loc;
		}));
	};

	return (
		<div className={styles.main_container}>
			<VerticalLine count={n} />
			<div className={styles.input_container}>
				{waypoints.map(({ id, key, pos }, idx) => {
					const getSelectedOption = (option) => {
						if (id && !pos && !isEmpty(option)) {
							onChange(id, option, key);
						}
					};

					return (
						<div
							className={styles.wrapper}
							key={key}
						>
							<LocationSelect
								key={key}
								value={id}
								onChange={(val, obj) => onChange(val, obj, key)}
								placeholder={`Search ${!idx ? 'Origin' : 'Destination'}`}
								isClearable
								getSelectedOption={!pos ? getSelectedOption : undefined}
								params={{ includes: { is_icd: true } }}
								animateLoading
							/>
							{n > 2 ? (
								<IcMCrossInCircle
									className={styles.cross_icon}
									onClick={() => handleDelete(key)}
								/>
							) : null}
						</div>
					);
				})}
			</div>
			<IcMSort className={[styles.swap_icon, n > 2 ? styles.move_bottom : ''].join(' ')} onClick={handleSwap} />
		</div>
	);
}

export default List;
