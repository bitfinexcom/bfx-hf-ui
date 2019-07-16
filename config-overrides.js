/* config-overrides.js */

const MonacoWebpack = require('monaco-editor-webpack-plugin')

module.exports = function override(config, env) {
  config.plugins.push(new MonacoWebpack({
    languages: ['javascript'],
  }))
  return config
}
