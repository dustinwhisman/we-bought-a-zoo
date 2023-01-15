type validStates =
  | 'start'
  | 'lobby'
  | 'secretAuction'
  | 'auctionResults'
  | 'finalResults';
interface stateObj {
  state: validStates;
  value: any;
}
type renderer = (state: validStates, data: any) => void;
type stateSetter = ({ state, value }: stateObj) => stateObj;

export const states = {
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
