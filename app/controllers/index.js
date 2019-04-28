import Controller from '@ember/controller';
import { inject as service } from '@ember/service';
import Command from 'pixman/models/Command';
import Request from 'pixman/models/Request';

export default Controller.extend({

  // DI
  airtable: service(),
  settings: service(),

  // props
  selectedResource: null,
  command: null,
  isShowingSettingsModal: false,

  actions: {

    selectResource(resource) {
      const request = Request.create({
        url: resource.url,
        method: resource.method,
        headers: resource.headers,
        body: resource.body,
      });
      const command = Command.create({ resource, request });

      this.set('selectedResource', resource);
      this.set('command', command);
    },

    async saveResource(resource) {
      const recordId = await this.airtable.createResource(resource);
      const resources = await this.airtable.listResources();
      this.set('model', resources);
    },

    async executeCommand(command) {
      await command.execute(this.settings);
    },

    editSettings() {
      this.set('isShowingSettingsModal', true);
    },

    saveSettings(editedVariables) {
      this.settings.setVariables(editedVariables);
      this.set('isShowingSettingsModal', false);
    },

    cancelSettingsEdition() {
      this.set('isShowingSettingsModal', false);
    },

    cancelCommand() {
      this.set('selectedResource', null);
      this.set('command', Command.create());
    },
  }
});
