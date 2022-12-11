import { defineConfig } from 'cypress';
import { config } from 'dotenv';

config({ path: '.env.local' });

export default defineConfig({
  e2e: {
    baseUrl: process.env.BASE_URL,
    setupNodeEvents(on, config) {
      on('task', {
        log(message) {
          // eslint-disable-next-line no-console
          console.log(message);

          return null;
        },
        table(message) {
          // eslint-disable-next-line no-console
          console.table(message);

          return null;
        },
      });

      return config;
    },
  },
});
