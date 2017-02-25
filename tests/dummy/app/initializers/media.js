export function initialize() {
  let app = arguments[1] || arguments[0];
  app.inject('controller', 'media', 'service:media-queries');
  app.inject('component', 'media', 'service:media-queries');
  app.inject('route', 'media', 'service:media-queries');
  app.inject('view', 'media', 'service:media-queries');
}

export default {
  name: 'media',
  initialize
};
