var WebSocketServer = require('ws');
var wss = new WebSocketServer.Server({port: 8080});
console.log('WebSocketServer started! Port 8080.')

var clients = [];

wss.on('connection', function(ws) {
	var id = clients.length;
	clients[id] = ws;
	console.log('Новое соединение N' + id);
	clients[id].send(JSON.stringify({type: 'greet', text: 'Приветствую тебя! Твой идентификатор ' + id, data: id}));
	for(var key in clients) {
		if(key != id) {
			clients[key].send(JSON.stringify({type: 'info', text: 'К нам присоединился N' + id}));
		}
	}
	ws.on('message', function(message) {
		console.log(`От пользователя N${id} новое сообщение: ${message}`);
		for(var key in clients) {
			if(key != id) {
				clients[key].send(JSON.stringify({type: 'message', text: message, author: id}));
			}
		}

	});
});