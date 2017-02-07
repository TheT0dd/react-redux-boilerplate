import { createStore, applyMiddleware, compose } from 'redux';
import createLogger from 'redux-logger';
import createSaga from 'redux-saga';
import rootReducer from './reducers';
import rootSaga from './sagas';
import { socket, addSocketListeners } from '../helpers/socket.io';

export const configureStore = () => {
	const middlewares = [];

	const sagaMiddleware = createSaga();
	middlewares.push(sagaMiddleware);
	if (process.env.NODE_ENV !== 'production') {
		middlewares.push(createLogger());
	}

	// Grab the state from a global injected into server-generated HTML
	const preloadedState = window.__PRELOADED_STATE__;

	// for chrome devtools to work
	const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

	const store = createStore(
		// the root reducer
		rootReducer,
		// server generated state
		preloadedState,
		// enhancer (middleware composition)
		composeEnhancers(
			applyMiddleware(...middlewares)
		)
	);

	sagaMiddleware.run(rootSaga);

	// start listening for socket emitions
	addSocketListeners(store.dispatch, store.getState);

	return store;
};
