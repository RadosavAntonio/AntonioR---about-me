import path from 'node:path'
import { fileURLToPath } from 'node:url'
import * as Repack from '@callstack/repack'
import rspack from '@rspack/core'
import { sharedDeps } from '../../mf-shared.mts'

const __dirname = path.dirname(fileURLToPath(import.meta.url))

/**
 * Profile remote module. Exposes ./ProfileScreen, built into its own bundle and
 * deployed to its own Firebase Hosting site for independent OTA.
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
      path: '[context]/build/profile/[platform]',
      uniqueName: 'antonior-profile',
      ...(process.env.NODE_ENV === 'production'
        ? {
            publicPath: `https://antonior-profile.web.app/${platform}/`,
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
            outputPath: `build/profile/${platform}/output-remote`,
          },
        ],
      }),
      new Repack.plugins.ModuleFederationPluginV2({
        name: 'profile',
        filename: 'profile.container.js.bundle',
        exposes: {
          './ProfileScreen': './src/ProfileScreen',
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
