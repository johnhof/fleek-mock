'use strict';

const _        = require('lodash');
const SWAGGER  = require('./../../config/swagger');

let classify = (parameters, type) => {
  switch (type) {
    case 'query':
      let _parameters = [];
      _.each(parameters, (item) => {
        if (item.in === 'query' && item.name) _parameters.push(item.name);
      });
      return _parameters;
    break;
  }
};

let parameters = (method, path, type) => {
  if (!path || !method) return false;
  try {
    let _parameters = SWAGGER.paths[path][method].parameters;
    _parameters     = type ? classify(_parameters, type) : _parameters;
    return _parameters;
  } catch (err) {
    console.log(err.stack);
    return false;
  }
};

module.exports = parameters;
