import Controller from '@ember/controller';
import { inject as service } from '@ember/service';
import Command from 'granny/models/Command';
import Request from 'granny/models/Request';
import { A } from '@ember/array';

export default Controller.extend({

  // DI
  airtable: service(),
  settings: service(),

  // props
  selectedResource: null,
  command: null,
  isShowingSettingsModal: false,

  actions: {

    disconnect() {

    },

    async reloadResources() {
      await this._reloadResources();
    },

    async importResources(importedResources) {
      await this.airtable.importResources(importedResources);
      await this._reloadResources();
    },

    selectResource(resource) {
      const request = Request.create({
        url: resource.url,
        method: resource.method,
        headers: A(resource.headers),
        body: resource.body,
      });
      const command = Command.create({ resource, request });

      this.set('selectedResource', resource);
      this.set('command', command);
    },

    async createResource(resource) {
      await this.airtable.createResource(resource);
      await this._reloadResources();
    },

    async updateResourceRequest(command) {
      command.resource.setProperties({
        method: command.request.method,
        url: command.request.url,
        headers: command.request.headers,
        body: command.request.body,
      });
      await this.airtable.updateResource(command.resource);
      await this._reloadResources();
    },

    async executeCommand(command) {
      await command.execute(this.settings);
    },

    cancelCommand() {
      this.set('selectedResource', null);
      this.set('command', Command.create());
    },
  },

  async _reloadResources() {
    const resources = await this.airtable.listResources();
    this.set('model', resources);

  }
});
