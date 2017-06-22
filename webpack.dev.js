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
                    cacheDirectory: true
                }
            }
        ]
    }
};