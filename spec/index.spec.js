const asyncHooks = require('async_hooks');
const Namespace = require('../namespace');
const { createNamespace, getNamespace } = require('../index');

jest.mock('async_hooks', () => ({
  createHook: jest.fn()
}));

jest.mock('../namespace');

beforeEach(() => {
  asyncHooks.createHook.mockClear();
  Namespace.mockClear();
});

describe('Index unit tests', () => {
  describe('Create namespace tests', () => {
    it('should throw error if namespace already exists', () => {
      asyncHooks.createHook.mockReturnValueOnce({ enable: () => true });

      createNamespace('foo');

      expect(() => createNamespace('foo')).toThrow(
        'A namespace for foo already exists'
      );
    });

    it('should create namespace properly', () => {
      const enableSpy = jest.fn();
      asyncHooks.createHook.mockReturnValueOnce({ enable: enableSpy });

      createNamespace('bar');

      expect(Namespace).toBeCalledTimes(1);
      expect(asyncHooks.createHook).toBeCalledTimes(1);
      expect(enableSpy).toBeCalledTimes(1);
    });
  });

  describe('Get namespace tests', () => {
    it('should get the created namespace', () => {
      asyncHooks.createHook.mockReturnValueOnce({ enable: () => true });
      const yam = createNamespace('yam');
      const yabasha = getNamespace('yam');
      expect(yam).toBe(yabasha);
    });
  });
});
