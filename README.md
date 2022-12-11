# We Bought a Zoo

It's everybodies favorite secret auction game! Place your bids wisely so you can end up with the best zoo!

## Getting Started

Assuming you have Node.js/npm installed, you can run these commands to get up and running quickly.

```sh
# install dependencies
npm install

# run the app
npm start

# build the site for production
npm run build

# run linters
npm run lint:css
npm run lint:js

# run tests in watch mode
npm run test

# run tests once and generate a coverage report
npm run test:coverage -- --coverage

# update any outdated npm dependencies
npm run update-deps
```

## Cypress Testing

To run Cypress tests locally, you will need to create a `.env.local` file. Use `.env.example` as a starting point for filling in the variables you need. `BASE_URL` should point to where the site is running, such as http://localhost:5173, but you can point it at the production site or a deploy preview for some manual testing.

For local testing, you will need to have the site running already (`npm start`), then in a different terminal, you can run one of these commands to run Cypress.

```sh
# open Cypress and watch the tests as they happen
npm run test:e2e:open

# run Cypress in CI mode
npm run test:e2e
```
