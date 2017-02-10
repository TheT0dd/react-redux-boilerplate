import React, {Component} from 'react';
import { Field, reduxForm } from 'redux-form';
import Button from 'react-bootstrap/lib/Button';
import { renderField, renderTextarea } from '../helpers';

const validate = values => {
	const errors = {};
	if (!values.email) {
		errors.email = 'Required';
	} else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
		errors.email = 'Invalid email address';
	}
	return errors;
};


const LoginForm = ({ handleSubmit, pristine, reset, submitting }) => (
	<form onSubmit={handleSubmit}>
		<Field name="username" type="text" component={renderField} label="Username"/>
		<Field name="email" type="text" component={renderField} label="Email"/>
		<Field name="bio" component={renderTextarea} label="Bio"/>
		<div>
			<Button type="submit" bsStyle="primary" disabled={pristine || submitting}>Submit</Button>
			<Button type="button" disabled={pristine || submitting} onClick={reset}>Clear Values</Button>
		</div>
	</form>
);


export default reduxForm({
	form: 'login',  // a unique identifier for this form
	validate
})(LoginForm);
