import Ember from 'ember';
import { moduleFor, test } from 'ember-qunit';

moduleFor('service:media-queries', 'Unit | Service | media queries', {
  // Specify the other units that are required for this test.
  // needs: ['service:foo']
});

test('it initializes matches', function(assert) {
  assert.expect(1);

  let service = this.subject();
  assert.ok(Ember.isArray(service.get('matches')));
});

test('emulate works', function(assert) {
  assert.expect(4);

  let service = this.subject();

  // Emulate impossible matches so we know it works
  service.emulate('mobile', 'desktop');

  let matches = service.get('matches');
  assert.equal(matches.get('length'), 2);
  assert.ok(matches.indexOf('mobile') !== -1);
  assert.ok(matches.indexOf('desktop') !== -1);

  assert.equal(service.get('classNames'), 'media-mobile media-desktop');
});
