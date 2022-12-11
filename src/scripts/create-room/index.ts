export const createRoom = (): void => {
  const socket = new WebSocket(import.meta.env.VITE_WS_URL);

  socket.addEventListener('open', () => {
    socket.send(
      JSON.stringify({
        type: 'create',
      }),
    );
  });

  socket.addEventListener('message', (event) => {
    try {
      const obj = JSON.parse(event.data);
      const { message, roomCode }: { message: string; roomCode: string } =
        obj.params;

      if (message) {
        console.log(message);
      }

      if (roomCode) {
        sessionStorage.setItem(
          'roomInfo',
          JSON.stringify({ roomCode, owner: true }),
        );
      }
    } catch (error) {
      console.error(error);
    }
  });
};
