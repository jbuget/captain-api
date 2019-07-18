import Route from '@ember/routing/route';
import Command from 'granny/models/Command';
import { inject as service } from '@ember/service';

export default Route.extend({

  airtable: service(),

  beforeModel() {
    if (!this.airtable.isConnected) {
      return this.transitionTo('connection');
    }
  },

  model() {
    return this.airtable.listResources();
  },

  setupController(controller, model) {
    this._super(controller, model);
    this.controllerFor('index').set('command', Command.create());
  }

});
