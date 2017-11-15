const asyncHooks = require('async_hooks');


class Namespace {

	constructor() {
		this.context = {};
	}

	run(fn) {
		const eid = asyncHooks.executionAsyncId();
		this.context[eid] = {};
		fn();
	}

	set(key, val) {
		const eid = asyncHooks.executionAsyncId();
		this.context[eid][key] = val;
	}

	get(key) {
		const eid = asyncHooks.executionAsyncId();
		return this.context[eid][key]
	}
}

module.exports = Namespace;