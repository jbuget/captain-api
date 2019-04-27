import Component from '@ember/component';
import { computed } from '@ember/object';

export default Component.extend({

  classNames: ['panel', 'result-panel'],

  responseStatusType: computed('command.response.status', function() {
    const statusCode = parseInt(this.command.response.status);

    if (statusCode < 200) {
      return 'information';
    }
    if (statusCode < 300) {
      return 'success';
    }
    if (statusCode < 400) {
      return 'redirection';
    }
    if (statusCode < 500) {
      return 'client-error';
    }
    return 'server-error';
  })
});
