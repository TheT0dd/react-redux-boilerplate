import React, { PureComponent, PropTypes } from 'react';
import { Provider } from 'react-redux';

class App extends PureComponent {

	static propTypes = {
		context: PropTypes.shape({
			insertCss: PropTypes.func.isRequired,
			store: PropTypes.shape({
				subscribe: PropTypes.func.isRequired,
				dispatch: PropTypes.func.isRequired,
				getState: PropTypes.func.isRequired
			}).isRequired
		}),
		children: PropTypes.element
	}

	// Declare we are about to store insertCss into context
	static childContextTypes = {
		insertCss: React.PropTypes.func
	}

	// Actually store insertCss into context
	getChildContext() {
		const { insertCss } = this.props.context;
		return { insertCss };
	}

	render() {
		const { context: { store }, children } = this.props;
		return (
			// Provider component takes the store as a prop
			// and stores it in context, making it available
			// to any components that wish to connect to it
			// (see connect() from 'react-redux')
			<Provider store={store}>
				{children}
			</Provider>
		);
	}
}

export default App;
