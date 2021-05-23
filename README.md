[npm]: https://img.shields.io/npm/v/snowpack-plugin-run
[npm-url]: https://www.npmjs.com/package/snowpack-plugin-run
[size]: https://packagephobia.now.sh/badge?p=snowpack-plugin-run
[size-url]: https://packagephobia.now.sh/result?p=snowpack-plugin-run

[![npm][npm]][npm-url]
[![size][size]][size-url]
[![libera manifesto](https://img.shields.io/badge/libera-manifesto-lightgrey.svg)](https://liberamanifesto.com)

# snowpack-plugin-run

Snowpack plugin that executes shell commands sequentially when the bundle is generated

## Requirements

This plugin requires an [LTS](https://github.com/nodejs/Release) Node version (v8.0.0+) and Snowpack v2.0.0+.

## Install

Using npm:

```console
npm install --save-dev snowpack-plugin-run
```

## Usage

Create a `snowpack.config.js` [configuration file](https://www.snowpack.dev/reference/configuration) and execute shell commands sequentially before the bundle is generated:

```js
const dsv = require('snowpack-plugin-run');

module.exports = {
  mount: {
    public: { url: '/', static: true },
    src: { url: '/dist' },
  },
  plugins: [
    [
      'snowpack-plugin-run',
      {
        cmd: ['echo "this is a line"', 'echo "this is the second line"'],
      },
    ],
  ],
};
```

## Meta

[LICENSE (MIT)](./LICENSE.md)
