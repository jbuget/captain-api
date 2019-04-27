import Component from '@ember/component';

export default Component.extend({

  classNames: ['panel', 'request-panel'],

  actions: {
    sendRequest() {
      this.onSendRequest(this.resource);
    }
  }
});
