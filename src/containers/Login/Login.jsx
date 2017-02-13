import React from 'react';
import LoginForm from '../../components/Forms/Login';
import { connect } from 'react-redux';
import { authRequest } from '../../store/users/actions';

let Login = ({ dispatch }) => {
	const handleSubmit = (values) => {
		dispatch(authRequest(values));
	};

	return (
		<LoginForm onSubmit={handleSubmit}/>
	);
};

Login = connect()(Login);

export default Login;
