module.exports = {
  transpileDependencies: [
    "vuetify"
  ],
  pluginOptions: {
    electronBuilder: {
      builderOptions: {
        mac: {
          icon: './src/assets/icon/app_icon.icns'
        }
      },
      nodeIntegration: true
    }
  }
}