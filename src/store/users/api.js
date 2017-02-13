import { sendSocketRequest } from '../../helpers/socket.io';

export const authRequest = ({ username, password, token }) =>
	sendSocketRequest('auth', { username, password, token });
