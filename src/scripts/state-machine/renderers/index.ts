import { renderStart } from './start';
import { renderLobby } from './lobby';
import { renderAuction } from './auction';

export const renderers = {
  start: renderStart,
  lobby: renderLobby,
  secretAuction: renderAuction,
  auctionResults: (data: any) => {
    console.log('rendering auction results', data);
  },
  finalResults: (data: any) => {
    console.log('rendering final results', data);
  },
};
