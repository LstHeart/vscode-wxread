(async () => {
  const { clean } = require('esbuild-plugin-clean');
  const esbuild = require('esbuild');

  const result = await esbuild.build({
    entryPoints: ['src/extension.ts'],
    bundle: true,
    outdir: 'dist',
    // outExtension: { '.js': '.mjs' },
    format: 'cjs', // 输出格式
    platform: 'node',
    target: ['node14'],
    // resolveExtensions: [.tsx,.ts,.jsx,.js,.css,.json],
    external: ['vscode', 'path'], // 标识外部module
    minify: true, // 压缩
    metafile: true,
    // splitting: true,
    // chunkNames: 'chunks/[name]-[hash]',
    // sourcemap: true,
    // tsconfig: 'custom-tsconfig.json'
    plugins: [
      clean({
        patterns: ['./dist/*', './dist/assets/*.map.js'],
      }),
    ],
  })
    .catch(() => process.exit(1));

  let text = await esbuild.analyzeMetafile(result.metafile, {
    // verbose: true,
  });

  console.log(text);

  // const esBuildDevServer = require("esbuild-dev-server");
  // esBuildDevServer.start(
  //   build({
  //     entryPoints: ["src/index.js"],
  //     outdir: "dist",
  //     incremental: true,
  //     // and more options ...
  //   }),
  //   {
  //     port: "8080", // optional, default: 8080
  //     watchDir: "src", // optional, default: "src"
  //     index: "dist/index.html", // optional
  //     staticDir: "dist", // optional
  //     onBeforeRebuild: {}, // optional
  //     onAfterRebuild: {}, // optional
  //   }
  // )
})()
