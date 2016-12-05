import { createStore, applyMiddleware } from 'redux';
import createLogger from 'redux-logger';
import createSaga from 'redux-saga';
import rootReducer from './reducers';
import rootSaga from './sagas';

const configureStore = () => {
	const middlewares = [];
	const sagaMiddleware = createSaga();
	middlewares.push(sagaMiddleware);
	if (process.env.NODE_ENV !== 'production') {
		middlewares.push(createLogger());
	}

	// Grab the state from a global injected into server-generated HTML
	const preloadedState = window.__PRELOADED_STATE__;

	const store = createStore(
		rootReducer,
		preloadedState, // server generated state
		applyMiddleware(...middlewares) // enhancer
	);

	sagaMiddleware.run(rootSaga);

	return store;
};

export default configureStore;
