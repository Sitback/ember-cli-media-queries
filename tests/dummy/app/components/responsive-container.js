import Ember from 'ember';
import layout from '../templates/components/responsive-container';

export default Ember.Component.extend({
  layout,

  mediaQueries: Ember.inject.service(),
  classNameBindings: ['mediaQueries.classNames'],
});
