import { test } from 'qunit';
import moduleForAcceptance from '../../tests/helpers/module-for-acceptance';

moduleForAcceptance('Acceptance | initializer');

test('visiting /', function(assert) {
  visit('/');

  andThen(function() {
    let $target = findWithAssert('.initializer-test');
    assert.ok($target.hasClass('injection-pass'));
  });
});
