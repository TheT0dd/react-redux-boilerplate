import React, { Component } from 'react';

// Provider needed for isomorphic-style-loader
class InsertCss extends Component {
	getChildContext() {
		return {
			insertCss: (styles) => styles._insertCss()
		};
	}

	render() {
		const { children } = this.props;
		return <div>{children}</div>;
	}
}

InsertCss.childContextTypes = {
	insertCss: React.PropTypes.func
};

export default InsertCss;
