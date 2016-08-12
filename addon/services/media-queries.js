import Ember from 'ember';

export default Ember.Service.extend({
  matches: null,
  matcher: window.matchMedia,
  media: null, // Object hash of media query rules -- to be extended

  _matchers: null,

  classNames: Ember.computed('matches.[]', function() {
    return this.get('matches').map(this.get('classNameFromQueryKey')).join(' ');
  }),

  classNameFromQueryKey(key) {
    return `media-${Ember.String.dasherize(key)}`;
  },

  init() {
    this._super(...arguments);

    let media = this.get('media');
    Ember.assert('`media` must be overridden as a JavaScript object', Ember.typeOf(media) === 'object');

    this.set('matches', Ember.A());

    let matchers = {};
    let matcher = (this.get('matcher') || window.matchMedia);
    Object.keys(media).forEach((key) => {
      let query = media[key];
      let mediaQueryList = matcher(query);
      let isMedia = `is${Ember.String.classify(key)}`;

      let listener = Ember.run.bind(this, function(mql) {
        this.set(isMedia, mql.matches);
        if (mql.matches) {
          this.get('matches').addObject(key);
        } else {
          this.get('matches').removeObject(key);
        }
      });

      if (mediaQueryList.addListener) {
        mediaQueryList.addListener(listener);
        matchers[key] = {
          mediaQueryList,
          listener,
        };
      }

      listener(mediaQueryList);
    });

    this.set('_matchers', matchers);
  },

  willDestroy() {
    let matchers = this.get('_matchers');
    if (matchers) {
      Object.keys(matchers).forEach((key) => {
        matchers[key].mediaQueryList.removeListener(matchers[key].listener);
      });
    }

    return this._super(...arguments);
  },
});
