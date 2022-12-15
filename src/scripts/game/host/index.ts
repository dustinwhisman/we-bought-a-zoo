import animals from './animals.json';

export const setupHostGameEventListeners = (socket: WebSocket): void => {
  document.addEventListener('click', (event) => {
    const element = event.target as HTMLButtonElement | null;
    if (element?.matches('[data-action="start-game"]')) {
      const animalList = animals.map((animal) => ({
        ...animal,
        auctioned: false,
      }));
      sessionStorage.setItem('animals', JSON.stringify(animalList));
      socket.send(
        JSON.stringify({
          type: 'game started',
        }),
      );
    }
  });
};

export const showAnimalSelectionScreen = (): void => {
  const gameContentElement = document.querySelector('#gameContent');
  if (!gameContentElement) {
    return;
  }

  const animalList = sessionStorage.getItem('animals');
  if (!animalList) {
    return;
  }

  const selection = JSON.parse(animalList).filter(
    (animal: { auctioned: boolean }) => !animal.auctioned,
  );

  if (!selection.length) {
    gameContentElement.innerHTML = `
      <p>
        The game has ended!
      </p>
    `;
    return;
  }

  gameContentElement.innerHTML = `
    <p>
      Please choose the next animal exhibit that you would like to auction off to your fellow zookeepers.
    </p>
    <div class="cmp-animal-parade">
      ${selection
        .map(
          ({ animal }: { animal: string }) => `
          <button type="button" data-action="select-animal" data-animal="${animal}">
            ${animal}
          </button>
        `,
        )
        .join('')}
    </div>
  `;
};
