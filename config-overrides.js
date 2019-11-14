const path = require('path')

module.exports = {
  webpack: function override(config, env) {
    config.entry = {
      main: path.resolve(__dirname, 'src/index.tsx'),
      content: path.resolve(__dirname, 'src/content/index.ts'),
      background: path.resolve(__dirname, 'src/background/index.ts'),
    }

    config.optimization.splitChunks = {}
    config.optimization.runtimeChunk = false

    return config
  },
}
