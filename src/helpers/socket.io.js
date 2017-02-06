import io from 'socket.io-client';

// create socket & export it for other modules to import
export const socket = io();

// socket.io event listeners are installed here
export const addSocketListeners = (dispatch, getState) => {
	socket.on('MESSAGE_SEND', data => {
		console.log('message received from server', data);
		/*
		 * Sometimes you just want to do a simple normal
		 * thing like dispatching a certain action when
		 * a certain event occurs.
		 */
		dispatch({type: 'SOME_ACTION', data: data});
	});

	socket.on('dispatch', action => {
		/*
		 * If I wanted to send certain events directly through
		 * to the dispatch method without defining specific
		 * listeners for each one, I can use the 'dispatch'
		 * event type to do it
		 */
		dispatch(action);
	});
};
