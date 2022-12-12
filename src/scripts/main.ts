import { createRoom } from './websockets/create-room';

document.addEventListener('click', (event) => {
  const element = event.target as Element | null;
  if (element?.matches('[data-action="create-game"]')) {
    createRoom();
  }
});
