const path = require('path');
const CopyPlugin = require('copy-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const WorkboxPlugin, { GenerateSW } = require('workbox-webpack-plugin');
var WebpackPwaManifest = require('webpack-pwa-manifest')
module.exports = function(env) {
    const configPath = path.join(__dirname, `config.${env.APP_ENV}.json`);
    return {
        devServer: {
            historyApiFallback: true
        },
        // webpack will take the files from ./src/index
        entry: './src/index',

        // and output it into /dist as bundle.js
        output: {
            path: path.join(__dirname, '/dist'),
            filename: 'bundle.js'
        },
        resolve: {
            alias: { config: configPath },
            extensions: ['.ts', '.tsx', '.js']
        },

        node: { process: true },
        devtool: 'source-map',
        module: {
            rules: [{
                    test: /\.s[ac]ss$/i,
                    use: [
                        // Creates `style` nodes from JS strings
                        'style-loader',
                        // Translates CSS into CommonJS
                        'css-loader',
                        // Compiles Sass to CSS
                        'sass-loader',
                    ],
                },
                {
                    test: /\.(ts|js)x?$/,
                    exclude: /node_modules/,
                    use: {
                        loader: 'babel-loader'
                    }
                },
                {
                    test: /\.jsx?$/, // Match both .js and .jsx files
                    exclude: /node_modules/,
                    loader: 'babel-loader',
                    query: {
                        presets: ['@babel/preset-env']
                    }
                },
                {
                    test: /\.svg$/,
                    loader: 'svg-inline-loader'
                },
                {
                    test: /\.css$/,
                    use: ['style-loader', 'css-loader']
                },
                {
                    test: /\.exec\.js$/,
                    use: ['script-loader']
                },
                {
                    test: /\.(png|jpe?g|gif)$/i,
                    use: [{
                        loader: 'file-loader'
                    }]
                },
                {
                    test: /\.json$/,
                    exclude: /node_modules/,
                    use: {
                        loader: 'json-loader'
                    }
                },
                {
                    test: /\.(woff(2)?|ttf|eot|svg)(\?v=\d+\.\d+\.\d+)?$/,
                    use: [{
                        loader: 'file-loader',
                        options: {
                            name: '[name].[ext]',
                            outputPath: 'fonts/'
                        }
                    }]
                }
            ]
        },
        externals: {
            Config: JSON.stringify(require(configPath))
        },
        plugins: [
            new HtmlWebpackPlugin({
                template: './src/index.html'
            }),
            // new GenerateSW({
            //     swDest: 'NET-Baires-Workes.js',
            //     include: [/\.html$/, /\.js$/]
            // }),
            // new WorkboxPlugin.InjectManifest({
            //     swSrc: 'NET-Baires-Workes.js',
            //     include: [/\.html$/, /\.js$/]
            // }),
            // new WebpackPwaManifest({
            //     name: 'NET-Baires',
            //     short_name: 'NET-Baires',
            //     description: 'Somos la comunidad de desarrolladores .NET mas grande',
            //     display: 'fullscreen',
            //     orientation: 'portrait',
            //     background_color: '#ffffff',
            //     crossorigin: 'use-credentials', //can be null, use-credentials or anonymous
            //     icons: [{
            //             'src': path.resolve('assets/images/icons/icon-72x72.png'),
            //             'sizes': '72x72',
            //             'type': 'image/png'
            //         },
            //         {
            //             'src': path.resolve('assets/images/icons/icon-96x96.png'),
            //             'sizes': '96x96',
            //             'type': 'image/png'
            //         },
            //         {
            //             'src': path.resolve('assets/images/icons/icon-128x128.png'),
            //             'sizes': '128x128',
            //             'type': 'image/png'
            //         },
            //         {
            //             'src': path.resolve('assets/images/icons/icon-144x144.png'),
            //             'sizes': '144x144',
            //             'type': 'image/png'
            //         },
            //         {
            //             'src': path.resolve('assets/images/icons/icon-152x152.png'),
            //             'sizes': '152x152',
            //             'type': 'image/png'
            //         },
            //         {
            //             'src': path.resolve('assets/images/icons/icon-192x192.png'),
            //             'sizes': '192x192',
            //             'type': 'image/png'
            //         },
            //         {
            //             'src': path.resolve('assets/images/icons/icon-384x384.png'),
            //             'sizes': '384x384',
            //             'type': 'image/png'
            //         },
            //         {
            //             'src': path.resolve('assets/images/icons/icon-512x512.png'),
            //             'sizes': '512x512',
            //             'type': 'image/png'
            //         }
            //     ]
            // }),
            new CopyPlugin([
                { from: 'assets', to: 'assets' },
                { from: 'web.config', to: 'web.config' },
                { from: 'NET-Baires-Workes.js', to: 'NET-Baires-Workes.js' }
            ])
        ]
    };
};