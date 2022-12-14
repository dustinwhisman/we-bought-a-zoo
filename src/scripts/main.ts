import { createRoom } from './websockets/create-room';
import { joinRoom } from './websockets/join-room';

interface CreateRoomFormElements extends HTMLFormControlsCollection {
  hostName: HTMLInputElement;
}

interface JoinRoomFormElements extends HTMLFormControlsCollection {
  roomCode: HTMLInputElement;
  playerName: HTMLInputElement;
}

const roomInfo = sessionStorage.getItem('roomInfo');
if (roomInfo != null) {
  const { roomCode, name, owner } = JSON.parse(roomInfo);
  if (owner) {
    createRoom(name, roomCode);
  } else {
    joinRoom(roomCode, name, false);
  }
}

document.addEventListener('submit', (event) => {
  event.preventDefault();
  const element = event.target as HTMLFormElement | null;
  if (element?.matches('[data-action="create-game"]')) {
    const hostName = (element.elements as CreateRoomFormElements).hostName
      .value;
    createRoom(hostName);
  }

  if (element?.matches('[data-action="join-game"]')) {
    const roomCode = (
      element.elements as JoinRoomFormElements
    ).roomCode.value.toLowerCase();
    const playerName = (element.elements as JoinRoomFormElements).playerName
      .value;
    joinRoom(roomCode, playerName, true);
  }
});
