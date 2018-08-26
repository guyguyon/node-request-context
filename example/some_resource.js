const request = require('request-promise-native');
const namespace = require('../index').getNamespace('ns');


class SomeResource {

	get() {
		console.log('Getting our transaction id in a different file: ', namespace.get('tid'));

		return request('http://www.google.com').then((res) => {
			console.log('Getting our transaction id after async request: ', namespace.get('tid'));
			return res;
		})
	}
}

module.exports = SomeResource;