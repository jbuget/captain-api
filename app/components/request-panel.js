import Component from '@ember/component';

export default Component.extend({

  classNames: ['request-panel'],

  actions: {
    sendRequest() {
      this.onSendRequest(this.resource);
    }
  }
});
