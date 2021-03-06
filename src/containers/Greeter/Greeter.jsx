import React from 'react';
import Jumbotron from 'react-bootstrap/lib/Jumbotron';
import Button from 'react-bootstrap/lib/Button';
import { connect } from 'react-redux';
import { showModal, hideModal } from '../../store/modal/actions';

import MyButton from '../../components/MyButton';

let Greeter = ({ dispatch, title }) => {

	const handleShow = () => {
		dispatch(showModal({
			modalType: 'GREET_MODAL',
			modalProps: {
				title: 'Hi there!'
			}
		}));
	};

	return (
		<Jumbotron>
			<h1>{title}</h1>
			<p>
				This is a boilerplate app using React, Redux, React Router and React Bootstrap.
			</p>
			<p>
				Async actions are handled with <a href="https://github.com/yelouafi/redux-saga">sagas</a>, which are preferred for their testability, but can be easily swapped with <a href="https://github.com/redux-observable/redux-observable">observables</a> or <a href="https://github.com/gaearon/redux-thunk">thunks</a>.
			</p>
			<p>
				It also ships with a simple production-like server that supports vanilla server-side
				rendering.
			</p>
			<p>
				<Button bsStyle="default" onClick={handleShow}>
					Show Greet Modal
				</Button>
			</p>
			<p>
				<MyButton />
			</p>
		</Jumbotron>
	);
};

// Don' subscribe to store, just pass dispatch into props
Greeter = connect()(Greeter);

export default Greeter;
