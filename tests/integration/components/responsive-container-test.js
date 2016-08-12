import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('responsive-container', 'Integration | Component | responsive container', {
  integration: true
});

test('it renders the name of the matching query', function(assert) {
  assert.expect(1);
  this.render(hbs`{{responsive-container}}`);

  assert.equal(this.$().text().trim(), 'Desktop');
});

test('it assigns correct class names', function(assert) {
  assert.expect(4);
  this.render(hbs`{{responsive-container}}`);

  let $el = this.$().children();

  assert.notOk($el.hasClass('media-mobile'));
  assert.notOk($el.hasClass('media-tablet'));
  assert.ok($el.hasClass('media-desktop'));
  assert.ok($el.hasClass('media-desktop-plus'));
});
