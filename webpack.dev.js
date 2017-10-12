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
                test: require.resolve('jquery'),
                use: [
                    { loader: 'expose-loader', options: 'jQuery' },
                    { loader: 'expose-loader', options: '$' }
                ]
            },
            {
                test: require.resolve('tether'),
                use: [
                    { loader: 'expose-loader', options: 'Tether' }
                ]
            },
            {
                test: require.resolve('cropper'),
                use: "imports-loader?jQuery=>window.jQuery,define=>false,require=>false,exports=>false"
            }
        ]
    },
    devtool: 'source-map'
};