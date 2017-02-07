/*
 * Simple socket.io development server to be
 * run concurrently with weback-dev-server
 */

var http = require('http').createServer();
var io = require('socket.io')(http);

// listen for new connections
io.on('connection', function(socket) {
	// greet
	socket.emit('MESSAGE_SEND', {text: 'ahoy'});
	// listen for 'dummy' incoming events & send back ack
	socket.on('dummy', function(data, fn) {
		fn({ text:'Dummy request received' });
	});
});

var PORT = process.env.PORT || 8080;

http.listen(PORT, () => {
	console.log('Socket.io server running at localhost:' + PORT);
});
