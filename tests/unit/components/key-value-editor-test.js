import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';

module.only('Unit | Components | key-value-editor', function(hooks) {
  setupTest(hooks);

  // Replace this with your real tests.
  test('it exists', function(assert) {
    let component = this.owner.lookup('component:key-value-editor');
    assert.ok(component);
  });

  module('#rows', function() {

    test('should convert the given data (multiple lines of ":" separated key/value strings) into an array of row objects', function(assert) {
      // given
      let component = this.owner.lookup('component:key-value-editor');
      const requestHeaders = 'Authorization:Bearer abcd-1234\nContent-Type : application/json ';
      component.set('data', requestHeaders);

      // when
      const actualRows = component.rows;

      // then
      const expectedRows = [
        { key: 'Authorization', value: 'Bearer abcd-1234' },
        { key: 'Content-Type', value: 'application/json' }
      ];
      assert.deepEqual(actualRows, expectedRows);
    });
  });

  module('>_deleteRow', function() {

    test('should remove an entry', function(assert) {
      // given
      let component = this.owner.lookup('component:key-value-editor');
      const requestHeaders = 'Authorization:Bearer abcd-1234\nContent-Type : application/json \nCache-Control: no-cache\n';
      component.set('data', requestHeaders);

      // when
      component._deleteRow('Content-Type');

      // then
      assert.deepEqual(component.data, 'Authorization: Bearer abcd-1234\nCache-Control: no-cache');
      assert.deepEqual(component.rows, [
        { key: 'Authorization', value: 'Bearer abcd-1234' },
        { key: 'Cache-Control', value: 'no-cache' },
      ]);
    });
  });
});
