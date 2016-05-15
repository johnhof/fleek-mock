'use strict';

module.exports = function * (next) {
  try {
    switch (this.request.method) {
      case 'GET':
      break;
      case 'POST':
      break;
      case 'PUT':
      break;
      case 'DELETE':
      break;
    }
    yield next;
  } catch ( err ) {
    console.error(err.stack);
    yield next;
  }

};
