/**
 * @vitest-environment jsdom
 */

import { describe, it, expect, beforeEach } from 'vitest';
import { updateElement } from '.';

declare module 'vitest' {
  export interface TestContext {
    element: HTMLButtonElement | null;
  }
};

describe('counter with valid HTML', () => {
  beforeEach((context) => {
    document.body.innerHTML = '<button type="button" data-count="0">count is 0</button>';
    context.element = document.querySelector('button');
  });

  it.concurrent('element is not null', (context) => {
    expect(context.element).not.toBe(null);
  })

  it.concurrent('updateElement updates the count', (context) => {
    updateElement(context.element, 5);
    expect(context.element?.dataset.count).toBe('5');
    expect(context.element?.innerHTML).toBe('count is 5');
  });
});

describe('counter with bad initial state', () => {
  beforeEach((context) => {
    document.body.innerHTML = '<button type="button"></button>';
    context.element = document.querySelector('button');
  });

  it.concurrent('element is not null', (context) => {
    expect(context.element).not.toBe(null);
  })

  it.concurrent('updateElement updates the count', (context) => {
    updateElement(context.element, 5);
    expect(context.element?.dataset.count).toBe('5');
    expect(context.element?.innerHTML).toBe('count is 5');
  });
});

describe('counter with null element given', () => {
  beforeEach((context) => {
    document.body.innerHTML = '<button type="button" data-count="0">count is 0</button>';
    context.element = document.querySelector('.button');
  });

  it.concurrent('element to be null', (context) => {
    expect(context.element).toBe(null);
  })

  it.concurrent('updateElement does nothing', (context) => {
    updateElement(context.element, 5);
    expect(context.element).toBe(null);
  });
});
