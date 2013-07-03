/*jshint strict:true node:true es5:true onevar:true laxcomma:true laxbreak:true*/
/*
 * SERVER
 */
(function () {
  "use strict";

  var steve = require('./steve')
    , connect = require('connect')
    , _ = require('underscore')
    , forEachAsync = require('forEachAsync')
    , app = connect.createServer()
    ;


  function getHello(request, response) {
    response.json(request.params);
    response.end();
  }

  function router(rest) {
    rest.get('/left/:name?', post(0));
    rest.get('/arrived/:name?', post(1));
  }
  
  function post(state) {
    var data = {};
    data.state = state;
    data.timestamp = new Date().getTime();
    $.ajax({
      type: 'POST',
      crossDomain: true,
      contentType: "application/json",
      url: dbIp,
      data: data,
      success: function(result) {
        update(result);
      }
    });
  }

  app
    .use(steve)
    .use(connect.router(router))
    ;

  module.exports = app;
}());
