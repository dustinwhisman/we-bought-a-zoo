import { setupCounter } from './counter';
import { joinRoom } from './websockets/join-room';

setupCounter('#counter');
joinRoom('abcd');
