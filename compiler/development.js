import Dotenv from 'dotenv-webpack';
import UglifyJsPlugin from 'uglifyjs-webpack-plugin';
import CompressionPlugin from 'compression-webpack-plugin';
import BrotliPlugin from 'brotli-webpack-plugin';
import {
  entry, output, resolve, rules, plugins,
  optimization,
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
    new CompressionPlugin({
      test: /\.(js|css|html|svg)$/,
      threshold: 10240,
      minRatio: 0.8,
    }),
    new BrotliPlugin({
      asset: '[path].br[query]',
      test: /\.(js|css|html|svg)$/,
      threshold: 10240,
      minRatio: 0.8,
    }),
  ],
};
