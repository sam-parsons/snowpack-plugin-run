const plugin = require('../plugin');

describe('snowpack run script plugin', () => {
  test('invokes plugin and returns correctly shaped object without error', () => {
    const obj = plugin();
    expect(obj.name).toEqual('snowpack-plugin-run');
    expect(typeof obj.build).toEqual('function');
  });
});
