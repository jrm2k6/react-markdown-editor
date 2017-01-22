'use strict';

var fs = require('fs');
var path = require('path');
var webpack = require('webpack');

var isProd = (process.env.NODE_ENV === 'production');

function getPlugins() {
  var plugins = [];

  plugins.push(new webpack.DefinePlugin({
    'process.env': {
      'NODE_ENV': process.env.NODE_ENV
    }
  }));

  if (isProd) {
    plugins.push(new webpack.optimize.UglifyJsPlugin());
  }

  return plugins;
}

var config = {

  debug: true,

  devtool: 'source-map',

  entry: {
    'bundle': ['./index.js']
  },

  plugins: getPlugins(),

  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].js',
  },

  module: {
    loaders: [{
      test: /\.js$/,
      exclude: /(node_modules)/,
      loader: 'babel-loader',
      query: {
        presets: ['react', 'es2015']
      }
    }]
  },

  plugins: [],

};

module.exports = config;
