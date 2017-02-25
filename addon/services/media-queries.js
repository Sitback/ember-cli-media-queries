import Ember from 'ember';

export default Ember.Service.extend({
  matches: null,
  matcher: window.matchMedia,
  media: null, // Object hash of media query rules -- to be extended

  _matchers: null,

  classNames: Ember.computed('matches.[]', function() {
    let transformFunc = this.get('classNameFromQueryKey').bind(this);
    return this.get('matches').map(transformFunc).join(' ');
  }),

  classNameFromQueryKey(key) {
    return `media-${Ember.String.dasherize(key)}`;
  },

  init() {
    this._super(...arguments);

    let media = this.get('media');
    Ember.assert('ember-cli-media-queries: `media` must be overridden as a JavaScript object in media-queries service', Ember.typeOf(media) === 'object');

    this.set('matches', Ember.A());

    let matchers = {};
    let matcher = (this.get('matcher') || window.matchMedia);
    let isMatcherFunction = (typeof matcher === 'function');

    Object.keys(media).forEach((key) => {
      let isMediaKey = `is${Ember.String.classify(key)}`;

      if (!isMatcherFunction) {
        // matcher function is missing e.g. FastBoot
        this.set(isMediaKey, false);
        return;
      }

      let query = media[key];
      let mediaQueryList = matcher(query);

      let listener = Ember.run.bind(this, function(mql) {
        this.set(isMediaKey, mql.matches);
        if (mql.matches) {
          this.get('matches').pushObject(key);
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

  emulate(...mediaTypes) {
    let media = this.get('media');
    let matches = [];
    Object.keys(media).forEach((key) => {
      let isMediaKey = `is${Ember.String.classify(key)}`;
      let isMediaMatch = (mediaTypes.indexOf(key) !== -1);
      this.set(isMediaKey, isMediaMatch);
      if (isMediaMatch) {
        matches.push(key);
      }
    });
    this.get('matches').setObjects(matches);
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
