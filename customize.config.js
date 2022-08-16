const createBundler = require('@vikadata/widget-webpack-bundler').default;
const path = require('path');

const createConfig = (config) => {
  config.module.rules.push({
    test: /\.less$/i,
    use: ['style-loader', {
      loader: 'css-loader',
      options: {
        modules: {
          localIdentName: '[local]__[hash:base64:5]',
        }
      }
    }, 'less-loader'],
    exclude: /node_modules/
  });
  return config;
}

exports.default = createBundler(createConfig);