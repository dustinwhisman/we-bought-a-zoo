export const initializeSocket = (): void => {
  const socket = new WebSocket(import.meta.env.VITE_WS_URL);

  socket.addEventListener('open', () => {
    socket.send('Hello Server!');
  });

  socket.addEventListener('message', (event) => {
    console.log('Message from server: ', event.data);
  });
};
