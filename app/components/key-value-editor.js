import Component from '@ember/component';
import { computed } from '@ember/object';
import { A } from '@ember/array';
import { defaultTo, join, remove } from 'lodash';

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
      this.data.split('\n').forEach((row, index) => {
        let [key, value] = row.split(':');

        key = defaultTo(key, '');
        value = defaultTo(value, '');

        rows.push({
          id: index,
          key: key.trim(),
          value: value.trim(),
        });
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

    insertRow() {
      if (!this.data || this.data.trim() === '') {
        this.set('data', ':');
      } else {
        this.set('data', `${this.data}\n:`);
      }
    },

    deleteRow(id) {
      return this._deleteRow(id);
    },

    updateRows() {
      const data = this.rows.reduce((data, row) => {
        const entry = `${row.key}: ${row.value}`;
        if (!data || data === '') {
          return entry;
        }
        return `${data}\n${entry}`;
      }, '');

      this.set('data', data);
    }
  },

  _deleteRow(id) {
    const rows = A(this.rows);
    remove(rows, (row) => row.id === id);
    const entries = rows.map((row) => `${row.key}: ${row.value}`);
    const data = join(entries, '\n');
    this.set('data', data);
  }

});
