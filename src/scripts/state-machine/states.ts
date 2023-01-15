export interface stateObj {
  state: validStates;
  value: any;
}
export type validStates =
  | 'start'
  | 'lobby'
  | 'secretAuction'
  | 'auctionResults'
  | 'finalResults';
export type validEvents = 'create' | 'join' | 'start' | 'bid' | 'next' | 'end';
export type renderer = (state: validStates, data: any) => void;
export type stateSetter = ({ state, value }: stateObj) => stateObj;
export type eventHandler = (
  data: any,
  state: validStates,
  renderView: renderer,
  setState: stateSetter,
) => stateObj;
export type States = {
  [key in validStates]: {
    [key in validEvents]?: eventHandler;
  };
};

export const states: States = {
  start: {
    create: (
      data: any,
      state: validStates,
      renderView: renderer,
      setState: stateSetter,
    ) => {
      console.log('Creating lobby', data);
      renderView(state, data);
      return setState({ state: 'lobby', value: data });
    },
    join: (
      data: any,
      state: validStates,
      renderView: renderer,
      setState: stateSetter,
    ) => {
      console.log('Joining lobby', data);
      renderView(state, data);
      return setState({ state: 'lobby', value: data });
    },
  },
  lobby: {
    join: (
      data: any,
      state: validStates,
      renderView: renderer,
      setState: stateSetter,
    ) => {
      console.log('Updating lobby', data);
      renderView(state, data);
      return setState({ state: 'lobby', value: data });
    },
    start: (
      data: any,
      state: validStates,
      renderView: renderer,
      setState: stateSetter,
    ) => {
      console.log('Starting auction', data);
      renderView(state, data);
      return setState({ state: 'secretAuction', value: data });
    },
  },
  secretAuction: {
    bid: (
      data: any,
      state: validStates,
      renderView: renderer,
      setState: stateSetter,
    ) => {
      console.log('Received bid', data);
      renderView(state, data);
      return setState({ state: 'secretAuction', value: data });
    },
    end: (
      data: any,
      state: validStates,
      renderView: renderer,
      setState: stateSetter,
    ) => {
      console.log('Auction ended', data);
      renderView(state, data);
      return setState({ state: 'auctionResults', value: data });
    },
  },
  auctionResults: {
    next: (
      data: any,
      state: validStates,
      renderView: renderer,
      setState: stateSetter,
    ) => {
      console.log('Starting next auction', data);
      renderView(state, data);
      return setState({ state: 'secretAuction', value: data });
    },
    end: (
      data: any,
      state: validStates,
      renderView: renderer,
      setState: stateSetter,
    ) => {
      console.log('Finishing auction', data);
      renderView(state, data);
      return setState({ state: 'finalResults', value: data });
    },
  },
  finalResults: {
    end: (
      data: any,
      state: validStates,
      renderView: renderer,
      setState: stateSetter,
    ) => {
      console.log('Ending game', data);
      renderView(state, data);
      return setState({ state: 'start', value: null });
    },
  },
};
