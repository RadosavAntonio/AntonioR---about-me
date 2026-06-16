// Default-named Re.Pack config. Release builds run `webpack-bundle` without
// `--config`, which auto-discovers this file. Dev scripts pass `--config
// config.host-app.mts` explicitly. Both resolve to the same host config.
export { default } from './config.host-app.mts'
