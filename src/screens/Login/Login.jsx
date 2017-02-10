import React from 'react';
import LoginForm from '../../components/Forms/LoginForm';


const Login = () => (
	<LoginForm onSubmit={(values) => {
		console.log('From submitted succesfully', values);
	}}/>
);

export default Login;
