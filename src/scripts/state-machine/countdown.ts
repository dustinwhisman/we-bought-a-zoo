const updateTimer = (seconds: number): void => {
  const timerElement = document.querySelector('[data-timer]');
  if (!timerElement) {
    return;
  }

  timerElement.innerHTML = `${seconds} second${seconds === 1 ? '' : 's'}`;
};

export const countdown = (seconds: number): void => {
  const endTime = Date.now() + seconds * 1000;

  const tick = (): void => {
    const remaining = Math.max(0, endTime - Date.now()) / 1000;
    if (remaining <= 0) {
      updateTimer(0);
      document.dispatchEvent(new CustomEvent('end-bidding'));
      return;
    }
    updateTimer(Math.ceil(remaining));
    requestAnimationFrame(tick);
  };

  tick();
};
