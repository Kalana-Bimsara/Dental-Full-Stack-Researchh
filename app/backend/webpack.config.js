// webpack.config.js
import { dirname, resolve as _resolve } from 'path';
import { fileURLToPath } from 'url';

// Fix __dirname in ESM
const __dirname = dirname(fileURLToPath(import.meta.url));

export default {
  target: 'node',
  entry: './index.js',
  output: {
    path: _resolve(__dirname, 'dist'),
    filename: 'server.bundle.cjs',
  },
  mode: 'production',
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
        },
      },
    ],
  },
  resolve: {
    extensions: ['.js'],
  },
};