import io from 'socket.io-client';

//TODO replace with process.env
const ENDPOINT = 'http://localhost:3005';

let _socket = io(ENDPOINT),
  _room;

function connect(room) {
  _socket.emit('join-room', room);
  _room = room;
}

function disconnect() {
  _socket.disconnect();
}

function sendMessage(eventName, obj) {
  _socket.emit('custom-message', _room, eventName, obj);
}

function registerEvent(callback, eventName) {
  _socket.on(eventName, (obj) => {
    callback(obj);
  });
}

export { connect, disconnect, sendMessage, registerEvent };
