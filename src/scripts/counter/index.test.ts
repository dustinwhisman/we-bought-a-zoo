/**
 * @vitest-environment jsdom
 */

import { describe, it, expect, beforeEach } from "vitest";
import { updateElement, getCurrentCount, incrementCount } from ".";

declare module "vitest" {
  export interface TestContext {
    element: HTMLButtonElement | null;
  }
}

describe("counter", () => {
  describe("counter with valid HTML", () => {
    beforeEach((context) => {
      document.body.innerHTML =
        '<button type="button" data-count="4">count is 4</button>';
      context.element = document.querySelector("button");
    });

    it.concurrent("element is not null", (context) => {
      expect(context.element).not.toBe(null);
    });

    it.concurrent("updateElement updates the count", (context) => {
      updateElement(context.element, 5);
      expect(context.element?.dataset.count).toBe("5");
      expect(context.element?.innerHTML).toBe("count is 5");
    });

    it.concurrent("getCurrentCount returns the correct count", (context) => {
      const count = getCurrentCount(context.element);
      expect(count).toBe(4);
    });
  });

  describe("counter with bad initial state", () => {
    beforeEach((context) => {
      document.body.innerHTML = '<button type="button"></button>';
      context.element = document.querySelector("button");
    });

    it.concurrent("element is not null", (context) => {
      expect(context.element).not.toBe(null);
    });

    it.concurrent("updateElement updates the count", (context) => {
      updateElement(context.element, 5);
      expect(context.element?.dataset.count).toBe("5");
      expect(context.element?.innerHTML).toBe("count is 5");
    });

    it.concurrent("getCurrentCount returns 0", (context) => {
      const count = getCurrentCount(context.element);
      expect(count).toBe(0);
    });
  });

  describe("counter with null element given", () => {
    beforeEach((context) => {
      document.body.innerHTML =
        '<button type="button" data-count="4">count is 4</button>';
      context.element = document.querySelector(".button");
    });

    it.concurrent("element to be null", (context) => {
      expect(context.element).toBe(null);
    });

    it.concurrent("updateElement does nothing", (context) => {
      updateElement(context.element, 5);
      expect(context.element).toBe(null);
    });

    it.concurrent("getCurrentCount returns 0", (context) => {
      const count = getCurrentCount(context.element);
      expect(count).toBe(0);
    });
  });

  it.concurrent("incrementCount returns n + 1", () => {
    expect(incrementCount(0)).toBe(1);
    expect(incrementCount(5)).toBe(6);
    expect(incrementCount(10)).toBe(11);
    expect(incrementCount(1000)).toBe(1001);
  });
});
