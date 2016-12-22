import React, {Component, PropTypes} from 'react';

// Custom implementation of the isomorphic-style-loader
// withStyles function to bypass issue with babel-runtime
// missing plugin:
// https://github.com/kriasoft/isomorphic-style-loader/issues/5#issuecomment-171620472
export default (...styles) => {
	return (BaseComponent) => {
		return class StyledComponent extends Component {
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
