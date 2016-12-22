import React from 'react';
import withStyles from 'decorators/withStyles';
import s from './MyButton.less';

const MyButton = () => (
	<button className={s.myButton}>My Button</button>
);

export default withStyles(s)(MyButton);
