import Component from '@ember/component';
import { computed } from '@ember/object';

export default Component.extend({

  // Element
  classNames: ['http-header-list'],

  // Props
  title: null,
  httpHeaders: null,

  headers: computed('httpHeaders', function() {
    if (this.httpHeaders) {
      return Object.keys(this.httpHeaders.map).reduce((h, key) => {
        h.push({ key, value: this.httpHeaders.map[key] });
        return h;
      }, []);
    }
    return null;
  }),

});
