import { joinLobby } from '../lobby/join-lobby';
import { updateLobby } from '../lobby/update-lobby';

const join = (params: {
  message: string;
  roomCode: string;
  name: string;
  participants: string[];
}): void => {
  const { message, roomCode, name, participants } = params;

  if (message) {
    console.log(message);
  }

  if (roomCode) {
    sessionStorage.setItem(
      'roomInfo',
      JSON.stringify({ roomCode, name, cash: 100, exhibits: [], owner: false }),
    );

    joinLobby(roomCode, participants);
  }
};

const update = (params: { roomCode: string; participants: string[] }): void => {
  const { roomCode, participants } = params;
  updateLobby(roomCode, participants, false);
};

export const joinRoom = (roomCode: string, name: string): void => {
  sessionStorage.removeItem('roomInfo');
  const socket = new WebSocket(import.meta.env.VITE_WS_URL);

  socket.addEventListener('open', () => {
    socket.send(
      JSON.stringify({
        type: 'join',
        params: {
          roomCode,
          name,
        },
      }),
    );

    document.addEventListener(
      'leave-room',
      ({ detail }: CustomEventInit<string>) => {
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
          join(obj.params);
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
