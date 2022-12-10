export const updateElement = (element: HTMLButtonElement, count: number): void => {
  element.dataset.count = count.toString();
  element.innerHTML = `count is ${count}`;
};

export const getCurrentCount = (element: HTMLButtonElement): number => {
  const count = element.dataset.count;
  const numericCount = Number.parseInt(count ?? '0');

  return numericCount;
};

export const incrementCount = (count: number): number => count + 1;

export const setupCounter = (selector: string): void => {
  const element: HTMLButtonElement | null = document.querySelector(selector);
  if (!element) {
    return;
  }

  element.addEventListener('click', () => {
    const currentCount = getCurrentCount(element);
    const updatedCount = incrementCount(currentCount);
    updateElement(element, updatedCount);
  });
};
