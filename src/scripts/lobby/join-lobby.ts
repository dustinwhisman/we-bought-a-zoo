export const joinLobby = (roomCode: string, participants: string[]): void => {
  const gameContentElement = document.querySelector('#gameContent');
  if (!gameContentElement) {
    return;
  }

  gameContentElement.innerHTML = `
    <h2>Room Code: ${roomCode.toUpperCase()}</h2>
    <p>
      Hang tight, the host will start the auction once everyone is in!
    </p>
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
  `;
};
