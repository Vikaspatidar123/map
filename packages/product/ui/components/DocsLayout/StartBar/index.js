import Link from 'next/link';
import { useRouter } from 'next/router';
import { useRef } from 'react';

import Menu from './Menu';
import styles from './styles.module.css';

import useOutsideClick from '@/commons/hooks/useOutsideClick';

function StartBar({
	className,
	style,
	nav = [],
	onClickLink = () => {},
	mobileShow = false,
	isMobile = false,
}) {
	const router = useRouter();
	const navRef = useRef(null);

	useOutsideClick(navRef, onClickLink);

	return (
		<nav
			style={style}
			className={`
				${styles.container}
				${className}
				${mobileShow ? styles.mobile_show : ''}
			`}
			ref={isMobile ? navRef : null}
		>
			<div className={styles.inner_container}>
				<ul className={styles.list_container}>
					{nav.map(({
						label = '', href = '', options = [], type = '',
					}) => {
						const isActive = [router?.route].includes(href);
						return (
							<li
								key={label}
								className={`
										${styles.list_item}
										${isActive ? styles.active : ''}
									`}
							>
								{type === 'link' ? (
									<Link href={href} passHref>
										<a onClick={onClickLink} href="replace">
											{label}
										</a>
									</Link>
								) : null}
								{type === 'heading' ? <p>{label}</p> : null}
								{type === 'menu' ? (
									<Menu label={label} options={options} onClickLink={onClickLink} />
								) : null}
							</li>
						);
					})}
				</ul>
			</div>
		</nav>
	);
}

export default StartBar;
