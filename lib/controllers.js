'use strict';

const _        = require('lodash');
const IS       = require('is_js');
const FLEEK    = require('./../helpers/').fleek;
const SWAGGER  = require('./../config/swagger');
const MODELS   = require('./../config/models');
const METHODS  = ['get', 'put', 'post', 'delete'];

let queries = (ctx_query, queries) => {
  let _queries = {};
  _.each(ctx_query, (query, index) => {
    if (queries.indexOf(index) > -1) _queries[index] = query;
  });
  return _queries;
};

module.exports = () => {
  let controllers = {};
  _.each(MODELS, (model, index) => {
    controllers[index] = {};
    METHODS.forEach( (method) => {
      switch (method) {
        case 'get':
          controllers[index][method] = function * () {
            let ctx = this;
            try {
              let id         = ctx.params.id ? ctx.params.id : false || false;
              let parameters = FLEEK.parameters('get', ctx.fleek.routeConfig.path, 'query') || false;
              if ( ( parameters && IS.array(parameters) ) && !id ) {
                let searchQueries = queries(ctx.query, parameters);
                let model         = ctx.state.Models[index];
                let result        = yield model.find({ $or: [searchQueries]});
                let response      = FLEEK.response('get', ctx.fleek.routeConfig.path, '200', result);
                yield ctx.respond(ctx, true, 200, response);
              } else if (id) {
                let model         = ctx.state.Models[index];
                let result        = yield model.find({_id: id});
                let response      = FLEEK.response('get', ctx.fleek.routeConfig.path, '200', result);
                yield ctx.respond(ctx, true, 200, response);
              } else {
                yield ctx.respond(ctx, false, 412, {error: 'Other options not available yet'});
              }
            } catch (err) {
              console.error(err.stack);
              yield ctx.respond(ctx, false, 500, err);
            }
          };

        break;
        case 'post':
          controllers[index][method] = function * () {
            let ctx = this;
            try {
              if (ctx.request.body && Object.keys(ctx.request.body).length > 0) {
                let item  = ctx.fleek.validate.object(
                  ctx.request.body,
                  SWAGGER.definitions[index + '.' + method].properties,
                  {
                    trim: true,
                    defaults: true
                  }
                );

                let model = new ctx.state.Models[index](item);
                yield model.save();

                let response = FLEEK.response('post', ctx.fleek.routeConfig.path, '201', model);
                yield ctx.respond(ctx, true, 201, response);
              } else {
                yield ctx.respond(ctx, false, 412, {
                  error: 'The posted body is an empty object. Please make sure you are properly passing an application/json header with json or url-form-encoded data'
                });
              }
            } catch (err) {
              console.error(err.stack);
              yield ctx.respond(ctx, false, 500, err);
            }
          };

        break;
        case 'put':
          controllers[index][method] = function * () {
            let ctx = this;
            try {
              let id  = ctx.params.id ? ctx.params.id : false || false;
              if (ctx.request.body && Object.keys(ctx.request.body).length > 0) {
                let item  = ctx.fleek.validate.object(
                  ctx.request.body,
                  SWAGGER.definitions[index + '.' + method].properties,
                  {
                    trim: true,
                    defaults: true
                  }
                );

                let parameters = FLEEK.parameters('put', ctx.fleek.routeConfig.path, 'query') || false;
                if ( ( parameters && IS.array(parameters) ) && !id) {
                  let searchQueries = queries(ctx.query, parameters);
                  let model         = ctx.state.Models[index];
                  let result        = yield model.findOneAndUpdate({ $or: [searchQueries]}, item);
                  let response      = FLEEK.response('put', ctx.fleek.routeConfig.path, '200', result);
                  yield ctx.respond(ctx, true, 200, response);
                } else if (id) {
                  let model         = ctx.state.Models[index];
                  let result        = yield model.findOneAndUpdate({ _id: id}, item);
                  let response      = FLEEK.response('put', ctx.fleek.routeConfig.path, '200', result);
                  yield ctx.respond(ctx, true, 200, response);
                } else {
                  yield ctx.respond(ctx, false, 500, {error: 'Other options not available yet'});
                }
              } else {
                yield ctx.respond(ctx, false, 412, {
                  error: 'The posted body is an empty object. Please make sure you are properly passing an application/json header with json or url-form-encoded data'
                });
              }
            } catch (err) {
              console.error(err.stack);
              yield ctx.respond(ctx, false, 500, err);
            }
          };

        break;
        case 'delete':
          controllers[index][method] = function * () {
            let ctx = this;
            try {
              let id         = ctx.params.id ? ctx.params.id : false || false;
              let parameters = FLEEK.parameters('delete', ctx.fleek.routeConfig.path, 'query') || false;
              if ( ( parameters && IS.array(parameters) ) && !id) {
                let searchQueries = queries(ctx.query, parameters);
                let model         = ctx.state.Models[index];
                let result        = yield model.remove({ $or: [searchQueries]});
                let response      = FLEEK.response('delete', ctx.fleek.routeConfig.path, '200', result);
                yield ctx.respond(ctx, true, 200, response);
              } else if (id) {
                let model         = ctx.state.Models[index];
                let result        = yield model.remove({ _id: id});
                let response      = FLEEK.response('delete', ctx.fleek.routeConfig.path, '200', result);
                yield ctx.respond(ctx, true, 200, response);
              } else {
                yield ctx.respond(ctx, false, 412, {error: 'Other options not available yet'});
              }
            } catch (err) {
              console.error(err.stack);
              yield ctx.respond(ctx, false, 500, err);
            }
          };

        break;
      };
    });
  });

  return controllers;
};
