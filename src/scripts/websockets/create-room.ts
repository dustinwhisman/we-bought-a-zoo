import { createLobby } from '../lobby/create-lobby';
import { updateLobby } from '../lobby/update-lobby';

const create = (params: {
  message: string;
  roomCode: string;
  hostName: string;
}): void => {
  const { message, roomCode, hostName } = params;

  if (message) {
    console.log(message);
  }

  if (roomCode) {
    sessionStorage.setItem(
      'roomInfo',
      JSON.stringify({ roomCode, hostName, owner: true }),
    );

    createLobby(roomCode, hostName);
  }
};

const update = (params: { roomCode: string; participants: string[] }): void => {
  const { roomCode, participants } = params;
  updateLobby(roomCode, participants, true);
};

export const createRoom = (hostName: string): void => {
  sessionStorage.removeItem('roomInfo');
  const socket = new WebSocket(import.meta.env.VITE_WS_URL);

  socket.addEventListener('open', () => {
    socket.send(
      JSON.stringify({
        type: 'create',
        params: {
          hostName,
        },
      }),
    );

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
