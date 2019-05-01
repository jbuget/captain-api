import Controller from '@ember/controller';
import { inject as service } from '@ember/service';

export default Controller.extend({

  // DI`
  airtable: service(),

  // Props
  error: null,

  actions: {

    async connect() {
      try {
        await this.airtable.connect(this.airtableApiKey, this.airtableBaseId);

        window.localStorage.setItem('airtableApiKey', this.airtableApiKey);
        window.localStorage.setItem('airtableBaseId', this.airtableBaseId);

        this.transitionToRoute('index');
      } catch(err) {
        this.set('error', err.message);
      }
    }
  }

});
