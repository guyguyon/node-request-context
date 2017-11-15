const asyncHooks = require('async_hooks');
const Namespace = require('./namespace');

const namespaces = {};

function createNamespace(name) {
    if (namespaces[name]) { throw new Error(`A namespace for ${name} is already exists`); }

    const namespace = new Namespace();
    namespaces[name] = namespace;


    function init(asyncId, type, triggerId, resource) {
        if (!namespace.context[asyncId]) {
            namespace.context[asyncId] = namespace.context[triggerId];
        }
    }

    function destroy(asyncId) {
        delete namespace.context[asyncId];
    }

    const asyncHook = asyncHooks.createHook({ init, destroy });

    asyncHook.enable();

    return namespace;
}

function getNamespace(name) {
    // console.log('namespaces', namespaces);
    return namespaces[name];
}


module.exports = {
    createNamespace,
    getNamespace
};
