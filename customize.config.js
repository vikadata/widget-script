const createBundler = require('@vikadata/widget-webpack-bundler').default;
const path = require('path');

const createConfig = (config) => {
  return config;
}

exports.default = createBundler(createConfig);