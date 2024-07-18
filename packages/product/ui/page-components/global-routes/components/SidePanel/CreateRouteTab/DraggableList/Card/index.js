import { IcMEdit, IcMDelete, IcMLocation } from '@cogoport/icons-react';
import { useContext, useRef } from 'react';
import { useDrag, useDrop } from 'react-dnd';

import styles from './styles.module.css';
import { ItemTypes } from './types';

import { iconMappings } from '@/commons/configuration/color-options';
import { WaypointsContext } from '@/ui/page-components/global-routes/common/context/WaypointsProvider';
import { class_type_mapping } from '@/ui/page-components/global-routes/common/utils';
import getMainLocation from '@/utils/getMainLocation';

let L;

if (typeof window !== 'undefined') {
	// eslint-disable-next-line global-require
	({ L } = require('@cogoport/maps'));
}

const maxBounds = [[-90, Infinity], [90, Infinity]];

function Card({
	data, index, moveCard, handleDelete, isLast, id, isFirst,
}) {
	const ref = useRef(null);
	const {
		setBounds, globalFilters, setActiveKey, activeKey, routes, waypoints,
	} = useContext(WaypointsContext);

	const showingRoutes = (Array.isArray(routes) && routes.length > 0);
	const isActiveCard = activeKey === id;
	const [{ handlerId }, drop] = useDrop({
		accept  : ItemTypes.CARD,
		canDrop : () => !showingRoutes,
		collect(monitor) {
			return {
				handlerId: monitor.getHandlerId(),
			};
		},
		hover(item, monitor) {
			if (!ref.current) {
				return;
			}
			const dragIndex = item.index;
			const hoverIndex = index;
			if (dragIndex === hoverIndex) {
				return;
			}
			const hoverBoundingRect = ref.current?.getBoundingClientRect();
			const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
			const clientOffset = monitor.getClientOffset();
			const hoverClientY = clientOffset.y - hoverBoundingRect.top;
			if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
				return;
			}
			if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
				return;
			}
			moveCard(dragIndex, hoverIndex);
			// eslint-disable-next-line no-param-reassign
			item.index = hoverIndex;
		},
	});

	const [{ isDragging }, drag] = useDrag({
		type    : ItemTypes.CARD,
		item    : () => ({ id, index }),
		canDrag : !showingRoutes,
		collect : (monitor) => ({
			isDragging: monitor.isDragging(),
		}),
	});

	const opacity = isDragging ? 0.4 : 1;
	drag(drop(ref));

	const handleLocationClick = () => {
		const bounds = L.latLngBounds([data?.pos] || maxBounds);
		setBounds(bounds);
		setActiveKey(id);
	};

	const handleEdit = () => {
		if (isActiveCard) {
			const { key } = waypoints.filter(({ value }) => !value)[0];
			setActiveKey(key);
		} else setActiveKey(id);
	};

	return (
		<div className={styles.container}>
			<div className={styles.vertical_line}>
				<div className={[styles.icon_wrapper, isActiveCard ? styles.icon_active : '',
					isLast || isFirst ? styles.primary_wrapper : ''].join(' ')}
				>
					{iconMappings[class_type_mapping[globalFilters.class_type]]}
				</div>
				{!isLast && (
					<div className={[styles.line,
						styles.secondary].join(' ')}
					/>
				)}
			</div>
			<div
				ref={ref}
				className={[styles.wrapper, isActiveCard ? styles.active : ''].join(' ')}
				style={{ opacity }}
				data-handler-id={handlerId}
			>
				<div className={styles.flex_between}>
					<h4 className={styles.heading}>{data?.display_name}</h4>
					<div className={[styles.btn_wrapper, showingRoutes ? styles.disabled : ''].join(' ')}>
						<IcMEdit
							onClick={handleEdit}
						/>
						<IcMDelete onClick={() => handleDelete(id)} />
					</div>
				</div>
				<p className={styles.description}>{getMainLocation(data?.display_name || '')}</p>
				<div className={[styles.btn_wrapper, showingRoutes ? styles.disabled : ''].join(' ')}>
					<IcMLocation onClick={handleLocationClick} />
				</div>
			</div>
		</div>
	);
}

export default Card;
