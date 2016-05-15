'use strict';

// Proposed helper to Fleek involving Parameter Utility
const PARAMETERS     = require('./fleek/parameters');
const PATH           = require('./fleek/path');
const RESPONSE       = require('./fleek/response');

let fleek = {};

fleek.parameters  = PARAMETERS;
fleek.path        = PATH;
fleek.response    = RESPONSE;

module.exports.fleek = fleek;
