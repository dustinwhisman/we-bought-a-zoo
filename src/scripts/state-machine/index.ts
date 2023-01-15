import { states } from './states';
import type { stateObj, validEvents, stateSetter, renderer } from './states';

const storedState = JSON.parse(sessionStorage.getItem('state') ?? '');

let currentState: stateObj = storedState || { state: 'start', value: null };

const setState: stateSetter = (nextState) => {
  currentState = nextState;
  sessionStorage.setItem('state', JSON.stringify(currentState));
  return currentState;
};

const renderView: renderer = (state, data) => {
  console.log(state, data);
};

export const handle = (event: validEvents, data: any): stateObj => {
  const state = states[currentState.state];
  if (state?.[event]) {
    return (
      state[event]?.(data, currentState.state, renderView, setState) ??
      currentState
    );
  }

  console.log(
    `No handler for event '${event}' in state '${currentState.state}'`,
  );
  return currentState;
};
