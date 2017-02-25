import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('responsive-container', 'Integration | Component | responsive container', {
  integration: true
});

test('emulate works with integration test', function(assert) {
  assert.expect(1);

  this.inject.service('media-queries');
  this.get('media-queries').emulate('mobile');

  this.render(hbs`{{responsive-container}}`);

  assert.equal(this.$().text().trim(), 'Mobile');

  // Note that the service is reset in the next test
});

test('it renders the name of the matching query', function(assert) {
  assert.expect(1);
  this.render(hbs`{{responsive-container}}`);

  assert.equal(this.$().text().trim(), 'Desktop');
});

test('it assigns correct class names', function(assert) {
  assert.expect(5);
  this.render(hbs`{{responsive-container}}`);

  let $el = this.$().children();

  assert.notOk($el.hasClass('media-mobile'));
  assert.notOk($el.hasClass('media-tablet'));
  assert.ok($el.hasClass('media-desktop'));
  assert.notOk($el.hasClass('media-jumbo'));
  assert.ok($el.hasClass('media-desktop-plus'));
});
