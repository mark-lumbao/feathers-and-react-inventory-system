import { DefinePlugin } from 'webpack';
import CompressionPlugin from 'compression-webpack-plugin';
import BrotliPlugin from 'brotli-webpack-plugin';
import { config } from 'dotenv';
import {
  entry, output, resolve,
  rules, plugins, optimization,
} from './common';

config();

export default {
  mode: 'production',
  entry,
  output,
  resolve,
  module: {
    rules,
  },
  optimization,
  plugins: [
    ...plugins,
    new DefinePlugin({
      'process.env': {
        HOST: JSON.stringify(process.env.HOST),
        PORT: JSON.stringify(process.env.PORT),
        NODE_ENV: JSON.stringify(process.env.NODE_ENV),
      },
    }),
    new CompressionPlugin({
      test: /\.(js|css|html|svg)$/,
      threshold: 10240, // 10.24kb
      minRatio: 0.8,
    }),
    new BrotliPlugin({
      asset: '[path].br[query]',
      test: /\.(js|css|html|svg)$/,
      threshold: 100000, // 100kb
      minRatio: 0.8,
    }),
  ],
};
