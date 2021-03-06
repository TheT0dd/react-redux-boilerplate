import React from 'react';
import Navbar from 'react-bootstrap/lib/Navbar';
import Nav from 'react-bootstrap/lib/Nav';
import NavItem from 'react-bootstrap/lib/NavItem';
import NavDropdown from 'react-bootstrap/lib/NavDropdown';
import MenuItem from 'react-bootstrap/lib/MenuItem';

const Footer = () => (
	// Defaults:
	// fixedTop: false,
	// fixedBottom: false,
	// staticTop: false,
	// inverse: false,
	// fluid: false,
	// collapseOnSelect: false

	<Navbar inverse fluid fixedBottom>
		<Navbar.Text>
			Brand <sup>&copy;</sup> {new Date().getFullYear()}
		</Navbar.Text>
		<Nav>
			<NavItem eventKey={1} href="#">Link</NavItem>
			<NavItem eventKey={2} href="#">Link</NavItem>
			<NavDropdown eventKey={3} title="Dropdown" id="basic-nav-dropdown">
				<MenuItem eventKey={3.1}>Action</MenuItem>
				<MenuItem eventKey={3.2}>Another action</MenuItem>
				<MenuItem eventKey={3.3}>Something else here</MenuItem>
				<MenuItem divider />
				<MenuItem eventKey={3.3}>Separated link</MenuItem>
			</NavDropdown>
		</Nav>
	</Navbar>

);

export default Footer;
