module.exports = function plugin(config, options) {
  return {
    name: 'snowpack-plugin-run',
    build() {
      console.log('build event');
    },
  };
};
