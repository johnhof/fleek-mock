'use strict';

const ERROR = 'An internal server error has occured';

module.exports = function * (next) {
  let ctx     = this;
  let respond = function * (ctx, success, code, body) {
    let response = { success: success, code: code, body: body };
    try {
      ctx.response.status = code;
      ctx.response.body   = response;
      return true;
    } catch (err) {
      response.code       = 500;
      response.success    = false;
      response.body       = { error: ERROR };
      ctx.response.status = response.code;
      ctx.response.body   = response;

      console.error(err.stack);
      return false;
    }
  };

  ctx.respond = respond;
  yield next;

};
