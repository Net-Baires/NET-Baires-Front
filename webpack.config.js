const path = require("path");
const CopyPlugin = require("copy-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
module.exports = function(env) {
  const configPath = path.join(__dirname, `config.${env.APP_ENV}.json`);
  return {
    devServer: {
      historyApiFallback: true
    },
    // webpack will take the files from ./src/index
    entry: "./src/index",

    // and output it into /dist as bundle.js
    output: {
      path: path.join(__dirname, "/dist"),
      filename: "bundle.js"
    },
    resolve: {
      alias: { config: configPath },
      extensions: [".ts", ".tsx", ".js"]
    },

    node: { process: true },
    devtool: "source-map",
    module: {
      rules: [
        {
          test: /\.(ts|js)x?$/,
          exclude: /node_modules/,
          use: {
            loader: "babel-loader"
          }
        },
        {
          test: /\.jsx?$/, // Match both .js and .jsx files
          exclude: /node_modules/,
          loader: "babel",
          query: {
            presets: ["react"]
          }
        },
        {
          test: /\.svg$/,
          loader: "svg-inline-loader"
        },
        {
          test: /\.css$/,
          use: ["style-loader", "css-loader"]
        },
        {
          test: /\.exec\.js$/,
          use: ["script-loader"]
        },
        {
          test: /\.(png|jpe?g|gif)$/i,
          use: [
            {
              loader: "file-loader"
            }
          ]
        },
        {
          test: /\.json$/,
          exclude: /node_modules/,
          use: {
            loader: "json-loader"
          }
        },
        {
          test: /\.(woff(2)?|ttf|eot|svg)(\?v=\d+\.\d+\.\d+)?$/,
          use: [
            {
              loader: "file-loader",
              options: {
                name: "[name].[ext]",
                outputPath: "fonts/"
              }
            }
          ]
        }
      ]
    },
    externals: {
      Config: JSON.stringify(require(configPath))
    },
    plugins: [
      new HtmlWebpackPlugin({
        template: "./src/index.html"
      }),
      new CopyPlugin([
        { from: "assets", to: "assets" },
        { from: "web.config", to: "web.config" }
      ])
    ]
  };
};
