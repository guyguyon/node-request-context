[![npm version](https://badge.fury.io/js/node-request-context.svg)](http://badge.fury.io/js/node-request-context/)
[![Build Status](https://secure.travis-ci.org/guyguyon/node-request-context.svg?branch=master)](http://travis-ci.org/guyguyon/node-request-context)
[![Known Vulnerabilities](https://snyk.io/test/github/guyguyon/node-request-context/badge.svg)](https://snyk.io/test/github/guyguyon/node-request-context)



# Node Request Context

Node request context let you save any context per request and easily retrieve it.
Read my blog post about [building the package on Medium](https://medium.com/@guysegev/async-hooks-a-whole-new-world-of-opportunities-a1a6daf1990a)

> Attention! This package is using the new [async hooks](https://nodejs.org/api/async_hooks.html) API, which is available from Node 8.9.0, but still experimental. It is strongly recommended NOT to use in production environments.  

## Install

```bash
npm install node-request-context
```

## Usage

Node request context behaves pretty similar to [continuation-local-storage](https://github.com/othiym23/node-continuation-local-storage).


```javascript
const http = require('http');
const uuid = require('uuid');

// Create a namespace
const { createNamespace } = require('node-request-context');
const namespace = createNamespace('myapp.mynamespace');


http.createServer(function (req, res) {	
  // Wrap your request with namespace.run
  namespace.run(() => {
    const transactionId = uuid.v1();

    // Set any variable using the set function
    namespace.set('tid', transactionId);

    someAsyncFunc.then((data) => {

      // Get your variable using namespace.get 
      console.log('Some message', { transactionId: namespace.get('tid') });
      res.end(data);
    }).catch((err) => {
      console.log(err.message, { transactionId: namespace.get('tid') });
    });
  });

}).listen(8079);
``` 

You can retrieve any context variable in any other file

```javascript
const { getNamespace } = require('node-request-context');
const namespace = getNamespace('myapp.mynamespace');

class A {
  foo() {
    const tid = namespace.get('tid')
  }
}
```

## Example

To run a working example

1. Clone this repo
2. Make sure node > 8.9.0 is installed
2. Run `npm run example`
3. Open another terminal tab and run `curl localhost:8080`

## Author

Guy Segev 

[Email](mailto:guyguyon@gmail.com)  |  [LinkedIn](https://www.linkedin.com/in/guyguyon)  

## Contributing

1. Fork it
2. Create your feature branch (`git checkout -b my-new-feature`)
3. Commit your changes (`git commit -am 'Add some feature'`)
4. Push to the branch (`git push origin my-new-feature`)
5. Create new Pull Request