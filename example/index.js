const http = require('http');
const uuid = require('uuid');

const namespace = require('../').createNamespace('ns');
const SomeResource = require('./some_resource');


let counter = 1;

http.createServer(function (req, res) {	
	namespace.run(() => {
		
		console.log('Setting a new transaction id: ', counter);
		
		namespace.set('tid', counter);
		counter++;

		console.log('Getting our transaction id: ', namespace.get('tid'));

        const sr = new SomeResource();

		sr.get().then((ans) => {
		    setTimeout(() => {
                console.log('Getting our transaction id inside setTimeout: ', namespace.get('tid'));
            }, 5000);

			res.end('done!');
		}).catch((err) => {
		    console.log('Error: ', err);
        })
	})

}).listen(8080, () => console.log('App listening on port 8080!'));
