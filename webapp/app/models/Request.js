import EmberObject from '@ember/object';
import fetch, { Headers as HttpHeaders, Request as HttpRequest } from 'fetch';
import { forEach } from 'lodash';

export default EmberObject.extend({

  url: null, // String
  method: 'GET', // String
  headers: null, // String
  body: null, // String

  httpRequest: null, // Fetch API#Request : null until the request was sent

  send(settings) {
    const headers = new HttpHeaders();
    if (this.headers) {
      forEach(this.headers, (header) => {
        headers.append(header.key, header.value);
      });
    }

    const url = settings.replaceVariables(this.url);
    const method = this.method;
    const body = settings.replaceVariables(this.body);

    const httpRequest = new HttpRequest(url, {
      method,
      headers,
      body,
      mode: 'cors'
    });

    this.set('httpRequest', httpRequest);

    return fetch(httpRequest);
  }

});
