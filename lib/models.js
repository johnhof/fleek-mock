'use strict';

const _        = require('lodash');
const MONGOOSE = require('mongoose');
const MODELS   = require('./../config/models');

let _models      = {};
let _modelSchema = null;

_.each(MODELS, (model, index) => {
  _modelSchema   = new MONGOOSE.Schema(model);
  _models[index] = MONGOOSE.model(index, _modelSchema);
});


module.exports = function * (next) {
  let ctx          = this;
  ctx.state.Models = _models;
  yield next;
};
