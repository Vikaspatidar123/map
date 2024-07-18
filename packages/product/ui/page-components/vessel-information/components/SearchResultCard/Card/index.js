import { Button, Carousel } from '@cogoport/components';
import { IcAShipAmber, IcMDelete } from '@cogoport/icons-react';
import React from 'react';

import styles from './styles.module.css';

function Card(props) {
	const {
		imo = '', name = '', vessel_image_urls = [], operator = {}, meta_data = [], setShowModal = () => {}, setModalIMO = () => {}, deleteVessel = () => {}, isAdmin = false,
	} = props;

	function pascalToWords(pascalCase) {
		const txt = pascalCase.replace(/[A-Z]/g, (match) => ` ${match[0].toUpperCase()}${match.substring(1).toLowerCase()}`);
		return `${txt[0].toUpperCase()}${txt.substring(1)}`;
	}
	const avoidMetaData = ['typeColor', 'typeSpecificId'];

	const CAROUSELDATA = vessel_image_urls?.map((url, index) => ({
		key    : `vessel_image${index}`,
		render : () => (<img src={url} alt="vessel" width="250" />),
	}));

	const openModal = () => {
		setModalIMO(imo);
		setShowModal('edit_vessel');
	};
	return (
		<div className={styles.main_container}>
			{
				Object.keys(operator).length > 0 && (
					<div className={styles.logo_data}>
						<a href={operator?.web_url} target="_blank" rel="noreferrer">
							<p className={styles.logo_name}>
								<img src={operator?.logo_url} width="75" alt="logo" />
								<span className={styles.operator_short_name}>{operator?.business_name}</span>
								<span className={styles.operator_full_name}>{`(${operator?.short_name})`}</span>
							</p>
						</a>
					</div>
				)
			}
			<div className={styles.main_data}>
				<p>
					<span className={styles.main_data_value}>IMO: </span>
					<span className={styles.main_data_key}>{imo}</span>
				</p>
				<p>
					<span className={styles.main_data_value}>NAME: </span>
					<span className={styles.main_data_key}>{name}</span>
				</p>
			</div>
			<div className={styles.meta_data}>
				{
					meta_data && meta_data.length > 0
						? meta_data?.map(({ source = '', data = {} }) => (
							<div className={styles.meta_data_item} key={source}>
								<div className={styles.meta_data_item_left}>
									{
										vessel_image_urls && vessel_image_urls.length > 0
											? <Carousel size="md" slides={CAROUSELDATA} autoScroll timeInterval={200} />
											:										(
												<IcAShipAmber className={styles.ship_icon} />
											)
									}

								</div>
								<div className={styles.meta_data_item_right}>
									{Object.keys(data).map((key) => (data[key] && !avoidMetaData?.includes(key) && (
										<p key={key} className={styles.meta_data_item_right_items}>
											<span className={styles.meta_value}>
												{`${pascalToWords(key)}: `}
											</span>
											{`${data[key]}`}
										</p>
									)))}
								</div>
							</div>
						))
						: (
							<div className={styles.meta_data_empty_item}>
								No meta data
							</div>
						)
				}
			</div>
			{
				isAdmin && (
					<div className={styles.footer_data}>
						<div className={styles.footer_left} />
						<div className={styles.footer_right}>
							<Button className={styles.edit_button} onClick={openModal}>Edit</Button>
							<IcMDelete className={styles.delete_icon} onClick={() => deleteVessel(imo)} />
						</div>
					</div>
				)
			}
		</div>
	);
}

export default Card;
