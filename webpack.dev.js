module.exports = {
    output: {
        filename: 'app.js'
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                loader: 'babel-loader',
                options: {
                    presets: ['es2015', 'react'],
                    plugins: ["transform-object-rest-spread"],
                    cacheDirectory: true
                }
            }
        ]
    }
};