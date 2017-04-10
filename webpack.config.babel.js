export default {
  entry: './preview.jsx',
  output: {
    path: __dirname,
    filename: 'bundle.js'
  },
  devtool: 'source-map',
  resolve: {
    extensions: ['.js', '.jsx', '.json']
  },
  module: {
    rules: [
      {
        test: /.jsx?$/,
        use: [{ loader: 'babel-loader?compact=false' }]
      }
    ]
  },
  plugins: []
}
