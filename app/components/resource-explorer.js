import Component from '@ember/component';
import { computed } from '@ember/object';
import Resource from 'pixman/models/Resource';

export default Component.extend({

  // Element
  tagName: 'nav',
  classNames: ['panel', 'resource-explorer'],

  // Props
  resources: null,
  filter: null,
  isShowingResourcesImportModal: false,
  isShowingResourceEditionModal: false,

  // CP
  filteredResources: computed('resources', 'filter', function() {
    if (this.filter && this.filter.trim() !== '') {
      return this.resources.filter((resource) => {
        const filterInLowerCase = this.filter.trim().toLowerCase();
        const resourceNameInLowerCase = resource.name.toLowerCase();
        const resourceMethodInLowerCase = resource.method.toLowerCase();

        return resourceNameInLowerCase.includes(filterInLowerCase)
          || resourceMethodInLowerCase.includes(filterInLowerCase);
      });
    }
    return this.resources;
  }),

  actions: {

    async importResources(resources) {
      await this.onImportResources(resources);
      this.set('isShowingResourcesImportModal', false);
    },

    newResource() {
      this.set('selectedResource', Resource.create());
      this.set('isShowingResourceEditionModal', true);
    },

    async saveResource(resource) {
      await this.onSaveResource(resource);
      this.set('isShowingResourceEditionModal', false);
    },
  }
});
