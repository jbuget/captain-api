import Component from '@ember/component';
import { computed } from '@ember/object';
import { A } from '@ember/array';
import { join, remove } from 'lodash';

export default Component.extend({

  // Element
  classNames: ['key-value-editor'],

  // Props
  keyHeader: 'Key',
  valueHeader: 'Value',
  data: null,

  // CPs
  rows: computed('data', function() {
    if (this.data) {
      const rows = A();
      this.data.split('\n').forEach((row) => {
        if (row) {
          const [key, value] = row.split(':');
          if (key && value) {
            rows.push({
              key: key.trim(),
              value: value.trim(),
            });
          }
        }
      });
      return rows;
    }
    return null;
  }),

  init() {
    this._super(...arguments);
    this.set('data', this.data);
  },

  actions: {

    deleteRow(key) {
      return this._deleteRow(key);
    }
  },

  _deleteRow(key) {
    const rows = A(this.rows);
    remove(rows, (row) => row.key === key);
    const entries = rows.map((row) => `${row.key}: ${row.value}`);
    const data = join(entries, '\n');
    this.set('data', data);
  }

});
