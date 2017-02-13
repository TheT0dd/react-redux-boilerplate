import React, {Component} from 'react';
import { Field, reduxForm } from 'redux-form';
import Button from 'react-bootstrap/lib/Button';
import { renderField, renderTextarea } from '../helpers';
import { required, email, minLength } from '../validators';


const LoginForm = ({ handleSubmit, pristine, reset, submitting }) => (
	<form onSubmit={handleSubmit}>
		<Field
			name="username"
			type="text"
			component={renderField}
			label="Username"
			validate={[ required, email ]}/>
		<Field
			name="password"
			type="password"
			component={renderField}
			label="Password"
			validate={[ required ]} />
		<div>
			<Button type="submit" bsStyle="primary" disabled={pristine || submitting}>Submit</Button>
			<Button type="button" disabled={pristine || submitting} onClick={reset}>Clear Values</Button>
		</div>
	</form>
);


export default reduxForm({
	form: 'login' // a unique identifier for this form
})(LoginForm);
