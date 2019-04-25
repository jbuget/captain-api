import Controller from '@ember/controller';
import fetch from 'fetch';
import yaml from 'js-yaml';

export default Controller.extend({

  selectedResource: null,
  response: null,

  actions: {
    selectResource(resource) {
      this.set('selectedResource', resource);
      this.set('response', null);
    },

    async sendRequest(resource) {
      const headers = yaml.safeLoad(resource.fields.Headers);

      const httpResponse = await fetch(resource.fields.URL, {
        method: resource.fields.Method,
        headers,
        body: resource.fields.Body
      });

      const httpResponseBody = await httpResponse.text();

      const response = {
        method: httpResponse.method,
        url: httpResponse.url,
        statusCode: httpResponse.status,
        statusText: httpResponse.statusText,
        headers: yaml.safeDump(httpResponse.headers.map),
        body: httpResponseBody
      };
      this.set('response', response);
    }
  }
});
