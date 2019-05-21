import ModalDialog from 'granny/components/modal-dialog';
import Resource from 'granny/models/Resource';

export default ModalDialog.extend({

  containerClass: 'resource-edition-modal',

  init() {
    this._super(...arguments);
    if (!this.resource) {
      this.set('resource', Resource.create());
    }
  }

});
