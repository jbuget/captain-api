import Component from '@ember/component';

export default Component.extend({

  // Element
  classNames: ['panel', 'request-panel'],

  // Props
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],

});
