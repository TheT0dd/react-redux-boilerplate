import React from 'react';
import Navbar from 'react-bootstrap/lib/Navbar';
import Nav from 'react-bootstrap/lib/Nav';
import NavItem from 'react-bootstrap/lib/NavItem';
import NavDropdown from 'react-bootstrap/lib/NavDropdown';
import MenuItem from 'react-bootstrap/lib/MenuItem';
import { LinkContainer } from 'react-router-bootstrap';
import NavLink from '../../components/NavLink';

const Header = () => (
	// Defaults:
	// fixedTop: false,
	// fixedBottom: false,
	// staticTop: false,
	// inverse: false,
	// fluid: false,
	// collapseOnSelect: false

	<Navbar fluid fixedTop>
		<Navbar.Header>
			<Navbar.Brand>
				<NavLink to="/" onlyActiveOnIndex={true}>React Boiler</NavLink>
			</Navbar.Brand>
			<Navbar.Toggle />
		</Navbar.Header>
		<Navbar.Collapse>
			<Nav>
				{/*
				Wrap any React-Bootstrap element in a <LinkContainer> to
				make it behave like a React Router <Link>:
				*/}
				<LinkContainer to="/" onlyActiveOnIndex={true}>
					<NavItem eventKey={1}>Home</NavItem>
				</LinkContainer>
				<LinkContainer to="/about">
					<NavItem eventKey={2}>About</NavItem>
				</LinkContainer>
				<NavDropdown eventKey={4} title="Dropdown" id="basic-nav-dropdown">
					<LinkContainer to="/" onlyActiveOnIndex={true}>
						<MenuItem eventKey={4.1}>Home</MenuItem>
					</LinkContainer>
					<LinkContainer to="/about">
						<MenuItem eventKey={4.2}>About</MenuItem>
					</LinkContainer>
					<MenuItem eventKey={4.3}>Another action</MenuItem>
					<MenuItem divider />
					<MenuItem eventKey={4.4}>Separated link</MenuItem>
				</NavDropdown>
			</Nav>
			<Nav pullRight>
				<LinkContainer to="/login">
					<NavItem eventKey={1}>Login</NavItem>
				</LinkContainer>
				<NavItem eventKey={2} href="#">Link Right</NavItem>
			</Nav>
		</Navbar.Collapse>
	</Navbar>
);

export default Header;
