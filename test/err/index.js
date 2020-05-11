// -------------------------------------
// # POSTCSS - LOAD PLUGINS - TEST - ERR
// -------------------------------------

'use strict'

var test = require('ava')

var pluginsrc = require('../..')

test('No Config - {Error} - Load Plugins', function (t) {
  return pluginsrc({}, 'test').catch(function (err) {
    t.is(/No PostCSS Config found in: (.*)\/postcss-load-plugins\/test/.test(err.message), true)
  })
})

test('No Plugin - {Error} - Load Plugins', function (t) {
  return pluginsrc({}, 'test/err/object').catch(function (err) {
    t.is(err.message.indexOf("Loading PostCSS Plugin failed: Cannot find module 'no plugin'") !== -1, true)
  })
})

test('No Plugin (Options) - {Error} - Load Plugins', function (t) {
  var ctx = { next: 1 }

  return pluginsrc(ctx, 'test/err/object').catch(function (err) {
    t.is(err.message.indexOf("Loading PostCSS Plugin failed: Cannot find module 'no plugin options'") !== -1, true)
  })
})

test('Invalid Plugin {Object} - {Error} - Load Plugins', function (t) {
  var ctx = { next: 2 }

  return pluginsrc(ctx, 'test/err/object').catch(function (err) {
    t.is(err.message, 'Invalid PostCSS Plugin found: [0]')
  })
})

test('Invalid Plugin {Array} - {Error} - Load Plugins', function (t) {
  var ctx = { next: 2 }

  return pluginsrc(ctx, 'test/err/array').catch(function (err) {
    t.is(err.message, 'Invalid PostCSS Plugin found: [0]')
  })
})
