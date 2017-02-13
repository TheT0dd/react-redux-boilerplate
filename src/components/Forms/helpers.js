import React from 'react';
import FormControl from 'react-bootstrap/lib/FormControl';
import FormGroup from 'react-bootstrap/lib/FormGroup';
import HelpBlock from 'react-bootstrap/lib/HelpBlock';


const ValidationState = ({ touched, error, warning }) => (
	<div>
	{touched && ((error &&
		<HelpBlock><span className="text-danger">{error}</span></HelpBlock>
	) || (warning &&
		<HelpBlock><span className="text-warning">{warning}</span></HelpBlock>
	))}
	</div>
);

export const renderField = ({
	input,
	label,
	type,
	meta
}) => (
	<FormGroup>
		<label>{label}</label>
		<FormControl {...input} placeholder={label} type={type} />
		<ValidationState {...meta} />
	</FormGroup>
);

export const renderTextarea = ({
	input,
	label,
	meta
}) => (
	<FormGroup>
		<label>{label}</label>
		<FormControl componentClass="textarea" {...input} placeholder={label} />
		<ValidationState {...meta} />
	</FormGroup>
);
