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
    devtool: "source-map"
};