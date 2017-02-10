import React from 'react';
import FormControl from 'react-bootstrap/lib/FormControl';
import FormGroup from 'react-bootstrap/lib/FormGroup';
import HelpBlock from 'react-bootstrap/lib/HelpBlock';

export const renderField = ({
	input,
	label,
	type,
	meta: { touched, error, warning }
}) => (
	<FormGroup>
		<label>{label}</label>
		<FormControl {...input} placeholder={label} type={type} />
		{touched && ((error &&
			<HelpBlock><span className="text-danger">{error}</span></HelpBlock>
		) || (warning &&
			<HelpBlock><span className="text-warning">{warning}</span></HelpBlock>
		))}
	</FormGroup>
);

export const renderTextarea = ({
	input,
	label,
	meta: { touched, error, warning }
}) => (
	<FormGroup>
		<label>{label}</label>
		<FormControl componentClass="textarea" {...input} placeholder={label} />
		{touched && ((error &&
			<HelpBlock><span className="text-danger">{error}</span></HelpBlock>
		) || (warning &&
			<HelpBlock><span className="text-warning">{warning}</span></HelpBlock>
		))}
	</FormGroup>
);
