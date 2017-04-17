var config = {
    entry: [__dirname + '/app/main.jsx'],
    output: {
        filename: 'build/bundle.js'
    },

    devtool: "source-map",
    
    module: {
      loaders: [{
        test: /\.jsx?$/,
        exclude: /(node_modules|bower_components)/,
        loader: 'babel-loader',
        query: {
          presets: ['es2015', 'react']
        }
      }, {
        test: /\.scss$/,
        use: [{
          loader: "style-loader"
        }, {
          loader: "css-loader"
        }, {
          loader: "sass-loader"
        }]
      }]
    }
};

module.exports = config;
