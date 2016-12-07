var webpack = require('webpack');
var OpenBrowserPlugin = require('open-browser-webpack-plugin');
var minimize = process.argv.indexOf('--minimize') !== -1;
var CopyWebpackPlugin = require('copy-webpack-plugin');
var CleanWebpackPlugin = require('clean-webpack-plugin');
var path = require('path');

var pluginsArray = [
    new webpack.HotModuleReplacementPlugin(),
    new OpenBrowserPlugin({url: 'http://localhost:8081'}),
    new CleanWebpackPlugin(['dist'], {
        root: path.resolve(__dirname),
        verbose: true,
        dry: false,
    }),
    new CopyWebpackPlugin([
        { from: 'static', to: 'static'},
        { from: 'index_prod.html', to: 'index.html'}
    ])
];

if (minimize) {
    pluginsArray.push(new webpack.optimize.UglifyJsPlugin({
        compress: {
            sequences: true,
            dead_code: true,
            conditionals: true,
            booleans: true,
            unused: true,
            if_return: true,
            join_vars: true,
            drop_console: true
        },
        mangle: {
            except: ['$super', '$', 'exports', 'require']
        },
        output: {
            comments: false
        }
    }));

    pluginsArray.push(new webpack.DefinePlugin({
        'process.env': {
            'NODE_ENV': JSON.stringify('production')
        }
    }));
}

module.exports = {
    devServer: {
        hot: true,
        inline: true,
        progress: true
    },
    entry: './src/main.js',
    output: {
        path: './dist',
        publicPath: '/dist',
        filename: 'app.bundle.js'
    },
    module: {
        loaders: [
            {
                exclude: '/node_modules/',
                test: /\.js[x]?/,
                loader: 'babel-loader',
                query: {
                    presets: ['react']
                }
            },
            {
                test: /\.(s)?css$/,
                loaders: ["style", "css", "sass"]
            },
            {
                test: /\.html$/,
                loader: "raw-loader"
            },
            {
                test: /\.(woff|woff2|ttf|svg|eot)/,
                loader: 'url?limit=10000',
            }
        ]
    },
    plugins: pluginsArray
};