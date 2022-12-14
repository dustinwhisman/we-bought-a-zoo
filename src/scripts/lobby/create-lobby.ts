export const createLobby = (roomCode: string, hostName: string): void => {
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
      1 of 8 spots filled
    </p>
    <ul class="cmp-lineup">
      <li>
        ${hostName}
      </li>
      <li>&nbsp;</li>
      <li>&nbsp;</li>
      <li>&nbsp;</li>
      <li>&nbsp;</li>
      <li>&nbsp;</li>
      <li>&nbsp;</li>
      <li>&nbsp;</li>
    </ul>
  `;
};
