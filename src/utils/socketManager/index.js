import io from 'socket.io-client';
import { clientEvents, serverEvents } from './events';

// const ENDPOINT = 'https://atel-back-stg.herokuapp.com/';
const ENDPOINT = 'http://localhost:3005';

let _socket = io(ENDPOINT),
  _room;

function connect(room) {
  _socket.emit(serverEvents.joinRoom, room);
  _room = room;
}

function disconnect() {
  _socket.disconnect();
}

function sendMessage(eventName, obj) {
  _socket.emit(serverEvents.customMessage, _room, eventName, obj);
}

function registerEvent(callback, eventName) {
  _socket.on(eventName, (obj) => {
    callback(obj);
  });
}

export { connect, disconnect, sendMessage, registerEvent, clientEvents, serverEvents };
