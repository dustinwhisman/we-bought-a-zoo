import { createLobby } from '../lobby/create-lobby';

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
      if (type === 'info') {
        const {
          message,
          roomCode,
          hostName,
        }: { message: string; roomCode: string; hostName: string } = obj.params;

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
      }
    } catch (error) {
      console.error(error);
    }
  });
};
