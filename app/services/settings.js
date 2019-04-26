import Service from '@ember/service';

export default Service.extend({

  variables: null,

  init() {
    this._super(...arguments);
    this.set('variables', [
      { key: 'HOST', value: 'http://localhost:3000' },
      { key: 'ACCESS_TOKEN', value: 'abcd-1234' },
    ]);
  },

  getVariable(key) {
    return this.variables.findBy('key', key);
  },

  setVariables(editedVariables) {
    this.set('variables', editedVariables);
  },

  replaceVariables(expression) {
    return expression.replace(/{{\s*[\w.]+\s*}}/g, (match) => {
      let key = match.replace(/{{\s*/g, '');
      key = key.replace(/\s*}}/g, '');
      return this.getVariable(key).value;
    });
  }

});
