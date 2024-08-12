import { defineConfig } from "cypress";
import { addCucumberPreprocessorPlugin } from "@badeball/cypress-cucumber-preprocessor";
import browserify from '@badeball/cypress-cucumber-preprocessor/browserify';
import vitePreprocessor from 'cypress-vite';
import cypressFailedLogs from 'cypress-failed-log/on';

export default defineConfig({
  e2e: {
    baseUrl: 'http://localhost:3000',
    
    async setupNodeEvents(on, config) {
      on('file:preprocessor', vitePreprocessor())

      cypressFailedLogs(on);

      // Make sure to return the config object as it might have been modified by the plugin.
      return config;
    },
  },
});
