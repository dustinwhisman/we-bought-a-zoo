import 'cypress-each';
import type axe from 'axe-core';

const pages = ['/'];

const terminalLog = (violations: axe.Result[]): void => {
  cy.task('log', `${violations.length} accessibility violation(s) detected`);

  const violationData = violations.map(
    ({ id, impact, description, nodes }) => ({
      id,
      impact,
      description,
      nodes: nodes.length,
    }),
  );

  cy.task('table', violationData);
};

const checkAccessibility = (): void => {
  cy.injectAxe();
  ['macbook-15', 'ipad-mini', 'iphone-6'].forEach((size) => {
    cy.viewport(size as Cypress.ViewportPreset);
    cy.checkA11y(undefined, undefined, terminalLog);
  });
};

describe('automated accessibility checks', () => {
  it.each(pages)('passes automated accessibility checks', (page) => {
    cy.visit(page);
    checkAccessibility();
  });
});
