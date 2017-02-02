import React, {Component, PropTypes} from 'react';

// Custom implementation of the isomorphic-style-loader
// withStyles function to bypass issue with babel-runtime
// missing plugin:
// https://github.com/kriasoft/isomorphic-style-loader/issues/5#issuecomment-171620472
export const withStyles = (...styles) => {
	return (BaseComponent) => {
		return class StyledComponent extends Component {

			// Get access to the context, so we may read insertCss
			// NOTE: if we omit contextTypes, context will be an empty object 
			static contextTypes = {
				insertCss: PropTypes.func.isRequired
			};

			componentWillMount() {
				this.removeCss = this.context.insertCss.apply(undefined, styles);
			}

			componentWillUnmount() {
				this.removeCss();
			}

			render() {
				return <BaseComponent {...this.props}/>;
			}
		};
	};
};

// Enables critical path CSS rendering
// https://github.com/kriasoft/isomorphic-style-loader
export const insertCss = (...styles) => {
	// eslint-disable-next-line no-underscore-dangle
	const removeCss = styles.map(x => x._insertCss());
	return () => {
		removeCss.forEach(f => f());
	};
};
