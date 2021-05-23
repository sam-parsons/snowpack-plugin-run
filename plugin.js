const execa = require('execa');

module.exports = function plugin(config, options) {
  if (!options) return new Error('Argument required for plugin');
  if (typeof options.cmd === 'string') options.cmd = [options.cmd];
  if (!Array.isArray(options.cmd))
    return new Error(
      'Improper plugin argument: use a string or array of strings'
    );
  return {
    name: 'snowpack-plugin-run',
    async run({ log }) {
      const arr = options.cmd.map((cmd) => {
        const worker = execa.command(cmd, {
          cwd: config.root || process.cwd(),
          shell: true,
        });
        function dataHandler(chunk) {
          log('WORKER_MSG', {
            msg: chunk.toString(),
          });
        }
        const { stdout, stderr } = worker;
        stdout && stdout.on('data', dataHandler);
        stderr && stderr.on('data', dataHandler);
        return worker.then();
      });

      return Promise.all(arr);
    },
  };
};
