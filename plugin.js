const execa = require('execa');

module.exports = function plugin(config, options) {
  if (!options) return new Error('Argument required for plugin');
  // if options.cmd is just a string, wrap in array literal
  if (typeof options.cmd === 'string') options.cmd = [options.cmd];
  if (!Array.isArray(options.cmd))
    return new Error(
      'Improper plugin argument: use a string or array of strings'
    );
  return {
    name: 'snowpack-plugin-run',
    async run({ log }) {
      // takes data from any w. thread and logs to snowpack process
      function dataHandler(chunk) {
        log('WORKER_MSG', {
          msg: chunk.toString(),
        });
      }

      const promiseArray = options.cmd.map((cmd) => {
        // creates instance of workerPromise
        const worker = execa.command(cmd, {
          cwd: config.root || process.cwd(),
          shell: true,
        });

        // piping outs from worker thread to snowpack process
        const { stdout, stderr } = worker;
        stdout && stdout.on('data', dataHandler);
        stderr && stderr.on('data', dataHandler);

        return worker.then();
      });

      return Promise.all(promiseArray);
    },
  };
};
