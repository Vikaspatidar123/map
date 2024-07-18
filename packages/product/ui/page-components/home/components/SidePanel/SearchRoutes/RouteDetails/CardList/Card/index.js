import { Modal, Button, Loader } from '@cogoport/components';
import { IcMBookmark, IcCBookmark } from '@cogoport/icons-react';
import React, { useContext, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

import PortPairs from './PortPairs';
import styles from './styles.module.css';

import IdentifyUser from '@/ui/components/IdentifyUser';
import { WaypointsContext } from '@/ui/page-components/home/common/context/WaypointsProvider';
import Footer from '@/ui/page-components/home/common/Footer';
import useCreateSavedRoute from '@/ui/page-components/home/hooks/useCreateSavedRoute';
import useDeleteSavedRoute from '@/ui/page-components/home/hooks/useDeleteSavedRoute';

function Card({
	route, main_service, tabType, is_bookmarked = '', route_id, refetchRoutes = () => {},
}) {
	const { setActiveRoute, setActiveTab, waypoints } = useContext(WaypointsContext);
	const [show, setShow] = useState(false);
	const [showLogin, setShowLogin] = useState(false);
	const [isBookmarked, setIsBookmarked] = useState(is_bookmarked);
	const [routeId, setRouteId] = useState(route_id);

	const { isLogged } = useSelector(({ profile }) => profile);

	const { loading:saveLoading, createSavedRoute } = useCreateSavedRoute({
		setIsBookmarked,
		setRouteId,
	});

	const { loading, deleteSavedRoute } = useDeleteSavedRoute({
		refetch: refetchRoutes,
		setIsBookmarked,
		setRouteId,
	});

	const loadingBookmarks = saveLoading || loading;

	const actualWaypts = waypoints.filter(({ pos }) => !!pos);

	const mainWaypoints = ((route?.lineString || [])
		.filter((leg) => leg?.type === main_service)?.[0]?.waypoints || [])
		.map((pt, i) => (main_service === 'land' ? ({
			...pt,
			display_name: !i ? actualWaypts[i]?.display_name : actualWaypts.slice(-1)[0]?.display_name,
		}) : pt));

	const data = { origin: mainWaypoints[0], destination: mainWaypoints[mainWaypoints.length - 1] };

	const handleClick = () => {
		setActiveRoute({ main_service, routes: [route], id: route.id });
		if (tabType === 'search_routes') {
			setActiveTab(main_service);
		}
	};

	const handleBookmark = (e) => {
		e.stopPropagation();
		if (isLogged) {
			createSavedRoute({
				route_params: { main_service, route },
			});
		} else {
			setShow(true);
		}
	};

	const handleDelete = (e) => {
		e.stopPropagation();
		deleteSavedRoute({ id: routeId });
	};

	useEffect(() => {
		setIsBookmarked(!!is_bookmarked);
	}, [is_bookmarked]);

	useEffect(() => {
		setRouteId(route_id);
	}, [route_id]);

	return (
		<>
			<div
				role="button"
				tabIndex="0"
				className={styles.card}
				onClick={handleClick}
			>
				<PortPairs data={{ ...data, main_service }} />
				<div className={styles.flex_container}>
					<Footer data={route} />
					{loadingBookmarks ? (
						<Loader
							className={`${styles.loader} ${isBookmarked ? styles.delete : ''}`}
						/>
					) : null}
					{!loadingBookmarks && (isBookmarked
						? (
							<IcCBookmark
								className={styles.bookmark_icon}
								onClick={handleDelete}
							/>
						)
						: (
							<IcMBookmark
								className={styles.bookmark_icon}
								onClick={handleBookmark}
							/>
						))}
				</div>
			</div>

			<Modal size="sm" show={show} placement="center" onClose={() => setShow(false)}>
				<Modal.Header title="You need to sign in" />
				<Modal.Body>
					You are not signed in. Sign in to save this route, customise your route , view rates and much more.
				</Modal.Body>
				<Modal.Footer>

					<Button
						themeType="accent"
						onClick={() => { setShowLogin(true); setShow(false); }}
					>
						Login/Sign up
					</Button>
				</Modal.Footer>
			</Modal>

			<IdentifyUser show={showLogin} onClose={() => setShowLogin(false)} utm_medium="saved_routes" />
		</>
	);
}

export default Card;
