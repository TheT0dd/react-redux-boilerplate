import React from 'react';
import Grid from 'react-bootstrap/lib/Grid';

const MainBody = (props) => (
	<Grid fluid>
		<div className="main-body">
			{props.children}
		</div>
	</Grid>
);

export default MainBody;
