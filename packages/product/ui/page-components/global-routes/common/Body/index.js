import styles from './styles.module.css';
import Waypoint from './Waypoint';

function Body({ actualWaypts, heading, service_type }) {
	return (
		<div className={styles.container}>
			{heading && <h3 className={styles.heading}>{heading}</h3>}
			{actualWaypts.map((pt, i) => {
				const isLast = i === actualWaypts.length - 1;
				return (
					<Waypoint
						key={pt.id}
						display_name={pt.display_name}
						name={pt.name}
						isLast={isLast}
						order={i + 1}
						service_type={service_type}
					/>
				);
			})}
		</div>
	);
}

export default Body;
