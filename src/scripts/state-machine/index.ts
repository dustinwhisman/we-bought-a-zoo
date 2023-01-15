import { states } from './states';
import { renderers } from './renderers';
import type { stateObj, validEvents, stateSetter, renderer } from './states';

interface CreateRoomFormElements extends HTMLFormControlsCollection {
  hostName: HTMLInputElement;
}

interface JoinRoomFormElements extends HTMLFormControlsCollection {
  roomCode: HTMLInputElement;
  playerName: HTMLInputElement;
}

let currentState: stateObj = { state: 'start', value: null };
let name: string;
let isHost = false;

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
      { ...data, name, isHost },
      currentState.state,
      renderView,
      setState,
    );
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
});
