import EmberObject from '@ember/object';
import Request from 'pixman/models/Request';
import Response from 'pixman/models/Response';
import { Response as HttpResponse } from 'fetch';
import moment from 'moment';

export default EmberObject.extend({

  resource: null, // Resource
  request: null, // Request
  response: null, // Response

  init() {
    this._super(...arguments);
    if (!this.request) {
      this.set('request', Request.create());
    }
  },

  async execute(settings) {
    const startTime = moment();
    try {
      const httpResponse = await this.request.send(settings);
      const endTime = moment();
      const duration = endTime.diff(startTime);
      this.set('response', Response.create({ httpResponse, duration }));
    } catch (err) {
      const endTime = moment();
      const duration = endTime.diff(startTime);
      this.set('response', Response.create({ httpResponse: HttpResponse.error(), duration }));
    }
  }
});
