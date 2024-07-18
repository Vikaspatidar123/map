import Link from 'next/link';

import Menu from '../../../DocsLayout/StartBar/Menu';
import {
	nav_links_mobile, hide_nav, list_container, list_item, active,
} from '../styles.module.css';

import ProfileSection from './ProfileSection';

import navigation from '@/commons//configuration/navigation.json';

function MobileNav({
	isOpen, setIsOpen, router, setShowLogin,
}) {
	const onLinkClick = () => setIsOpen((s) => !s);

	return (
		<div className={`${nav_links_mobile} ${!isOpen ? hide_nav : ''}`}>
			<ProfileSection
				setShowLogin={setShowLogin}
				onLinkClick={onLinkClick}
			/>
			<ul className={list_container}>
				{navigation.map(({
					type = '', href = '', options = [], label = '',
				}) => {
					const isActive = [router?.route].includes(href);
					return (
						<li
							key={label}
							className={`${list_item} ${isActive ? active : ''}`}
						>
							{type === 'link' && (
								<Link href={href} passHref>
									<a href="replace" onClick={onLinkClick}>
										{label}
									</a>
								</Link>
							)}
							{type === 'menu' && (
								<Menu label={label} options={options} showActive={false} onClickLink={onLinkClick} />
							)}
						</li>
					);
				})}
			</ul>
		</div>
	);
}

export default MobileNav;
