import { A } from '@ember/array';
import ModalDialog from 'pixman/components/modal-dialog';

export default ModalDialog.extend({

  containerClass: "settings-modal",

  init() {
    this._super(...arguments);
    this.set('editedVariables', A(this.variables));
  }

});
