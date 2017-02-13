import { sendSocketRequest } from '../../helpers/socket.io';

export const authRequest = ({ email, password }) =>
	sendSocketRequest('auth', { email, password });
