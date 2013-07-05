/*jshint strict:true node:true es5:true laxcomma:true laxbreak:true*/
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
    , http = require('http')
    , options = {
        hostname: 'localhost',
        port: 5984,
        path: '/commute-tracker',
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        }
      }
    ;

  function router(rest) {
    rest.get('/left', left);
    rest.get('/arrived', arrived);
  }
  
  function left (req, res) {
    console.log(req.query);
    postToCouch(0, res, req.query);
  }
  function arrived (req, res) {
    postToCouch(1, res, req.query);
  }

  function postToCouch(state, res, query) {
    var data = {};
    data.user = 'kywe665';
    data.tripId = query['?id'];
    data.state = state;
    data.timestamp = new Date().getTime();
    data.invalid = false;
    if(query.invalid){
      console.log('going to db invalid');
      data.invalid = true;
    }
    var req = http.request(options, function(res) {
      console.log('STATUS: ' + res.statusCode);
      console.log('HEADERS: ' + JSON.stringify(res.headers));
      res.setEncoding('utf8');
      res.on('data', function (chunk) {
        console.log('BODY: ' + chunk);
      });
    });
    req.on('error', function(e) {
      console.log('problem with request: ' + e.message);
    });
    req.write(JSON.stringify(data));
    req.end();
    res.json({'cthulu':'oryleh'});
  }

  app
    .use(steve)
    .use(connect.router(router))
    ;

  module.exports = app;
}());
