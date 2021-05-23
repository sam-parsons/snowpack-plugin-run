const plugin = require('../plugin');

describe('snowpack run script plugin', () => {
  test('invokes plugin and returns correctly shaped object without error', () => {
    const obj = plugin();
    expect(obj.name).toEqual('snowpack-plugin-run');
    expect(typeof obj.run).toEqual('function');
  });

  test('invokes plugin with two cli commands', () => {
    const obj = plugin(
      {},
      {
        cmd: ['echo "this is a line"', 'echo "this is the second line"'],
      }
    );
    function log(type, msg) {
      console.log('type', type);
      console.log('msg', msg);
    }
    return obj.run({ log }).then((data) => {
      expect(data[0].stdout === 'this is a line');
      expect(data[1].stdout === 'this is the second line');
    });

    // pipe stdout to a text file and snapshot test
  });
});
