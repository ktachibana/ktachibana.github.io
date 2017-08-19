module.exports = [
  {
    entry: __dirname + "/js/index",
    output: {
      path: __dirname + '/bundle',
      filename: "index.js"
    },
    module: {
      loaders: [
        {
          test: /.js$/,
          loader: "babel",
          exclude: /node_modules/
        }
      ]
    },
    devtool: 'source-map'
  },
];
