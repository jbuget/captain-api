import Component from '@ember/component';

// eslint-disable-next-line no-unused-vars
const VIEW_RESPONSE_HEADERS = 'RESPONSE_HEADERS';
const VIEW_RESPONSE_BODY_PREVIEW = 'RESPONSE_BODY_PREVIEW';
// eslint-disable-next-line no-unused-vars
const VIEW_RESPONSE_BODY_RAW = 'RESPONSE_BODY_RAW';

export default Component.extend({

  // Element
  classNames: ['response-panel'],

  // Props
  currentView: VIEW_RESPONSE_BODY_PREVIEW,

  actions: {

    selectView(viewName) {
      this.set('currentView', viewName);
    }
  }

});
