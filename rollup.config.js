import replace from '@rollup/plugin-replace';
import typescript from '@rollup/plugin-typescript';
import { terser } from 'rollup-plugin-terser';

const commonOptions = {
  input: 'src/index.ts',
};

const getPlugins = (module) => [
  replace({
    __API_URL__: process.env.API_URL || 'http://localhost:8080',
  }),
  typescript(),
  terser({
    module,
    mangle: true,
    compress: true,
  }),
];

export default [
  {
    ...commonOptions,
    output: {
      format: 'esm',
      file: './dist/perf-analytics.min.js',
    },
    plugins: getPlugins(true),
  },
  {
    ...commonOptions,
    output: {
      format: 'umd',
      file: './dist/perf-analytics.umd.min.js',
      name: 'perfAnalytics',
    },
    plugins: getPlugins(false),
  },
];
