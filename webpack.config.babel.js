// webpack.config.js

// import webpack from 'webpack'
import path from 'path'

export default {
  entry: './preview.jsx',
  output: {
    path: path.join(__dirname, 'lib'),
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
