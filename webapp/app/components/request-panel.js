import { on } from '@ember/object/evented';
import Component from '@ember/component';
import { EKMixin } from 'ember-keyboard';
import { keyUp } from 'ember-keyboard';

export default Component.extend(EKMixin, {

  // Element
  classNames: ['panel', 'request-panel'],

  // Props
  keyboardActivated: true,
  methods: null,

  saveCommand: on(keyUp('ctrl+KeyS'), function() {
    this.onSaveRequest(this.command);
  }),

  init() {
    this._super(...arguments);
    this.set('methods', ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS']);
  }
});
