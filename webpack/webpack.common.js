// webpack.config.js
const path = require('path');
const webpack = require('webpack'); 
console.log("config");
module.exports = {
    entry: path.join(__dirname, "../src/index.js"), // 入口文件
    output: {
        path: path.join( __dirname, "../dist"), // 打包后的文件存放的地方 
        filename: "bundle.js" // 打包后输出文件的文件名
    },
    plugins: [
        new webpack.BannerPlugin('author:wang90'),  // new一个插件的实例 
        new webpack.HotModuleReplacementPlugin() // 热更新插件。
      ]
};