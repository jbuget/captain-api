import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';

export default Route.extend({

  // DI
  airtable: service(),

  // Props
  error: null,

  async beforeModel() {
    if (this.airtable.isConnected) {
      return this.transitionTo('index');
    }

    const airtableApiKey = window.localStorage.getItem('airtableApiKey');
    const airtableBaseId = window.localStorage.getItem('airtableBaseId');
    if (airtableApiKey && airtableBaseId) {
      try {
        await this.airtable.connect(airtableApiKey, airtableBaseId);
        this.transitionTo('index');
      } catch(err) {
        console.error(err);
      }
    }
  }

});
