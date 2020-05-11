// ------------------------------------
// # POSTCSS - LOAD PLUGINS - INDEX
// ------------------------------------

'use strict'

var resolve = require('path').resolve

var config = require('cosmiconfig')
var assign = require('object-assign')

var loadPlugins = require('./lib/plugins')

/**
 * Autoload Plugins for PostCSS
 *
 * @author Michael Ciniawsky (@michael-ciniawsky) <michael.ciniawsky@gmail.com>
 * @license MIT
 *
 * @module postcss-load-plugins
 * @version 2.3.0
 *
 * @requires cosmiconfig
 * @requires object-assign
 * @requires ./lib/plugins.js
 *
 * @method pluginsrc
 *
 * @param  {Object} ctx Context
 * @param  {String} path Directory
 * @param  {Object} options Options
 *
 * @return {Array} config PostCSS Plugins
 */
module.exports = function pluginsrc (ctx, path, options) {
  ctx = assign({ cwd: process.cwd(), env: process.env.NODE_ENV }, ctx)

  path = path ? resolve(path) : process.cwd()

  options = assign({ rcExtensions: true }, options)

  if (!ctx.env) process.env.NODE_ENV = 'development'

  function handleResult (result) {
    if (!result) throw new Error('No PostCSS Config found in: ' + path)

    file = result ? result.filepath : ''

    return result ? result.config : {}
  }

  function composePlugins (plugins) {
    if (typeof plugins === 'function') plugins = plugins(ctx)
    else plugins = assign(plugins, ctx)

    if (!plugins.plugins) plugins.plugins = []

    return { plugins: loadPlugins(plugins), file: file }
  }

  var file

  if (options.sync) {
    return composePlugins(handleResult(config('postcss', options).load(path)))
  }

  return config('postcss', options)
    .load(path)
    .then(handleResult)
    .then(composePlugins)
}
