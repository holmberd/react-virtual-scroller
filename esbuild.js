const esbuild = require('esbuild');

const commonConfig = {
  entryPoints: ['src/index.js'],
  bundle: true,
  sourcemap: true,
  minify: true,
  target: ['es2020'],
  external: ['react', 'react-dom'],
  loader: {
    '.js': 'jsx',
  },
};

// Build ESM.
esbuild
  .build({
    outfile: 'dist/react-virtual-scroller.esm.js',
    format: 'esm',
    ...commonConfig,
  })
  .catch(() => process.exit(1));

// Build CJS.
esbuild
  .build({
    outfile: 'dist/react-virtual-scroller.cjs.js',
    format: 'cjs',
    ...commonConfig,
  })
  .catch(() => process.exit(1));
