import path from 'node:path'
import { fileURLToPath } from 'node:url'
import * as Repack from '@callstack/repack'
import rspack from '@rspack/core'
import { sharedDeps } from '../../mf-shared.mts'

const __dirname = path.dirname(fileURLToPath(import.meta.url))

/**
 * Home remote module. Exposes ./HomeScreen, built into its own bundle and deployed
 * to its own Firebase Hosting site for independent OTA. eager=false on shared deps:
 * the host provides the live singleton instances at runtime.
 */
export default Repack.defineRspackConfig((env) => {
  const { mode, platform } = env

  return {
    mode,
    context: __dirname,
    entry: './index.js',
    resolve: {
      ...Repack.getResolveOptions({ enablePackageExports: true }),
    },
    output: {
      path: '[context]/build/home/[platform]',
      uniqueName: 'antonior-home',
      // Dev: omit publicPath so Re.Pack points it at the dev server (RN has no
      // browser 'auto' resolution). Prod: this module's own Firebase Hosting site,
      // with content-hashed chunk names so they can be cached immutably.
      ...(process.env.NODE_ENV === 'production'
        ? {
            publicPath: `https://antonior-home.web.app/${platform}/`,
            chunkFilename: '[name].[contenthash].chunk.bundle',
          }
        : {}),
    },
    module: {
      rules: [
        {
          test: /\.[cm]?[jt]sx?$/,
          use: {
            loader: '@callstack/repack/babel-swc-loader',
            parallel: true,
            options: {},
          },
          type: 'javascript/auto',
        },
        ...Repack.getAssetTransformRules({ inline: true }),
      ],
    },
    plugins: [
      new Repack.RepackPlugin({
        extraChunks: [
          {
            include: /.*/,
            type: 'remote',
            outputPath: `build/home/${platform}/output-remote`,
          },
        ],
      }),
      new Repack.plugins.ModuleFederationPluginV2({
        name: 'home',
        filename: 'home.container.js.bundle',
        exposes: {
          './HomeScreen': './src/HomeScreen',
        },
        dts: false,
        shared: sharedDeps(false),
      }),
      new rspack.IgnorePlugin({
        resourceRegExp: /^@react-native-masked-view/,
      }),
    ],
  }
})
