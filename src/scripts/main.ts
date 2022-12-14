import { createRoom } from './websockets/create-room';

interface CreateRoomFormElements extends HTMLFormControlsCollection {
  hostName: HTMLInputElement;
}

document.addEventListener('submit', (event) => {
  event.preventDefault();
  const element = event.target as HTMLFormElement | null;
  if (element?.matches('[data-action="create-game"]')) {
    const hostName = (element.elements as CreateRoomFormElements).hostName
      .value;
    createRoom(hostName);
  }
});
