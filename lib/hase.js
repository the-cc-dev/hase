'use strict';

var util = require('util');

var amqp = require('amqplib/callback_api');

var Mq = require('./Mq');

var hase = {};

hase.connect = function (url, callback) {
  if (!url) {
    throw new Error('Url is missing.');
  }

  if (!callback) {
    throw new Error('Callback is missing.');
  }

  amqp.connect(url, {}, function (err, connection) {
    if (err) {
      return callback(new Error(util.format('Could not connect to %s.', url)));
    }

    connection.createChannel(function (err, channel) {
      if (err) {
        return callback(err);
      }

      callback(null, new Mq(connection, channel));
    });
  });
};

module.exports = hase;