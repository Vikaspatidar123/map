import React, { useState } from 'react';
import { useSelector } from 'react-redux';

import useGetVesselList from '../hooks/getVesselList';

import Heading from './heading';
import SearchBox from './SearchBox';
import SearchResultCard from './SearchResultCard';
import styles from './styles.module.css';
import VesselModal from './VesselModal';

function VesselInformation() {
	const [searchText, setSearchText] = useState();
	const { getVesselList, vesselsList, searchLoading, pagination, setPagination } = useGetVesselList(searchText);
	const [showModal, setShowModal] = useState(true);
	const [modalIMO, setModalIMO] = useState();

	const { isLogged, user } = useSelector(({ profile }) => profile);
	const isAdmin = isLogged && user.id === '039a0141-e6f3-43b0-9c51-144b22b9fc84';
	const refreshList = () => {
		getVesselList();
	};

	return (
		<div className={styles.universal_container}>
			<Heading
				setShowModal={setShowModal}
				isAdmin={isAdmin}
			/>
			<SearchBox
				searchText={searchText}
				setSearchText={setSearchText}
			/>
			<SearchResultCard
				searchLoading={searchLoading}
				vesselsList={vesselsList}
				searchText={searchText}
				setShowModal={setShowModal}
				setModalIMO={setModalIMO}
				refreshList={refreshList}
				pagination={pagination}
				setPagination={setPagination}
				isAdmin={isAdmin}
			/>
			{
				showModal.length > 0 && (
					<VesselModal
						showModal={showModal}
						setShowModal={setShowModal}
						modalIMO={modalIMO}
						setModalIMO={setModalIMO}
						refreshList={refreshList}
						isAdmin={isAdmin}
					/>
				)
			}
		</div>
	);
}

export default VesselInformation;
