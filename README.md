# hase

hase handles exchanges and queues on RabbitMQ.

## Installation

At the moment, installation of this module must be made manually.

## Quick start

First you need to add a reference to hase in your application.

```javascript
var hase = require('hase');
```

Then you need to connect to a RabbitMQ instance by calling the `connect` function and providing the instance's url.

```javascript
hase.connect('amqp://...', function (err, mq) {
  // ...
});
```

In case the connection is lost or something goes wrong, an error is emitted on the `mq` object. So you should subscribe to the `error` object.

```javascript
hase.connect('amqp://...', function (err, mq) {
  mq.once('error', function (err) {
    // ...
  });
});
```

### Using a worker

A worker is a combination of a single exchange with a single queue that shares its load across multiple workers. For that, call the `worker` function and specify a name.

```javascript
hase.connect('amqp://...', function (err, mq) {
  var worker = mq.worker('test');
});
```

To publish messages to this worker, call the `createWriteStream` function, and then use the `write` function of the stream that is returned.

```javascript
hase.connect('amqp://...', function (err, mq) {
  mq.worker('test').createWriteStream(function (err, stream) {
    stream.write({ foo: 'bar' });
  });
});
```

## Running the build

This module can be built using [Grunt](http://gruntjs.com/). Besides running the tests, this also analyses the code. To run Grunt, go to the folder where you have installed hase and run `grunt`. You need to have [grunt-cli](https://github.com/gruntjs/grunt-cli) installed.

    $ grunt

## License

The MIT License (MIT)
Copyright (c) 2014 the native web.

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
