var config = {
    entry: [__dirname + '/app/scripts/main.jsx'],
    output: {
        filename: 'bundle.js'
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
      }]
    }
};


module.exports = config;
