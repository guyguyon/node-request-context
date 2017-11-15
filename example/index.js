const http = require('http');
const uuid = require('uuid');

const namespace = require('../').createNamespace('ns');
const SomeResource = require('./some_resource');



http.createServer(function (req, res) {	
	namespace.run(() => {
		const randomUUID = uuid.v1();
		console.log('Setting a new transaction id => ', randomUUID);
		namespace.set('tid', randomUUID);

		console.log(namespace.get('tid'));
        const sr = new SomeResource();

		sr.get().then((ans) => {
			console.log(namespace.get('tid'));
			res.end(ans);
		}).catch((err) => {
		    console.log('Error: ', err);
        })
	})

}).listen(8079);
