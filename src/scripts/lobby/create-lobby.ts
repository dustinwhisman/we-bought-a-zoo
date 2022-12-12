export const createLobby = (roomCode: string): void => {
  const gameContentElement = document.querySelector('#gameContent');
  if (!gameContentElement) {
    return;
  }

  gameContentElement.innerHTML = `
    <h2>Room Code: ${roomCode.toUpperCase()}</h2>
    <p>
      You are the host and auctioneer. Once everybody is in, start the game to
      let the bidding begin!
    </p>
    <p>
      0 of 7 spots filled
    </p>
  `;
};
