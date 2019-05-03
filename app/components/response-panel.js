import Component from '@ember/component';

const VIEW_RESPONSE_HEADERS = 'RESPONSE_HEADERS';
const VIEW_RESPONSE_BODY_PREVIEW = 'RESPONSE_BODY_PREVIEW';
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
