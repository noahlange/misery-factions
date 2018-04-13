const { resolve } = require('path');

module.exports = {
  // mode: 'development',
  mode: 'production',
  entry: './src/app.js',
  output: {
    path: resolve(__dirname, './docs'),
    filename: 'factions.js'
  },
  // serve: {
  //   content: resolve(__dirname, './docs')
  // },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          'style-loader',
          'css-loader'
        ]
      }
    ]
  }
};