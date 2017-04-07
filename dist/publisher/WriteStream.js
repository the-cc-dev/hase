'use strict';

var stream = require('stream'),
    util = require('util');

var Writable = stream.Writable;

var WriteStream = function WriteStream(channel, name) {
  Reflect.apply(Writable, this, [{ objectMode: true }]);

  this.channel = channel;
  this.name = name;
};

util.inherits(WriteStream, Writable);

/* eslint-disable no-underscore-dangle */
WriteStream.prototype._write = function (chunk, encoding, callback) {
  /* eslint-enable no-underscore-dangle */
  this.channel.publish(this.name, '', new Buffer(JSON.stringify(chunk), 'utf8'), {
    persistent: true
  });
  callback(null);
};

module.exports = WriteStream;