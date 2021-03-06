module.exports = {
    pluginOptions: {
        electronBuilder: {
            nodeIntegration: true,
            externals:['node-pty']
        }
    }, 
    chainWebpack(config) {
        config.module
          .rule('node')
          .test(/\.node$/)
          .use('node-loader')
          .loader('node-loader')
          .end();
      }
}

