import Service from '@ember/service';
import { A } from '@ember/array';
import Airtable from 'airtable';
import Resource from 'pixman/models/Resource';

export default Service.extend({

  base: null,

  init() {
    this._super(...arguments);
    const base = new Airtable({ apiKey: 'keyRR4MG3o7r3WdbA' }).base('appTWW0SSjzM3bTO7');
    this.set('base', base);
  },

  async listResources() {
    const data = await this.base('Resources').select({ view: 'Grid view' }).all();
    return A(data.map((record) => Resource.create({
      id: record.id,
      name: record.fields.Name,
      url: record.fields.URL,
      method: record.fields.Method,
      headers: record.fields.Headers,
      body: record.fields.Body
    })));
  },

  createResource(resource) {
    return this.base('Resources').create({
      'Name': resource.name,
      'Order': 9999
    });
  },

  updateResource(resource) {
    return this.base('Resources').update(resource.id, {
      'Method': resource.method,
      'URL': resource.url,
      'Name': resource.name || resource.url,
      'Headers': resource.headers,
      'Body': resource.body
    });
  },

});
