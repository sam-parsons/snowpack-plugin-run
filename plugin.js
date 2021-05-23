const execa = require('execa');
const npmRunPath = require('npm-run-path');

module.exports = function plugin(config, opts) {
  // type checking options.cmd which should be an arry or string
  // if string, wrap with array literal
  // if not an array, throw Error
  return {
    name: 'snowpack-plugin-run',
    async run({ log }) {
      if (!Array.isArray(opts.cmd)) return new Promise(() => {});
      const arr = opts.cmd.map((cmd) => {
        const workerPromise = execa
          .command(cmd, {
            env: npmRunPath.env(),
            extendEnv: true,
            shell: true,
            cwd: config.root || process.cwd(),
          })
          .then();
        const { stdout, stderr } = workerPromise;
        function dataListener(chunk) {
          let stdOutput = chunk.toString();
          log('WORKER_MSG', { level: 'log', msg: stdOutput });
        }
        stdout && stdout.on('data', dataListener);
        stderr && stderr.on('data', dataListener);
        return workerPromise;
      });

      return Promise.all(arr);
    },
  };
};
