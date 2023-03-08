const htmlWebPackPlugin=require('html-webpack-plugin');
const { loader } = require('mini-css-extract-plugin');
const MiniCssExtract= require('mini-css-extract-plugin');

module.exports={
    mode:"development",
    output:{
        clean:true
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
        ]
    },
    optimization:{},
    plugins:[
        new htmlWebPackPlugin({
            title:"mi webpack app",//editar el archivo del build
            //filename:"k buelta.html"
            template:"./src/index.html"
        }),
        new MiniCssExtract({
            filename:'[name].css',
            ignoreOrder:false
        })
    ]
   

}