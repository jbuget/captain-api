import Component from '@ember/component';
import { A } from '@ember/array';

export default Component.extend({

  init() {
    this._super(...arguments);
    this.set('editedVariables', A(this.variables));
  }

});
