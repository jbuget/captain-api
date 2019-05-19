import Service from '@ember/service';
import { A } from '@ember/array';

export default Service.extend({

  variables: null,

  init() {
    this._super(...arguments);
    this.reloadVariables();
  },

  reloadVariables() {
    let variables = A();
    const storedVariables = window.localStorage.getItem('settingsVariables');
    if (storedVariables) {
      variables = A(JSON.parse(storedVariables));
    }
    this.set('variables', variables);
  },

  updateVariables() {
    const serializedVariables = JSON.stringify(this.variables);
    window.localStorage.setItem('settingsVariables', serializedVariables);
  },

  getVariable(key) {
    return this.variables.findBy('key', key);
  },

  replaceVariables(expression) {
    if (expression) {
      return expression.replace(/{{\s*[\w.]+\s*}}/g, (match) => {
        let key = match.replace(/{{\s*/g, '');
        key = key.replace(/\s*}}/g, '');
        return this.getVariable(key).value;
      });
    }
    return null;
  },

});
