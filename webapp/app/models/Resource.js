import EmberObject from '@ember/object';

export default EmberObject.extend({

  id: null, // String
  url: null, // String
  method: null, // String
  headers: null, // String (\n separated variables)
  body: null, // String

});
