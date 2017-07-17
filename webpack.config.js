var ExtractTextPlugin = require('extract-text-webpack-plugin');
//css样式从js文件中分离出来,需要通过命令行安装 extract-text-webpack-plugin依赖包
module.exports = {
  entry: __dirname + "/app/main.js", //已多次提及的唯一入口文件
  output: {
    path: __dirname + "/public", //打包后的文件存放的地方
    filename: "bundle.js" //打包后输出文件的文件名
  },
  devServer: {
    contentBase: "./public", //本地服务器所加载的页面所在的目录
    port: "8070",
    historyApiFallback: true, //不跳转
    inline: true //实时刷新
  },
  module: {
    rules: [{
        test: /\.js$/,
        exclude: /node_modules/,
        use: ['babel-loader'], //在webpack的module部分的loaders里进行配置即可
      },
      {
        test: /\.css$/, // Only .css files
        //use: ["style-loader", "css-loader"]
        use: ExtractTextPlugin.extract({
                  fallback: "style-loader",
                  use: "css-loader"
                 })
      },
      //解析.scss文件
      {
        test: /\.scss$/,
        use: ExtractTextPlugin.extract({
          fallback: "style-loader",
          use: ["css-loader", "sass-loader"]
        })
      }



    ]
  },
  plugins: [
    //  new HtmlWebpackPlugin({
    //      template: './index.html' // 模版文件
    //  }),
     new ExtractTextPlugin({
         filename: 'style.css'
         /*filename: (getPath) => {
             return getPath('dist/[name].css').replace('dist','css')
         }*/
     })
 ]
}
