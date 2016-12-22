import React from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import styles from './MyButton.less';

const MyButton = () => (
	<button className={styles.myButton}>My Button</button>
);

export default withStyles(styles)(MyButton);
