import React, { PureComponent, PropTypes } from 'react';
import { Provider } from 'react-redux';
import { Router, browserHistory } from 'react-router';
import Routes from './components/Routes/index';

class App extends PureComponent {

	static propTypes = {
		context: PropTypes.shape({
			insertCss: PropTypes.func.isRequired,
			store: PropTypes.shape({
				subscribe: PropTypes.func.isRequired,
				dispatch: PropTypes.func.isRequired,
				getState: PropTypes.func.isRequired
			}).isRequired
		})
	}

	static childContextTypes = {
		insertCss: React.PropTypes.func
	}

	getChildContext() {
		const { insertCss } = this.props.context;
		return { insertCss };
	}

	render() {
		const { store } = this.props.context;
		return (
			<Provider store={store}>
				<Router routes={Routes} history={browserHistory} />
			</Provider>
		);
	}
}

export default App;
