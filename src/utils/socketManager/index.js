import io from 'socket.io-client';
import { clientEvents, serverEvents } from './events';
import { BASE_URL } from '../../config/environment';

let _socket = io(BASE_URL),
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

function removeEventListener(eventName){
  _socket.off(eventName);
}

export { connect, disconnect, sendMessage, registerEvent, clientEvents, serverEvents, removeEventListener };
