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
                    plugins: ["transform-object-rest-spread"],
                    cacheDirectory: true
                }
            },
            {
                test: require.resolve('bootstrap'),
                use: 'imports-loader?jQuery=jquery,Tether=tether'
            }
        ]
    }
};