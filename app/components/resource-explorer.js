import Component from '@ember/component';
import { computed } from '@ember/object';

export default Component.extend({

  // Element
  tagName: 'nav',
  classNames: ['panel', 'resource-explorer'],

  // Props
  resources: null,
  filter: null,

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

});
