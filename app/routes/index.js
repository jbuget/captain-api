import { A } from '@ember/array';
import Route from '@ember/routing/route';
import fetch from 'fetch';
import Resource from 'pixman/models/Resource';
import Command from "../models/Command";

export default Route.extend({

  model() {
    return fetch('https://api.airtable.com/v0/appTWW0SSjzM3bTO7/Resources?sort%5B0%5D%5Bfield%5D=Order', {
      headers: {
        'Authorization': 'Bearer keyRR4MG3o7r3WdbA'
      }
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        return A(data.records.map((record) => Resource.create({
          name: record.fields.Name,
          url: record.fields.URL,
          method: record.fields.Method,
          headers: record.fields.Headers,
          body: record.fields.Body
        })));
      });
  },

  setupController(controller, model) {
    this._super(controller, model);
    this.controllerFor('index').set('command', Command.create());
  }

});
