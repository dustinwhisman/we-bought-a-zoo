export const leaveRoom = (): void => {
  const roomInfo = sessionStorage.getItem('roomInfo');
  const { roomCode } = JSON.parse(roomInfo ?? '{}');
  sessionStorage.removeItem('roomInfo');

  const leaveRoomEvent = new CustomEvent('leave-room', { detail: roomCode });
  document.dispatchEvent(leaveRoomEvent);
};
