import typescript from '@rollup/plugin-typescript';
import { terser } from 'rollup-plugin-terser';

export default {
  input: 'src/index.ts',
  output: {
    format: 'cjs',
    file: './dist/perf-analytics.min.js',
  },
  plugins: [typescript(), terser()],
};
