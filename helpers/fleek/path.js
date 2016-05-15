'use strict';

const SWAGGER  = require('./../../config/swagger');

let path = (path) => {
  if (!path) return false;
  try {
    path = path.substring(0, s.indexOf('?'));
    path = path.replace(/[&\#,+()$~%.'":*?<>{}]/g, '');
    path.split(':');
    return path;
  } catch (err) {
    return false;
  }
};

module.exports = path;
