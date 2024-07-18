import { Button } from '@cogoport/components';
import { IcMArrowBack } from '@cogoport/icons-react';
import React, { useContext, useState } from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { TouchBackend } from 'react-dnd-touch-backend';
import { useSelector } from 'react-redux';

import Body from '../../../common/Body';
import { WaypointsContext } from '../../../common/context/WaypointsProvider';
import useCreateCustomizedRoute from '../../../hooks/useCreateCustomizedRoute';
import useGetMultipleRoutes from '../../../hooks/useGetMultipleRoutes';

import DraggableList from './DraggableList';
import Filters from './Filters';
import AppliedFilters from './Filters/AppliedFilters';
import Footer from './Footer';
import LoadingState from './LoadingState';
import styles from './styles.module.css';

import IdentifyUser from '@/ui/components/IdentifyUser';

const isTouchDevice = () => {
	if (typeof window !== 'undefined' && 'ontouchstart' in window) {
		return true;
	}
	return false;
};

const dndBackend = isTouchDevice() ? TouchBackend : HTML5Backend;

const endpoint_mapping = {
	shipping_lines : 'get_multiple_sea_routes',
	air_lines      : 'get_multiple_air_routes',
	truck          : 'get_multiple_truck_routes',
};

function CreateRouteTab() {
	const {
		actualWaypts, globalFilters = {}, routes, setRoutes,
	} = useContext(WaypointsContext);
	const [show, setShow] = useState(false);
	const { isLogged } = useSelector(({ profile }) => profile);

	const endpoint = endpoint_mapping[globalFilters.class_type];
	const { loading, getRoutes } = useGetMultipleRoutes({ endpoint });
	const { loading:submitLoading, createRoute } = useCreateCustomizedRoute({ globalFilters, actualWaypts });

	const showRoutes = routes.length > 0;

	if (!isLogged) {
		return (
			<>
				<div className={styles.signup_container}>
					<p>You are not signed in. Sign up to use this feature</p>
					<Button themeType="accent" onClick={() => setShow(true)}>Login / Sign Up</Button>
				</div>
				<IdentifyUser show={show} onClose={() => setShow(false)} utm_medium="saved_route" />
			</>
		);
	}
	return (
		<div className={styles.container}>
			<div className={styles.flex_container}>
				{!showRoutes
					? <Filters />
					: (
						<div className={styles.header}>
							<IcMArrowBack
								className={styles.back_btn}
								onClick={() => setRoutes([])}
							/>
							<AppliedFilters globalFilters={globalFilters} />
						</div>
					)}
				<div className={styles.horizontal_line} />
			</div>

			{!globalFilters?.class_id && (
				<div className={styles.center_div}>
					Add Filters to get Started.
				</div>
			)}

			{!showRoutes && (loading ? <LoadingState />
				: (
					<DndProvider backend={dndBackend}>
						<DraggableList />
					</DndProvider>
				))}

			{showRoutes && (
				<div style={{ marginLeft: '16px' }}>
					<Body
						actualWaypts={actualWaypts}
						heading="Selected Waypoints"
						service_type={globalFilters?.class_type}
					/>
				</div>
			)}

			{actualWaypts.length > 1 && (
				<div
					className={`${styles.bottom_container} 
					${actualWaypts.length > 2 && styles.sticky} ${showRoutes ? styles.column : ''}`}
				>
					{showRoutes
						? (
							<Footer
								submitLoading={submitLoading}
								onSubmit={() => {
									createRoute();
								}}
							/>
						)
						: (
							<Button
								onClick={() => getRoutes()}
								disabled={loading || !globalFilters?.class_id}
							>
								Preview
							</Button>
						)}
				</div>
			)}
		</div>
	);
}

export default CreateRouteTab;
