var path = require('path'),
    webpack = require('webpack');

module.exports = {
  devtool: 'eval',
  entry: [
    './playground.jsx'
  ],
  output: {
    path: path.join(__dirname, 'build'),
    filename: 'bundle.js',
    publicPath: '/static/'
  },
  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        exclude: /(node_modules|bower_components)/,
        loader: 'babel', // 'babel-loader' is also a legal name to reference
        query: {
          cacheDirectory: true,
          presets: ['react', 'es2015'],
          plugins:['transform-object-rest-spread']
        }
    },
    { test: /\.less$/, loader: "style!css!less" },
    {
      test: /\.css$/,
      loader: 'style-loader!css-loader!postcss-loader',
      include: path.join(__dirname, 'src')
    }]
  },
  postcss: function() {
    return [require('postcss-nested')];
  }
};
