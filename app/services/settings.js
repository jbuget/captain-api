import Service from '@ember/service';

export default Service.extend({

  variables: null,

  init() {
    this._super(...arguments);
    this.set('variables', [
      { key: 'HOST', value: 'http://localhost:3000' },
      { key: 'ACCESS_TOKEN', value: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjo1LCJzb3VyY2UiOiJwaXgiLCJpYXQiOjE1NTcxNzgwMjUsImV4cCI6MTU1Nzc4MjgyNX0.Gs96mZ_36jTQKkkpXqbX7B2pIF2J4DyxbUK7naIIDAo' },
    ]);
  },

  getVariable(key) {
    return this.variables.findBy('key', key);
  },

  setVariables(editedVariables) {
    this.set('variables', editedVariables);
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
  }

});
