import { states } from './states';
import { renderers } from './renderers';
import animalList from './animals.json';
import type { stateObj, validEvents, stateSetter, renderer } from './states';
import { countdown } from './countdown';

interface CreateRoomFormElements extends HTMLFormControlsCollection {
  hostName: HTMLInputElement;
}

interface JoinRoomFormElements extends HTMLFormControlsCollection {
  roomCode: HTMLInputElement;
  playerName: HTMLInputElement;
}

interface SubmitBidFormElements extends HTMLFormControlsCollection {
  animal: HTMLInputElement;
  playerName: HTMLInputElement;
  bidAmount: HTMLInputElement;
}

interface Animal {
  animal: string;
  auctioned: boolean;
  winner: {
    name: string;
    bidAmount: number;
  } | null;
}

let currentState: stateObj = { state: 'start', value: null };
let name: string;
let isHost = false;
let animals: Animal[] = [];

const cash = (): number => {
  const moneySpent = animals.reduce((acc, animal) => {
    if (animal.winner?.name === name) {
      return acc + animal.winner?.bidAmount ?? 0;
    }

    return acc;
  }, 0);

  return 100 - moneySpent;
};

const setState: stateSetter = (nextState) => {
  currentState = nextState;
  return currentState;
};

const renderView: renderer = (state, data) => {
  renderers[state]?.(data);
};

const handle = (event: validEvents, data: any): void => {
  const state = states[currentState.state];
  if (state?.[event]) {
    state[event]?.(
      { ...data, name, isHost, cash: cash() },
      currentState.state,
      renderView,
      setState,
    );

    if (event === 'start' || event === 'next') {
      countdown(60);
    }
    return;
  }

  console.log(
    `No handler for event '${event}' in state '${currentState.state}'`,
  );
};

const ws = new WebSocket(import.meta.env.VITE_WS_URL);

ws.addEventListener('message', (event) => {
  const { type, params } = JSON.parse(event.data);
  handle(type, params);
});

document.addEventListener('submit', (event) => {
  event.preventDefault();
  const element = event.target as HTMLFormElement | null;
  if (element?.matches('[data-action="create-game"]')) {
    const hostName = (element.elements as CreateRoomFormElements).hostName
      .value;
    name = hostName;
    isHost = true;
    ws.send(
      JSON.stringify({
        type: 'create',
        params: {
          name,
        },
      }),
    );
  }

  if (element?.matches('[data-action="join-game"]')) {
    const roomCode = (
      element.elements as JoinRoomFormElements
    ).roomCode.value.toLowerCase();
    const playerName = (element.elements as JoinRoomFormElements).playerName
      .value;
    name = playerName;
    ws.send(
      JSON.stringify({
        type: 'join',
        params: {
          roomCode,
          name,
        },
      }),
    );
  }

  if (element?.matches('[data-action="submit-bid"]')) {
    const elements = element.elements as SubmitBidFormElements;
    const animal = elements.animal.value;
    const bidAmount = elements.bidAmount.value;
    const numericalAmount = Number.parseFloat(bidAmount.replace('$', ''));

    ws.send(
      JSON.stringify({
        type: 'bid',
        params: {
          ...currentState.value,
          [animal]: {
            ...currentState.value[animal],
            [name]: numericalAmount,
          },
        },
      }),
    );
  }
});

document.addEventListener('click', (event) => {
  const element = event.target as HTMLButtonElement | null;
  if (element?.matches('[data-action="start-game"]')) {
    animals = animalList;
    ws.send(
      JSON.stringify({
        type: 'start',
        params: {
          ...currentState.value,
          animals,
        },
      }),
    );
  }
});
