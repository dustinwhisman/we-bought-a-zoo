import { states } from './states';
import type { stateObj, validEvents, stateSetter, renderer } from './states';

let currentState: stateObj = { state: 'start', value: null };

const setState: stateSetter = (nextState) => {
  currentState = nextState;
  return currentState;
};

const renderView: renderer = (state, data) => {
  console.log(state, data);
};

const handle = (event: validEvents, data: any): void => {
  const state = states[currentState.state];
  if (state?.[event]) {
    state[event]?.(data, currentState.state, renderView, setState);
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
