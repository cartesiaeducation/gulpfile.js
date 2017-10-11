process.env.NODE_ENV = 'production';

var webpack = require('webpack');

module.exports = {
    output: {
        filename: "[name].js"
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: 'babel-loader',
                options: {
                    presets: ['es2015', 'react'],
                    plugins: ["transform-object-rest-spread"]
                }
            },
            {
                test: require.resolve('bootstrap'),
                use: 'imports-loader?jQuery=jquery,Tether=tether'
            },
            {
                test: require.resolve('bootstrap'),
                use: 'imports-loader?jQuery=jquery,window.Tether=tether'
            },
            {
                test: /(vendor|bundles)\/cartesia/,
                exclude: /admin/,
                use: 'imports-loader?$=jquery,jQuery=jquery'
            }
        ]
    },
    plugins: [
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify('production')
        }),
        new webpack.optimize.UglifyJsPlugin()
    ]
};