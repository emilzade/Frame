const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  devServer: {
    //host: '192.168.100.14', //your ip address
    port: 8080,
  },
})
