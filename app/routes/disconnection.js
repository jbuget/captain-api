import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';

export default Route.extend({

  // DI
  airtable: service(),

  beforeModel() {
    window.localStorage.removeItem('airtableApiKey');
    window.localStorage.removeItem('airtableBaseId');
    this.airtable.disconnect();
    return this.transitionTo('connection');
  }

});
