export const initializeSocket = (): void => {
  const socket = new WebSocket('ws://localhost:8080');

  socket.addEventListener('open', () => {
    socket.send('Hello Server!');
  });

  socket.addEventListener('message', (event) => {
    console.log('Message from server: ', event.data);
  });
};
