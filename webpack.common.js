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
                test: resolve('jquery'),
                use: [
                    { loader: 'expose-loader', options: 'jQuery' },
                    { loader: 'expose-loader', options: '$' }
                ]
            },
            {
                test: resolve('tether'),
                use: [
                    { loader: 'expose-loader', options: 'Tether' }
                ]
            },
            {
                test: resolve('cropper'),
                use: "imports-loader?jQuery=>window.jQuery,$=>window.jQuery,define=>false,require=>false,exports=>false,this=>window"
            }
        ]
    }
};

function resolve(module) {
    return path => {
        let modulePath = null;
        try { modulePath = require.resolve(module) } catch (e) {}
        return modulePath === path;
    }
}