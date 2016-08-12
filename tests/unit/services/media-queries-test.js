import Ember from 'ember';
import { moduleFor, test } from 'ember-qunit';

moduleFor('service:media-queries', 'Unit | Service | media queries', {
  // Specify the other units that are required for this test.
  // needs: ['service:foo']
});

// Replace this with your real tests.
test('it initializes matches', function(assert) {
  let service = this.subject();
  assert.ok(Ember.isArray(service.get('matches')));
});
