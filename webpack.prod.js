const htmlWebPackPlugin=require('html-webpack-plugin');
const { loader } = require('mini-css-extract-plugin');
const MiniCssExtract= require('mini-css-extract-plugin');
const CopyPlugin= require("copy-webpack-plugin");
const CssMinimizer=require("css-minimizer-webpack-plugin");
const Terser=require("terser-webpack-plugin");

module.exports={
    mode:"production",
    output:{
        clean:true,
        filename: 'main.[contenthash].js',
    },
    module:{
        rules:[
            {
                test:/\.html$/,//meter el html de js en el archivo build
                loader:'html-loader',
                options:{
                    sources:false,
                },
            },
            {
                test:/\.css$/,//meter el css en el archivo del build
                exclude:/style.css$/,
                use:['style-loader','css-loader']
            },
            {
                test:/style.css$/,
                use:[MiniCssExtract.loader,'css-loader']
            },
            {
                test:/\.(png|jpg?g|gif)$/,
                loader:'file-loader'
            },
            {
                test: /\.m?js$/,
                exclude: /node_modules/,
                use: {
                  loader: "babel-loader",
                  options: {
                    presets: ['@babel/preset-env']
                  }
                }
            },
        ]
    },
    optimization:{
        minimize:true,
        minimizer:[
            new CssMinimizer(),
            new Terser(),
        ]
    },
    plugins:[
        new htmlWebPackPlugin({
            title:"mi webpack app",//editar el archivo del build
            //filename:"k buelta.html"
            template:"./src/index.html"
        }),
        new MiniCssExtract({
            filename:'[name].[fullhash].css',
            ignoreOrder:false
        }),
        new CopyPlugin({
            patterns:[
                {from:"src/assets/",to:"assets/",}
            ]
            
        }),
    ]
   

}