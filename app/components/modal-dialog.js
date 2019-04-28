import ModalDialog from 'ember-modal-dialog/components/modal-dialog';
import { EKMixin as EmberKeyboardMixin, keyDown } from 'ember-keyboard';
import { on } from '@ember/object/evented';

export default ModalDialog.extend(EmberKeyboardMixin, {

  targetAttachment: "center",
  translucentOverlay: true,
  clickOutsideToClose: true,
  
  init() {
    this._super(...arguments);
    this.set('keyboardActivated', true);
  },

  closeOnEsc: on(keyDown('Escape'), function() {
    this.get('onClose')();
  })
});
