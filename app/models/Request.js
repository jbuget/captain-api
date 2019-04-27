import EmberObject from '@ember/object';
import fetch, {
  Headers as HttpHeaders,
  Request as HttpRequest
} from 'fetch';

export default EmberObject.extend({

  url: null, // String
  method: 'GET', // String
  headers: null, // String
  body: null, // String

  httpRequest: null, // Fetch API#Request : null until the request was sent

  send(settings) {
    const headers = new HttpHeaders();
    this.headers.split('\n').forEach((header) => {
      const [name, value] = header.split(':');
      headers.append(name.trim(), settings.replaceVariables(value.trim()));
    });

    const url = settings.replaceVariables(this.url);
    const method = this.method;
    const body = settings.replaceVariables(this.body);

    const httpRequest = new HttpRequest(url, {
      method,
      headers: headers,
      body
    });

    this.set('httpRequest', httpRequest);

    return fetch(httpRequest);
  }

});
