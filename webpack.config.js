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
  devtool: 'source-map',

  entry: './index.js',

  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'react-markdown-editor.js',
    libraryTarget: 'umd',
    library: 'ReactMarkdownEditor',
    umdNamedDefine: true
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

  externals: {
    'react': {
      commonjs: "react",
      commonjs2: "react",
      amd: "react",
      root: "_"
    },

    'react-dom': {
      commonjs: "react-dom",
      commonjs2: "react-dom",
      amd: "react-dom",
      root: "_"
    }
  },

  plugins: getPlugins(),

};

module.exports = config;
