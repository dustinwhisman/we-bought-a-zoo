export const updateLobby = (
  roomCode: string,
  participants: string[],
  isHost: boolean,
): void => {
  const gameContentElement = document.querySelector('#gameContent');
  if (!gameContentElement) {
    return;
  }

  gameContentElement.innerHTML = `
    <h2>Room Code: ${roomCode.toUpperCase()}</h2>
    ${
      isHost
        ? `<p>
      You are the host and auctioneer. Once everybody is in, start the game to
      let the bidding begin!
    </p>`
        : `<p>
      Hang tight, the host will start the auction once everyone is in!
    </p>`
    }
    <p>
      ${participants.length} of 8 spots filled
    </p>
    <ul class="cmp-lineup">
      ${participants
        .map(
          (participant) => `
        <li>${participant}</li>
      `,
        )
        .join('')}
      ${Array.from({ length: 8 - participants.length }, (_, i) => i)
        .map(() => `<li>&nbsp;</li>`)
        .join('')}
    </ul>
    ${
      isHost && participants.length >= 3
        ? `<button type="button" data-action="start-game">Start Game</button>`
        : ''
    }
  `;
};
