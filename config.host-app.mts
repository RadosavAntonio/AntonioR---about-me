import path from 'node:path'
import { fileURLToPath } from 'node:url'
import * as Repack from '@callstack/repack'
import rspack from '@rspack/core'
import { sharedDeps } from './mf-shared.mts'

const __dirname = path.dirname(fileURLToPath(import.meta.url))

/**
 * Host (shell) rspack config for Module Federation v2.
 * The host owns the native app + navigation shell and consumes Home/Profile/Example
 * as runtime remotes. `remotes` is wired per-module in the steps that add each module.
 */
export default Repack.defineRspackConfig((env) => {
  const { mode, platform } = env

  // Remote source: localhost dev servers in development, Firebase Hosting for
  // production bundles (release) or when MF_REMOTES=prod is set on the dev server.
  const useProdRemotes =
    process.env.MF_REMOTES === 'prod' || mode === 'production'
  const remote = (name: string, port: string, site: string) =>
    useProdRemotes
      ? `${name}@https://${site}.web.app/${platform}/mf-manifest.json`
      : `${name}@http://localhost:${port}/${platform}/mf-manifest.json`

  return {
    mode,
    context: __dirname,
    entry: './index.js',
    resolve: {
      ...Repack.getResolveOptions({ enablePackageExports: true }),
    },
    output: {
      path: '[context]/build/host/[platform]',
      uniqueName: 'antonior-host',
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
            outputPath: `build/host/${platform}/output-remote`,
          },
        ],
      }),
      new Repack.plugins.ModuleFederationPluginV2({
        name: 'host',
        filename: 'host.container.js.bundle',
        // Each module is a runtime remote; URL swaps localhost (dev) -> Firebase (prod).
        remotes: {
          home: remote('home', '8082', 'antonior-home'),
          profile: remote('profile', '8083', 'antonior-profile'),
          example: remote('example', '8084', 'antonior-example'),
        },
        dts: false,
        shared: sharedDeps(true),
      }),
      // @react-navigation/elements optionally requires masked-view, which we do not install.
      new rspack.IgnorePlugin({
        resourceRegExp: /^@react-native-masked-view/,
      }),
    ],
  }
})
