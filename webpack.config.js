const path = require('path');

module.exports = {
  entry: './frontend/index.js',
  watch: true,
  target: 'node',
  output: {
    filename: 'main.js',
    path: path.resolve(__dirname, 'templates')
  },
  resolve: {
    alias: {
      'vue$': 'vue/dist/vue.esm.js'
    }
  }
};
