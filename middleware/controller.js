'use strict';

module.exports = function * (next) {
  try {
    let ctx = this;

    const FLEEK_PROPS           = ctx.fleek.routeConfig;
    const MIDDLEWARE_CONTROLLER = ( require('./controller_specific/' + FLEEK_PROPS.controller) || null );

    if (FLEEK_PROPS && MIDDLEWARE_CONTROLLER) ctx.request = yield MIDDLEWARE_CONTROLLER(ctx.request);
    yield next;
  } catch (err) {
    console.error(err.stack);
    yield next;
  }

};
