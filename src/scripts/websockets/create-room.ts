import { createLobby } from '../lobby/create-lobby';
import { updateLobby } from '../lobby/update-lobby';

const create = (params: {
  message: string;
  roomCode: string;
  name: string;
}): void => {
  const { message, roomCode, name } = params;

  if (message) {
    console.log(message);
  }

  if (roomCode) {
    sessionStorage.setItem(
      'roomInfo',
      JSON.stringify({ roomCode, name, owner: true }),
    );

    createLobby(roomCode, name);
  }
};

const update = (params: { roomCode: string; participants: string[] }): void => {
  const { roomCode, participants } = params;
  updateLobby(roomCode, participants, true);
};

export const createRoom = (hostName: string, roomCode?: string): void => {
  if (!roomCode) {
    sessionStorage.removeItem('roomInfo');
  }
  const socket = new WebSocket(import.meta.env.VITE_WS_URL);

  socket.addEventListener('open', () => {
    if (roomCode) {
      socket.send(
        JSON.stringify({
          type: 'join',
          params: {
            roomCode,
            name: hostName,
          },
        }),
      );
    } else {
      socket.send(
        JSON.stringify({
          type: 'create',
          params: {
            name: hostName,
          },
        }),
      );
    }

    document.addEventListener(
      'leave-room',
      ({ detail }: CustomEventInit<string>) => {
        console.log({ detail });
        socket.send(
          JSON.stringify({
            type: 'leave',
            params: {
              roomCode: detail,
            },
          }),
        );
      },
    );
  });

  socket.addEventListener('message', (event) => {
    try {
      const obj = JSON.parse(event.data);
      const { type } = obj;
      switch (type) {
        case 'info':
          create(obj.params);
          break;
        case 'participant joined':
        case 'participant left':
          update(obj.params);
          break;
        case 'error':
          console.error(obj.params.message ?? { obj });
          break;
        default:
          throw new Error('Not sure what you expect me to do about that');
      }
    } catch (error) {
      console.error(error);
    }
  });
};
