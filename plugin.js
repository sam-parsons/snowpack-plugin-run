const execa = require('execa');
const npmRunPath = require('npm-run-path');

module.exports = function plugin(config, options) {
  // type checking options.cmd which should be an arry or string
  // if string, wrap with array literal
  // if not an array, throw Error
  return {
    name: 'snowpack-plugin-run',
    async run({ log }) {
      if (!Array.isArray(options.cmd)) return new Promise(() => {});
      const arr = options.cmd.map((cmd) => {
        const worker = execa
          .command(cmd, {
            cwd: config.root || process.cwd(),
            shell: true,
          })
          .then();
        const { stdout, stderr } = worker;
        function listener(chunk) {
          log('WORKER_MSG', { level: 'log', msg: chunk.toString() });
        }
        stdout && stdout.on('data', listener);
        stderr && stderr.on('data', listener);
        return worker;
      });

      return Promise.all(arr);
    },
  };
};
