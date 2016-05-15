'use strict';

const MID_METHOD     = require('./method');
const MID_CONTROLLER = require('./controller');
const MIDDLEWARES    = [MID_METHOD, MID_CONTROLLER];

module.exports       = MIDDLEWARES;
