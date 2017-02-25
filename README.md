# Ember CLI Media Queries

Ember CLI Media Queries makes it easy to listen to changes to media query matches. It is heavily inspired by [Ember CLI Responsive](https://github.com/AVCEngineering/ember-cli-responsive) but has been reworked for Ember 1.13 and above and implemented as a [service](http://emberjs.com/api/classes/Ember.Service.html).

## Usage

### Defining Breakpoints

Extend Media Queries service to define your breakpoints in the `media` property.

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

### Observing Breakpoints

Inject the service on to your components (controllers, routes, or anything!).

```js
import Ember from 'ember';

export default Ember.Component.extend({
  mediaQueries: Ember.inject.service()
});
```

You then can detect each breakpoint:

```js
  this.get('mediaQueries.isMobile'); // => true
```

Also in templates:

```htmlbars
{{#if media.isDesktop}}
  Desktop view!
{{/if}}
```

### Breakpoint Class Names

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

## Contribution

* `git clone <repository-url>` this repository
* `cd ember-cli-media-queries`
* `npm install`
* `bower install`

## Running Tests

* `npm test` (Runs `ember try:each` to test your addon against multiple Ember versions)
* `ember test`
* `ember test --server`

For more information on using ember-cli, visit [https://ember-cli.com/](https://ember-cli.com/).
