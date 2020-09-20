import replace from '@rollup/plugin-replace';
import typescript from '@rollup/plugin-typescript';
import { terser } from 'rollup-plugin-terser';

export default {
  input: 'src/index.ts',
  output: {
    format: 'umd',
    file: './dist/perf-analytics.min.js',
    name: 'perfAnalytics',
  },
  plugins: [
    replace({
      __API_URL__: process.env.API_URL || 'http://localhost:8080',
    }),
    typescript(),
    terser(),
  ],
};
