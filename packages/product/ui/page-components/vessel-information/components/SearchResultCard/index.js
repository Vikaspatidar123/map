import { Loader, Pagination } from '@cogoport/components';
import { IcMOverview } from '@cogoport/icons-react';

import useDeleteVessel from '../../hooks/deleteVessel';

import Card from './Card';
import styles from './styles.module.css';

export default function SearchResultCard(props) {
	const {
		searchText = '',
		vesselsList = [],
		searchLoading = true,
		setShowModal = () => {},
		setModalIMO = () => {},
		refreshList = () => {},
		pagination = 1,
		setPagination = () => {},
		isAdmin = false,
	} = props;

	const { deleteVessel } = useDeleteVessel(refreshList);

	if (searchLoading) {
		return (
			<div className={styles.main_container}>
				<div className={styles.sub_container}>
					<div className={styles.rows_container}>
						<div className={styles.column_data}>
							<Loader className={styles.loader} />
						</div>
					</div>
				</div>
			</div>
		);
	}

	return (
		<div className={styles.main_container}>
			<div className={styles.sub_container}>
				<div className={styles.rows_container}>
					<div className={styles.column_data}>
						{
							vesselsList?.list?.length === 0
								? (
									<div className={styles.empty_card}>
										<IcMOverview className={styles.empty_icon} />
										<p className={styles.empty_text}>No data found</p>
										<p>{searchText}</p>
									</div>
								)
								: vesselsList?.list?.map((item) => (
									<Card
										key={item.id}
										{...item}
										setShowModal={setShowModal}
										setModalIMO={setModalIMO}
										deleteVessel={deleteVessel}
										isAdmin={isAdmin}
									/>
								))
						}
					</div>
				</div>
				<Pagination
					type="compact"
					currentPage={pagination}
					totalItems={vesselsList?.total_count || 1}
					pageSize={10}
					onPageChange={setPagination}
				/>
			</div>
		</div>
	);
}
