'use strict';

const _        = require('lodash');
const IS       = require('is_js');
const SWAGGER  = require('./../../config/swagger');

/**

Only supports Schema Objects for now.
Proposed Helper change for fleek-response

**/

let checkType = (item, type) => {
  if (!item || !type ) throw new Error('Please verify Swagger Documentation has proper types in Models');
  type = type.toLowerCase();
  switch (type) {
    case 'array':
      item = ( IS.array(item) ) ? item : [];
    break;
    case 'boolean':
      item = ( IS.boolean(item) ) ? item : null;
    break;
    case 'date':
      item = ( IS.date(item) ) ? item : null;
    break;
    case 'null':
      item = ( IS.null(item) ) ? item : null;
    break;
    case 'number':
      item = ( IS.number(item) ) ? item : null;
    break;
    case 'object':
      item = ( IS.object(item) ) ? item : {};
    break;
    case 'json':
      item = ( IS.json(item) ) ? item : {};
    break;
    case 'string':
      item = ( IS.string(item) ) ? item : '';
    break;
    case 'integer':
      item = ( IS.integer(item) ) ? item : null;
    break;
    case 'decimal':
      item = ( IS.decimal(item) ) ? item : null;
    break;
  }
  return item;
};

let matchAndHygiene = (data, properData) => {
  let cleanedData = {};

  _.each(properData, (value, key) => {
    cleanedData[key] = checkType( (data[key] ? data[key] : data), value.type);
  });

  return cleanedData;
};

let response = (method, path, code, data) => {
  if (!path || !method || !code) return false;
  try {

    /**
    console.log('method', method);
    console.log('path', path);
    console.log('code', code);
    console.log('Path Document');
    console.log(SWAGGER.paths[path]);
    console.log('Specific Response');
    console.log(SWAGGER.paths[path][method].responses[code].schema.items.$ref);
    **/

    let responseObjectLookup = SWAGGER.paths[path][method].responses[code].schema.items.$ref;

    responseObjectLookup.trim();

    responseObjectLookup     = responseObjectLookup.replace('#/definitions/', '');
    let responseObject       = SWAGGER.definitions[responseObjectLookup].properties.data.properties;
    let cleanResponse        = matchAndHygiene(data, responseObject);
    const _RESPONSE          = cleanResponse;
    return _RESPONSE;
  } catch (err) {
    let responseObject = SWAGGER.definitions.error.properties.data.properties;
    let cleanResponse  = {error: true};
    const _RESPONSE    = cleanResponse;
    return false;
  }
};


module.exports = response;
