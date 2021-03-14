import Dotenv from 'dotenv-webpack';
import UglifyJsPlugin from 'uglifyjs-webpack-plugin';
import {
  entry, output, resolve, rules,
  devServer, plugins, optimization,
} from './common';

export default {
  mode: 'development',
  entry,
  output,
  resolve,
  module: {
    rules,
  },
  optimization: {
    minimizer: [new UglifyJsPlugin({ cache: true })],
    ...optimization,
  },
  plugins: [
    new Dotenv(),
    ...plugins,
  ],
  devServer,
};
