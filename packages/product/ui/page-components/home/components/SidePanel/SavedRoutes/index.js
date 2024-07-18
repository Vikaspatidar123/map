import { Button, Input, Pagination } from '@cogoport/components';
import { IcMSearchlight } from '@cogoport/icons-react';
import { useContext, useState } from 'react';
import { useSelector } from 'react-redux';

import { WaypointsContext } from '../../../common/context/WaypointsProvider';
import useListSavedRoutes from '../../../hooks/useListSavedRoutes';
import RouteDetails from '../SearchRoutes/RouteDetails';

import styles from './styles.module.css';

import IdentifyUser from '@/ui/components/IdentifyUser';

function SavedRoutes() {
	const userProfile = useSelector(({ profile }) => profile);
	const { activeRoute } = useContext(WaypointsContext);

	const [show, setShow] = useState(false);
	const [savedFilters, setSavedFilters] = useState({ page: 1 });

	const { loading = false, getSavedRoutes, total_count } = useListSavedRoutes(savedFilters);

	const handleChange = (val, key) => {
		setSavedFilters((prev) => ({ ...prev, [key]: val }));
	};

	return (
		<div className={styles.container}>
			{!userProfile?.isLogged ? (
				<>
					<div className={styles.signup_container}>
						<p>You are not signed in. Sign up to use this feature</p>
						<Button
							themeType="accent"
							onClick={() => setShow(true)}
						>
							Login / Sign Up
						</Button>
					</div>
					<IdentifyUser
						show={show}
						onClose={() => setShow(false)}
						utm_medium="saved_route"
					/>
				</>
			) : (
				<>
					{!activeRoute && (
						<div className={styles.input_container}>
							<Input
								prefix={<IcMSearchlight />}
								placeholder="origin, destination, waypoints, port code"
								value={savedFilters?.q || ''}
								autocomplete="off"
								onChange={(val) => handleChange(val, 'q')}
							/>
						</div>
					)}
					<RouteDetails
						tabType="saved_routes"
						loading={loading}
						refetchRoutes={() => getSavedRoutes(savedFilters?.q)}
					/>

					{!activeRoute && (
						<Pagination
							type="number"
							currentPage={savedFilters.page}
							totalItems={total_count || 1}
							pageSize={10}
							onPageChange={(page) => handleChange(page, 'page')}
							className={styles.pagination}
						/>
					)}
				</>
			)}
		</div>
	);
}

export default SavedRoutes;
