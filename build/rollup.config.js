import json from '@rollup/plugin-json';
import commonjs from '@rollup/plugin-commonjs';
import { nodeResolve } from '@rollup/plugin-node-resolve';
import { terser } from 'rollup-plugin-terser';
import { swc } from 'rollup-plugin-swc3';
import del from 'rollup-plugin-delete';

export default {
  input: 'src/extension.ts',
  output: {
    dir: 'dist',
    // file: 'extension.js',
    format: 'cjs',
    exports: 'named'
  },
  plugins: [
    del({ targets: 'dist/*' }),
    swc({
      include: /\.[jt]sx?$/, // default
      exclude: /node_modules/, // default
      tsconfig: 'tsconfig.json', // default
      // And add your swc configuration here!
      // "filename" will be ignored since it is handled by rollup
      jsc: {}
    }),
    json(),
    commonjs(
      {
        include: /\.[jt]sx?$/, // default
        extensions: ['.js', '.ts'],
        transformMixedEsModules: true,
        defaultIsModuleExports: false,
        requireReturnsDefault: "namespace"
      }
    ),
    nodeResolve({
      // extensions: ['.ts'],
      // moduleDirectories: ['node_modules'],
      preferBuiltins: true,
      // mainFields: ['module', 'main'],
    }),
    terser(),
  ],
  external: ['vscode']
};