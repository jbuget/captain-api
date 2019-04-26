import Controller from '@ember/controller';
import fetch from 'fetch';
import yaml from 'js-yaml';
import { inject as service } from '@ember/service';

export default Controller.extend({

  // DI
  settings: service(),

  // props
  selectedResource: null,
  response: null,
  isShowingSettingsModal: false,

  actions: {

    selectResource(resource) {
      this.set('selectedResource', resource);
      this.set('response', null);
    },

    async sendRequest(resource) {
      const method = resource.fields.Method;

      const url = this.settings.replaceVariables(resource.fields.URL);

      const headers = yaml.safeLoad(this.settings.replaceVariables(resource.fields.Headers));
      const body = this.settings.replaceVariables(resource.fields.Body);

      try {
        const httpResponse = await fetch(url, { method, headers, body });

        const httpResponseBody = await httpResponse.text();

        this.set('response', {
          method,
          url: httpResponse.url,
          statusCode: httpResponse.status,
          statusText: httpResponse.statusText,
          headers: yaml.safeDump(httpResponse.headers.map),
          body: httpResponseBody
        });
      } catch (err) {

        this.set('response', {
          method,
          url,
          statusCode: 404,
          statusText: 'Network request failed',
        });
      }
    },

    editSettings() {
      this.set('isShowingSettingsModal', true);
    },

    saveSettings(editedVariables) {
      this.settings.setVariables(editedVariables);
      this.set('isShowingSettingsModal', false);
    },

    cancelSettings() {
      this.set('isShowingSettingsModal', false);
    }
  }
});
