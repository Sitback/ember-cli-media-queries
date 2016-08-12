import Ember from 'ember';
import layout from '../templates/components/responsive-container';

export default Ember.Component.extend({
  layout,

  media: Ember.inject.service('mediaQueries'),
  classNameBindings: ['media.classNames'],
});
