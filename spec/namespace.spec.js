const asyncHooks = require('async_hooks');
const Namespace = require('../namespace');

jest.mock('async_hooks');

beforeEach(() => {
  asyncHooks.executionAsyncId.mockReset();
});

describe('Namespace unit tests', () => {
  it('should instantiate with empty context', () => {
    const namespace = new Namespace();
    expect(namespace.context).toEqual({});
  });

  it('should run', () => {
    asyncHooks.executionAsyncId.mockReturnValueOnce('foo');
    const fnSpy = jest.fn();

    const namespace = new Namespace();
    expect(namespace.context).toEqual({});

    namespace.run(fnSpy);

    expect(namespace.context).toEqual({ foo: {} });
    expect(fnSpy).toHaveBeenCalledTimes(1);
  });

  it('should set key/val', () => {
    asyncHooks.executionAsyncId.mockReturnValue('bla');

    const namespace = new Namespace();

    namespace.run(() => true);
    namespace.set('foo', 'bar');
    expect(namespace.context).toEqual({ bla: { foo: 'bar' } });
  });

  it('should get', () => {
    asyncHooks.executionAsyncId.mockReturnValue('bla');

    const namespace = new Namespace();

    namespace.run(() => true);
    namespace.set('foo', 'bar');
    expect(namespace.get('foo')).toEqual('bar');
  });
});
