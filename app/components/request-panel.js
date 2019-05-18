import Component from '@ember/component';

export default Component.extend({

  // Element
  classNames: ['panel', 'request-panel'],

  // Props
  methods: null,

  init() {
    this._super(...arguments);
    this.set('methods', ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS']);
  }
});
