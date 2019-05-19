/* eslint-disable no-undef */
import ModalDialog from 'pixman/components/modal-dialog';
import { inject as service } from '@ember/service';

export default ModalDialog.extend({

  // DI
  settings: service(),

  // Element
  containerClass: 'settings-modal',

  init() {
    this._super(...arguments);
    this.settings.reloadVariables();
  },

  actions: {

    async saveChanges() {
      await this.settings.updateVariables();
      this.onClose();
    },

    cancelChanges() {
      this.onClose();
    }
  }

});
