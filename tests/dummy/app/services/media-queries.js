import Ember from 'ember';
import MediaQueries from 'ember-cli-media-queries/services/media-queries';

export default MediaQueries.extend({
  media: {
    mobile:      '(max-width: 768px)',
    tablet:      '(min-width: 769px) and (max-width: 992px)',
    desktop:     '(min-width: 993px) and (max-width: 1200px)',
    jumbo:       '(min-width: 1201px)',
    desktopPlus: '(min-width: 993px)',
  },

  fastboot: Ember.inject.service(),

  detectFastboot: Ember.on('init', function() {
    if (this.get('fastboot.isFastBoot')) {
      // Testing FastBoot by emulating Mobile layout
      this.emulate('mobile');
    }
  }),
});
