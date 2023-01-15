import { renderStart } from './start';
import { renderLobby } from './lobby';

export const renderers = {
  start: renderStart,
  lobby: renderLobby,
  secretAuction: () => {},
  auctionResults: () => {},
  finalResults: () => {},
};
