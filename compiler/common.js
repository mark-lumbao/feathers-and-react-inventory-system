import path from 'path';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import { CleanWebpackPlugin } from 'clean-webpack-plugin';

export const entry = path.join(process.cwd(), 'client/src/index.tsx');

export const output = {
  path: path.join(process.cwd(), '/public/react'),
  filename: '[name].[hash].bundle.js',
  chunkFilename: '[name].[hash].bundle.js',
  publicPath: '/',
};

export const devServer = {
  contentBase: path.join(process.cwd(), '/public/react'),
  writeToDisk: true,
  compress: true,
  historyApiFallback: true,
  overlay: {
    errors: true,
    warnings: true,
  },
};

export const rules = [
  {
    test: /\.(ts|tsx)$/,
    exclude: /node_modules/,
    use: 'ts-loader',
  },
  {
    test: /\.js$/,
    exclude: /node_modules/,
    use: 'babel-loader',
    enforce: 'pre',
  },
  {
    test: /\.js$/,
    use: ['source-map-loader'],
    enforce: 'pre',
  },
  {
    test: /\.(ts|tsx)$/,
    exclude: /node_modules/,
    use: 'eslint-loader',
    enforce: 'pre',
  },
  {
    test: /\.css$/,
    use: ['style-loader', 'css-loader'],
  },
  {
    test: /\.(png|jpg|gif)$/i,
    use: [
      {
        loader: 'url-loader',
        options: {
          limit: 8192,
        },
      },
    ],
  },
];

export const optimization = {
  splitChunks: {
    cacheGroups: {
      vendor: {
        test: /node_modules/,
        chunks: 'initial',
        name: 'vendor',
        enforce: true,
      },
    },
  },
};

export const resolve = {
  extensions: ['.js', '.ts', '.tsx'],
  modules: [ // add these to improve module resolves
    'node_modules',
    path.resolve(process.cwd(), 'client/src'),
  ],
};

export const plugins = [
  new CleanWebpackPlugin(),
  new HtmlWebpackPlugin({
    template: path.join(process.cwd(), 'client/public/index.html'),
    favicon: 'client/src/assets/images/inventory.png',
    minify: true,
  }),
];
