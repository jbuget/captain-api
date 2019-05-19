import Component from '@ember/component';
import { A } from '@ember/array';
import { computed } from '@ember/object';

export default Component.extend({

  // Element
  classNames: ['key-value-editor'],

  // Props
  keyHeader: 'Key',
  valueHeader: 'Value',
  data: null, // Array of { key, value }

  // CPs
  rows: computed('data.[]', function() {
    return this.data.map((row) => {
      return {
        key: row.key.trim(),
        value: row.value.trim(),
      };
    });
  }),

  init() {
    this._super(...arguments);
    if (!this.data) {
      this.set('data', A());
    }
  },

  didRender() {
    this._super(...arguments);
    if (this.focusOnLastRowKey) {
      const $rowKeyInputFields = this.element.querySelectorAll('.key-value-editor__cell--key');
      const $lastRowKeyInputField = $rowKeyInputFields[$rowKeyInputFields.length - 1];
      $lastRowKeyInputField.focus();
      this.focusOnLastRowKey = false;
    }
  },

  actions: {

    insertRow() {
      this.focusOnLastRowKey = true;
      this.data.pushObject({ key: '', value: '' });
    },

    updateRow(index) {
      const row = this.rows.objectAt(index);
      const dataCell = this.data.objectAt(index);
      dataCell.key = row.key;
      dataCell.value = row.value;
    },

    deleteRow(index) {
      return this.data.removeAt(index);
    },
  },

});
