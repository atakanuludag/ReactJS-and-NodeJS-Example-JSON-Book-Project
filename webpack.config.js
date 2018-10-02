var path    = require('path');
var hwp     = require('html-webpack-plugin');

module.exports = {
    entry: path.join(__dirname, '/src/index.js'),
    /*entry: {
      index: './src/index.js',
      config: './src/config.js',
      bookService: './src/services/bookService.js',
      header: './src/layouts/Header.js',
      footer: './src/layouts/Footer.js',
      AddBook: './src/components/AddBook.js',
      DetailBook: './src/components/DetailBook.js',
      ListBook: './src/components/DetailBook.js'
    },*/
    /*entry: () => new Promise((resolve) => resolve([
      './src/index.js',
      './src/config.js',
      './src/services/bookService.js',
      './src/layouts/Header.js',
      './src/layouts/Footer.js',
      './src/components/AddBook.js',
      './src/components/DetailBook.js',
      './src/components/DetailBook.js'
    ])),*/
    output: {
        filename: 'build.js',
        path:  path.join(__dirname, '/dist'),
        publicPath: ''
    },
    module:{
        rules:[
          {
            exclude: /node_modules/,
            test: /\.js$/,
            use: 'babel-loader'
          },
          {
            test: /\.css$/,
            use: [ 'style-loader', 'css-loader' ]
          }
      ]
    },
    devServer: {
      historyApiFallback: true,
    },
    plugins:[
        new hwp({template:path.join(__dirname, '/public/index.html')})
    ]
}
