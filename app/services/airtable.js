import Service from '@ember/service';
import { A } from '@ember/array';
import Airtable from 'airtable';
import Resource from 'pixman/models/Resource';
import { computed } from '@ember/object';

export default Service.extend({

  apiKey: null,
  baseId: null,
  base: null,

  isConnected: computed('base', function() {
    return !!this.base;
  }),

  async connect(apiKey, baseId) {
    try {
      const base = new Airtable({ apiKey }).base(baseId);
      await base.table('Access logs').create({
        'Date time': Date.now(),
        'User agent': window.navigator.userAgent
      });
      this.set('base', base);
    } catch (err) {
      throw err;
    }
  },

  disconnect() {
    this.set('base', null);
  },

  async listResources() {
    const data = await this.base('Resources').select({ view: 'Grid view' }).all();
    return A(data.map((record) => {
      const headers = record.fields.Headers ? JSON.parse(record.fields.Headers) : [];

      return Resource.create({
        id: record.id,
        name: record.fields.Name,
        url: record.fields.URL,
        method: record.fields.Method,
        headers: A(headers),
        body: record.fields.Body
      });
    }));
  },

  createResource(resource) {
    return this.base('Resources').create({
      'Name': resource.name,
      'Method': 'GET',
      'Order': 9999
    });
  },

  importResources(resources) {
    const recordsData = resources.map((resource) => {
      return {
        'Name': resource.name,
        'Method': resource.method,
        'URL': resource.url,
        'Order': 9999
      }
    });
    return Promise.all(recordsData.map((record) => this.base('Resources').create(record)));
  },

  updateResource(resource) {
    return this.base('Resources').update(resource.id, {
      'Method': resource.method,
      'URL': resource.url,
      'Name': resource.name || resource.url,
      'Headers': JSON.stringify(resource.headers),
      'Body': resource.body
    });
  },

});
