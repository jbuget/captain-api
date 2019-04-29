import Component from '@ember/component';
import { A } from '@ember/array';
import fetch from 'fetch';
import Resource from 'pixman/models/Resource';

export default Component.extend({

  importUrl: null,

  actions: {

    async importResources() {
      if (this.importUrl) {
        const response = await fetch(this.importUrl);
        const json = await response.json();

        const scheme = json.schemes[0];
        const hostname = json.host;
        const basePath = json.basePath;

        const resources = Object.keys(json.paths).reduce((accu, path) => {
          const requestGroup = json.paths[path];
          Object.keys(requestGroup).forEach((method) => {
            const operation = requestGroup[method];
            accu.push(Resource.create({
              name: operation.operationId,
              method: method.toUpperCase(),
              url: `${scheme}:${hostname}${basePath}${path}`
            }));
          });
          return accu;
        }, A());
        return this.onImport(resources);
      }
    }
  }
});
