import React from 'react';
import Header from './Header';
import MainBody from './MainBody';
import Footer from './Footer';
import ModalRoot from './ModalRoot';

const Layout = (props) => (
	<div>
		<Header />
		<MainBody>{props.children}</MainBody>
		<Footer />
		<ModalRoot />
	</div>
);

export default Layout;
