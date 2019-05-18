import Component from '@ember/component';
import { A } from '@ember/array';
import {  defaultTo, join, remove } from 'lodash';

export default Component.extend({

  // Element
  classNames: ['key-value-editor'],

  // Props
  keyHeader: 'Key',
  valueHeader: 'Value',
  data: null,
  rows: null,

  init() {
    this._super(...arguments);
    this.set('data', this.data);
    this._updateRows();
  },

  didUpdateAttrs() {
    this._super(...arguments);
    this._updateRows();
  },

  actions: {

    insertRow() {
      return this._insertRow();
    },

    updateRow() {
      return this._updateRow();
    },

    deleteRow(id) {
      return this._deleteRow(id);
    },
  },

  _updateRow() {
    this.isRowsUpdatePartial = true;
    const data = this.rows.reduce((data, row) => {
      const entry = `${row.key}: ${row.value}`;
      if (!data || data === '') {
        return entry;
      }
      return `${data}\n${entry}`;
    }, '');
    this.set('data', data);
  },

  _updateRows() {
    if (!this.isRowsUpdatePartial) {
      const rows = A();
      if (this.data) {
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
      }
      this.set('rows', rows);
    }
    this.isRowsUpdatePartial = false;
  },

  _insertRow() {
    if (!this.data || this.data.trim() === '') {
      this.set('data', ':');
    } else {
      this.set('data', `${this.data}\n:`);
    }
    this._updateRows();
  },

  _deleteRow(id) {
    const rows = A(this.rows);
    remove(rows, (row) => row.id === id);
    const entries = rows.map((row) => `${row.key}: ${row.value}`);
    const data = join(entries, '\n');
    this.set('data', data);
    this._updateRows();
  }

});
