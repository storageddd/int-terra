const MomentLocalesPlugin = require('moment-locales-webpack-plugin');

module.exports = {
  configureWebpack: {
    plugins: [
      new MomentLocalesPlugin({
        localesToKeep: ['es-us', 'ru']
      })
    ],
    resolve: {
      // Add `.ts` and `.tsx` as a resolvable extension.
      extensions: [".ts", ".tsx", ".js"]
    },
    module: {
      rules: [
        { test: /\.tsx?$/, loader: "ts-loader" }
      ]
    }
  }
}
