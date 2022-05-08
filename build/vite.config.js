import { defineConfig } from 'vite';
import path from 'path';
import { visualizer } from 'rollup-plugin-visualizer';
import { nodeResolve } from '@rollup/plugin-node-resolve';
import { swc } from 'rollup-plugin-swc3';
import json from '@rollup/plugin-json';
import commonjs from '@rollup/plugin-commonjs';
import { terser } from 'rollup-plugin-terser';

const mainFile = 'src/extension.ts';

export default defineConfig({
  optimizeDeps: {
    include: ['koa'],
    esbuildOptions:{
      platform: 'node',
      target: ['node14'],
    }
  },
  build: {
    minify: 'false',
    target:'node16',
    lib: {
      entry: path.resolve(__dirname, mainFile),
      name: 'vscode-wxread',
      fileName: (format) => `extension.js`,
      formats: ['cjs']
    },
    rollupOptions: {
      input: mainFile,
      // // output: {
      // //   // 在 UMD 构建模式下为这些外部化的依赖提供一个全局变量
      // //   globals: {
      // //     vscode: 'vscode'
      // //   },
      // //   format: 'cjs',
      // // },
      // // 确保外部化处理那些你不想打包进库的依赖
      external: ['vscode'],
      // plugins:[

      // ]
    },
    commonjsOptions: {
      include: /\.[jt]sx?$/,
      extensions: ['.js', '.ts'],
      transformMixedEsModules: true,
      // requireReturnsDefault: "namespace"
    }
  },
  plugins: [
    visualizer(), // 打包分析插件，输出文件为stats.html

    // commonjs(
    //   {
    //     // include: /\.[jt]sx?$/, // default
    //     extensions: ['.js', '.ts'],
    //     transformMixedEsModules: true,
    //     // defaultIsModuleExports: false,
    //     // requireReturnsDefault: "namespace"
    //   }
    // ),
    //     swc({
    //   // All options are optional
    //   include: /\.[jt]sx?$/, // default
    //   exclude: /node_modules/, // default
    //   tsconfig: 'tsconfig.json', // default
    //   // And add your swc configuration here!
    //   // "filename" will be ignored since it is handled by rollup
    //   jsc: {}
    // }),
    // nodeResolve({
    //   extensions: ['.ts'],
    //   moduleDirectories: ['node_modules'],
    //   preferBuiltins: true,
    //   // mainFields: ['module', 'main'],
    // }),
  ],

})