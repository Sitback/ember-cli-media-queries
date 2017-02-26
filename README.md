[![Build Status](https://travis-ci.org/varoot/ember-cli-media-queries.svg?branch=master)](https://travis-ci.org/varoot/ember-cli-media-queries)
# Ember CLI Media Queries

Ember CLI Media Queries makes it easy to listen to changes to media query matches. It is heavily inspired by [Ember CLI Responsive](https://github.com/AVCEngineering/ember-cli-responsive) but has been reworked for Ember 2.0 (1.13 also supported) and implemented as a [service](http://emberjs.com/api/classes/Ember.Service.html).

## Usage

### Defining Media Queries

Extend `media-queries` service to define your media queries (e.g. breakpoints, device orientations) in the `media` property.

```js
// app/services/media-queries.js
import MediaQueriesService from 'ember-cli-media-queries/services/media-queries';

export default MediaQueriesService.extend({
  media: {
    mobile:      '(max-width: 768px)',
    tablet:      '(min-width: 769px) and (max-width: 992px)',
    desktop:     '(min-width: 993px) and (max-width: 1200px)',
    jumbo:       '(min-width: 1201px)',
  },
});
```

### Observing Media Query Changes

Inject the service on to your components (controllers, routes, or anything!).

```js
import Ember from 'ember';

export default Ember.Component.extend({
  mediaQueries: Ember.inject.service()
});
```

You then can detect each media query match`:

```js
  this.get('mediaQueries.isMobile'); // => true
```

Also in templates:

```htmlbars
{{#if mediaQueries.isDesktop}}
  Desktop view!
{{/if}}
```

### Media Query Class Names

`mediaQueries.classNames` returns a string of class names so you can easily bind it to a component

```js
import Ember from 'ember';

export default Ember.Component.extend({
  mediaQueries: Ember.inject.service(),
  classNamesBindings: ['mediaQueries.classNames']
});
```

will render:

```html
<div class="ember-view media-desktop"></div>
```

By default, class names are dasherized and prefixed with `media-`. You can change this behavior by overriding `classNameFromQueryKey` when you extend the service. For example:

```js
// app/services/media-queries.js
import MediaQueriesService from 'ember-cli-media-queries/services/media-queries';

export default MediaQueriesService.extend({
  media: {
    desktop:     '(min-width: 993px) and (max-width: 1200px)',
    // ... other rules omitted
  },

  classNameFromQueryKey(key) {
    return `--${key}`;
  }
});
```

will render the component as:

```html
<div class="ember-view --desktop"></div>
```

## Supporting IE 8 and 9

Since IE 8 and 9 does not support [matchMedia](http://caniuse.com/#feat=matchmedia). You need to include [a polyfill](https://github.com/paulirish/matchMedia.js/) from Bower to make this work.

Run `bower install matchMedia -S` then import the module in your `ember-cli-build.js`

```js
// ember-cli-build.js
  app.import('bower_components/matchMedia/matchMedia.js');
```

## Testing

Since we cannot resize the window in PhantomJS, Ember CLI Media Queries provides an `emulate` function to emulate the media query changes. Please note that this does not actually change the window size but merely what `media-queries` service returns.

### Integration Test

Inject `media-queries` service and call `emulate` at the beginning of your test code, before you render your component.

```js
  this.inject.service('media-queries');
  this.get('media-queries').emulate('mobile', 'portrait'); // Set isMobile and isPortrait to true
```

The arguments for `emulate` must be strings of *all* the media queries you want to match. Media queries not listed in the arguments will be set to `false`.

Note:
1. If you want to call `emulate` after the component is rendered, you need to wrap the call within `Ember.run` so the component can detect the changes in the media queries.
2. `emulate` overrides the values temporarily. Window resize will trigger re-evaluation and might cause unexpected result. Therefore `emulate` should not be used in the browser.
3. To keep this function simple, it does not validate whether your matches are possible or not (e.g. being both mobile and desktop and the same time). Therefore, it is your responsibility to make sure that your emulation makes sense.

## Using with FastBoot

(FastBoot)[http://ember-fastboot.com/] runs Ember in Node.js and returns server-rendered HTML to the browser. There is no effective way to detect browser size on the server and so Ember CLI Media Queries is not very useful in FastBoot mode. By default, all the matches will be considered `false` (i.e. it is neither mobile nor desktop), so you need to consider this while developing for FastBoot. However, you can use `emulate` function (see above) to change the default matches.

For example, you can detect FastBoot when you initialize the `media-queries` service and emulate mobile device.

```js
// app/services/media-queries.js
import MediaQueriesService from 'ember-cli-media-queries/services/media-queries';

export default MediaQueriesService.extend({
  media: {
    desktop:     '(min-width: 993px) and (max-width: 1200px)',
    // ... other rules omitted
  },

  fastboot: Ember.inject.service(),

  detectFastboot: Ember.on('init', function() {
    if (this.get('fastboot.isFastBoot')) {
      this.emulate('mobile');
    }
  }),
});
```

## Migrating from Ember CLI Responsive

1. Make a `media-queries` service that extends 'ember-cli-media-queries/services/media-queries' and move media query rules from `app.js` here. (See [Defining Media Queries](#defining-media-queries))

  Remove `import 'ember-cli-responsive/responsive'` from your `app.js` and `App.responsive` call.

2. Unlike Ember CLI Responsive, Ember CLI Media Queries does not inject its service automatically onto routes, controllers, components, and  views.

  You can either inject the service manually where you use it. (Please note that Ember CLI Responsive use `media` as the name of the injection, but you can choose different name here)

  ```js
    media: Ember.inject.service('media-queries'),
  ```

  Or use an Initializer. See [an example Initializer on the dummy app](https://github.com/varoot/ember-cli-media-queries/blob/master/tests/dummy/app/initializers/media.js).

For more information on using ember-cli, visit [https://ember-cli.com/](https://ember-cli.com/).
