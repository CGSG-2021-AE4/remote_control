const resolve = require("@rollup/plugin-node-resolve");
const commonjs = require('@rollup/plugin-commonjs');
const typescript = require('@rollup/plugin-typescript');
const external = require('rollup-plugin-peer-deps-external');
const babel = require("@rollup/plugin-babel");
const replace = require("@rollup/plugin-replace");

module.exports = [
  {
    input: "src/server/index.ts",
    output: {
      file: "out/server/bundle.js",
      format: "es",
      sourcemap: "inline",
    },
    plugins: [
      typescript({ tsconfig: './tsconfig.json' }),
    ],
  },
  {
    input: "src/client/index.ts",
    output: {
      file: "out/client/bundle.js",
      format: "es",
      sourcemap: "inline",
    },
    plugins: [
      typescript({ tsconfig: './tsconfig.json' }),
    ],
  },
];
