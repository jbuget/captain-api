import ModalDialog from 'pixman/components/modal-dialog';
import Resource from 'pixman/models/Resource';

export default ModalDialog.extend({

  containerClass: "resource-edition-modal",

  init() {
    this._super(...arguments);
    if (!this.resource) {
      this.set('resource', Resource.create());
    }
  }

});
