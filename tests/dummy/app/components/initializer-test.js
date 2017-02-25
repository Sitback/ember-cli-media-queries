import Ember from 'ember';
import layout from '../templates/components/initializer-test';

export default Ember.Component.extend({
  layout,

  classNameBindings: ['media.isDesktopPlus:injection-pass:injection-fail'],
  classNames: ['initializer-test'],
});
