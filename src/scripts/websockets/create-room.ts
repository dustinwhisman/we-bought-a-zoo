import { createLobby } from '../lobby/create-lobby';

export const createRoom = (): void => {
  sessionStorage.removeItem('roomInfo');
  const socket = new WebSocket(import.meta.env.VITE_WS_URL);

  socket.addEventListener('open', () => {
    socket.send(
      JSON.stringify({
        type: 'create',
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
      const { message, roomCode }: { message: string; roomCode: string } =
        obj.params;

      if (type === 'info') {
        if (message) {
          console.log(message);
        }

        if (roomCode) {
          sessionStorage.setItem(
            'roomInfo',
            JSON.stringify({ roomCode, owner: true }),
          );

          createLobby(roomCode);
        }
      }
    } catch (error) {
      console.error(error);
    }
  });
};
