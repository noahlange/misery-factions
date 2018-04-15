const { resolve } = require('path');

module.exports = {
  // mode: 'development',
  // serve: {
  //   content: resolve(__dirname, './docs')
  // },
  mode: 'production',
  entry: './src/app.ts',
  output: {
    path: resolve(__dirname, './docs'),
    filename: 'factions.js'
  },
  resolve: {
    extensions: ['.ts', '.vue', '.js'],
    alias: {
      vue: 'vue/dist/vue.js'
    }
  },
  module: {
    rules: [
      {
        test: /\.vue$/,
        loader: 'vue-loader',
        options: {
          loaders: {
            // Since sass-loader (weirdly) has SCSS as its default parse mode, we map
            // the "scss" and "sass" values for the lang attribute to the right configs here.
            // other preprocessors should work out of the box, no loader config like this necessary.
            'scss': 'vue-style-loader!css-loader!sass-loader'
          }
        }
      },
      {
        test: /\.css$/,
        use: [
          'style-loader',
          'css-loader'
        ]
      },
      {
        test: /\.tsx?$/,
        loader:  'ts-loader',
        options: {
          appendTsSuffixTo: [/\.vue$/],
        }
      }
    ]
  }
};