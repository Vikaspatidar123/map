import { IcMArrowRight } from '@cogoport/icons-react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useState } from 'react';

import {
	sublist_item, active, menu, inner_list_container, menu_icon, active_icon, active_inner_list,
} from '../styles.module.css';

function Menu({
	label, options, onClickLink, showActive = true,
}) {
	const router = useRouter();
	const [isOpen, setIsOpen] = useState(false);
	return (
		<>
			<button className={menu} onClick={() => setIsOpen(!isOpen)}>
				{label}
				<IcMArrowRight className={[menu_icon, isOpen ? active_icon : ''].join(' ')} />
			</button>
			<ul className={[inner_list_container, isOpen ? active_inner_list : ''].join(' ')}>
				{options && options.map((item) => {
					const isActive = showActive && [router?.route].includes(item.href);
					return (
						<li
							key={item.label}
							className={`${sublist_item} ${isActive ? active : ''}`}
						>
							<Link href={item.href} passHref>
								<a onClick={onClickLink} href="replace">
									{item.label}
								</a>
							</Link>
						</li>
					);
				})}
			</ul>
		</>
	);
}

export default Menu;
