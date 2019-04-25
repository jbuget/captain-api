import Route from '@ember/routing/route';
import fetch from 'fetch';

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
        return data;
      });
  },

  setupController(controller, model) {
    this._super(controller, model);
    this.controllerFor('index').set('selectedResource', model.records[0]);
  }

});
