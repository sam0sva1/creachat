var board = document.querySelector('.board');
var ws = new WebSocket('ws://localhost:8080');
ws.onmessage = function(e) {
	console.log('Новое сообщение: ' + e.data);
	var message = JSON.parse(e.data);
	var text = '';
	switch(message.type) {
		case('greet'): {
			boarding(messageWrapper(message.text, message.type));
			break;
		}
		case('info'): {
			boarding(messageWrapper(message.text, message.type));
			break;
		}
		case('message'): {
			boarding(messageWrapper(message.text, st.other, st.msg));
			break;
		}
	}
}
document.forms.push.onsubmit = function() {
	var msg = this.message.value;
	ws.send(msg);
	boarding(messageWrapper(msg, st.own, st.msg));
	this.message.value = '';
	return false;
}

function messageWrapper(text, className, opt_class) {
	var elem = document.createElement('div');
	elem.classList.add(opt_class);
	elem.classList.add(className);
	elem.innerHTML = text;
	return elem;
}

function boarding(element) {
	board.appendChild(element);
}

st = {
	greet: 'greet',
	msg: 'message',
	own: 'board__owner-message',
	other: 'board__other-message'
}