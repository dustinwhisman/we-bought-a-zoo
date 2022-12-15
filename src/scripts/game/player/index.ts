export const setupPlayerGameEventListeners = (socket: WebSocket): void => {
  document.addEventListener('submit', (event) => {
    const element = event.target as HTMLFormElement | null;
    if (element?.matches('[data-action="submit-bid"]')) {
      socket.send(
        JSON.stringify({
          type: 'bid submitted',
        }),
      );
    }
  });
};

export const showWaitingScreen = (): void => {
  const gameContentElement = document.querySelector('#gameContent');
  if (!gameContentElement) {
    return;
  }

  gameContentElement.innerHTML = `
    <p>
      Just a moment. Please wait while the host chooses the next animal exhibit to auction.
    </p>
  `;
};
