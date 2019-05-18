import Component from '@ember/component';

// eslint-disable-next-line no-unused-vars
const VIEW_QUERY_HEADERS = 'QUERY_HEADERS';
const VIEW_QUERY_PAYLOAD = 'QUERY_PAYLOAD';

export default Component.extend({

  // Element
  classNames: ['query-panel'],

  // Props
  currentView: VIEW_QUERY_PAYLOAD,

  actions: {

    selectView(viewName) {
      this.set('currentView', viewName);
    }
  }

});
