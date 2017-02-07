/*
 * Simple socket.io development server to be
 * run concurrently with weback-dev-server
 */

var http = require('http').createServer();
var io = require('socket.io')(http);

// greet all new connections
io.on('connection', function(socket) {
	socket.emit('MESSAGE_SEND', {text: 'ahoy'});
});

var PORT = process.env.PORT || 8080;

http.listen(PORT, () => {
	console.log('Production Express server running at localhost:' + PORT);
});
