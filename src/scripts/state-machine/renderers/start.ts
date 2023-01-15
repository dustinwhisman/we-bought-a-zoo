export const renderStart = (): void => {
  const gameContentElement = document.querySelector('#gameContent');
  if (!gameContentElement) {
    return;
  }

  gameContentElement.innerHTML = `
    <p>
      Each player starts with $100 of fictional money and secretly bids on
      each animal exhibit. The player with the highest bid wins that
      exhibit, and the player with the (subjectively) best zoo wins the
      game!
    </p>
    <form class="cmp-stack cmp-entry-form" data-action="create-game">
      <div>
        <label for="hostName">Name</label>
        <input id="hostName" type="text" name="host-name" />
      </div>
      <button type="submit">Create Game</button>
    </form>
    <form class="cmp-stack cmp-entry-form" data-action="join-game">
      <div>
        <label for="roomCode">Room Code</label>
        <input
          id="roomCode"
          type="text"
          name="room-code"
          pattern="[a-zA-Z]{4}"
        />
      </div>
      <div>
        <label for="playerName">Name</label>
        <input id="playerName" type="text" name="player-name" />
      </div>
      <button type="submit">Join Game</button>
    </form>
  `;
};
