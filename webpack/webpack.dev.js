console.log("dev");
const path = require('path');
const { merge } = require('webpack-merge');  // 引入webpack-merge功能模块
const common = require('./webpack.common.js'); // 引入webpack.common.js
console.log(__dirname);
module.exports = merge(common, {   // 将webpack.common.js合并到当前文件
    devServer: {
        contentBase: path.join(__dirname, "../example"),
        after:function(app,server,compiler){
            console.log("after");
        },
        hot: true,
        port: '9000',
        inline: true,
        open: true,
        overlay: true,
    },
    mode: 'development'
})
