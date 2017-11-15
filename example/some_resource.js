const request = require('request-promise-native');
const namespace = require('../index').getNamespace('ns');


class SomeResource {

	get() {
		console.log(namespace.get('tid'));

		return request('http://www.google.com').then((res) => {
			console.log(namespace.get('tid'));
			return res;
		})
	}
}

module.exports = SomeResource;