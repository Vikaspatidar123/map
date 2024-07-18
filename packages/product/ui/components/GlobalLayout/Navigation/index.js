import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect, useRef, useState } from 'react';

import IdentifyUser from '../../IdentifyUser';

import MobileNav from './MobileNav';
import styles from './styles.module.css';
import UserMenu from './UserMenu';

import navigation from '@/commons/configuration/navigation.json';
import Logo from '@/public/images/cogomaps.svg';

function Navigation() {
	const router = useRouter();

	const [isOpen, setIsOpen] = useState(false);
	const [showLogin, setShowLogin] = useState(false);
	const navRef = useRef(null);

	useEffect(() => {
		const handleOutsideClick = (event) => {
			if (navRef.current && !navRef.current.contains(event.target)) {
				setIsOpen(false);
			}
		};

		document.addEventListener('click', handleOutsideClick);

		return () => {
			document.removeEventListener('click', handleOutsideClick);
		};
	}, [navRef]);

	return (
		<div ref={navRef}>
			<div className={styles.container}>
				<Logo onClick={() => router.push('/', '/')} className={styles.logo} />
				<button
					className={[styles.nav_icon, isOpen ? styles.open : ''].join(' ')}
					onClick={() => setIsOpen((s) => !s)}
				>
					<span />
					<span />
					<span />
					<span />
				</button>

				<div style={{ display: 'flex', alignItems: 'center' }}>
					<ul className={`${styles.nav_links}`}>
						{navigation.map((nav) => {
							const isActive = router.route.split('/')[1] === nav.href.split('/')[1];
							return (
								<li
									key={nav.href}
									className={`${styles.navigation_link} ${isActive ? styles.active : ''}`}
								>
									<Link
										key={nav.as}
										href={nav.href}
									>
										{nav.label}
									</Link>
								</li>
							);
						})}
					</ul>
					<UserMenu
						setShowLogin={setShowLogin}
						showLogin={showLogin}
					/>
				</div>
			</div>
			<IdentifyUser
				show={showLogin}
				onClose={() => setShowLogin(false)}
			/>
			<MobileNav
				isOpen={isOpen}
				setIsOpen={setIsOpen}
				router={router}
				setShowLogin={setShowLogin}
			/>
		</div>
	);
}

export default Navigation;
