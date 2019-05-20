import ModalDialog from 'ember-modal-dialog/components/modal-dialog';
import { EKMixin as EmberKeyboardMixin, keyUp } from 'ember-keyboard';
import { on } from '@ember/object/evented';

export default ModalDialog.extend(EmberKeyboardMixin, {

  targetAttachment: 'center',
  translucentOverlay: true,
  clickOutsideToClose: true,
  keyboardActivated: true,

  closeOnEsc: on(keyUp('Escape'), function() {
    if (this.onClose) {
      this.onClose();
    }
  })
});
