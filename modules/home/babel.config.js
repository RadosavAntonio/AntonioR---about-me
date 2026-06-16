// Reuse the root Babel config so the remote build strips React Native's Flow
// types (@react-native/babel-preset). Keeps one source of truth across modules.
module.exports = require('../../babel.config.js')
