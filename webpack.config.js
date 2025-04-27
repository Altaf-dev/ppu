const path = require("path");
const fs = require("fs");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const TerserPlugin = require("terser-webpack-plugin");
const autoprefixer = require('autoprefixer');

function generateHtmlPlugins(env, templateDir) {
  const templateFiles = fs.readdirSync(path.resolve(__dirname, templateDir));
  return templateFiles.map(item => {
    const parts = item.split(".");
    const name = parts[0];
    const extension = parts[1];
    return new HtmlWebpackPlugin({
      filename: `${name}.html`,
      template: path.resolve(__dirname, `${templateDir}/${name}.${extension}`),
      inject: false,
    });
  });
}

const htmlPlugins = env => generateHtmlPlugins(env, "./src/html/views");

const makeConfig = env => {
  return {
    entry: ["./src/js/index.js", "./src/scss/style.scss"],
    output: {
      filename: "./js/main.js"
    },
    devtool: "source-map",
    devServer:{
      static: {
        directory: path.join(__dirname, 'src'),
      },
      hot: true,
    },
    mode: 'development',
    optimization: {
      minimize: false,
      //   minimizer: [
      //     new TerserPlugin({
      //       extractComments: false
      //     })
      // ]
    },
    module: {
      rules: [
        {
          test: /\.(sass|scss)$/,
          include: path.resolve(__dirname, "src/scss"),
          use: [
            {
              loader: MiniCssExtractPlugin.loader,
              options: {}
            },
            {
              loader: "css-loader",
              options: {
                url: false
              }
            },
            {
              loader: "postcss-loader",
              options: {
                sourceMap: true,
                postcssOptions: {
                  plugins: () => [
                    require("cssnano")({
                      preset: [
                        "default",
                        {
                          discardComments: {
                            removeAll: true
                          }
                        }
                      ]
                    }),
                    autoprefixer({
                      overrideBrowserslist:['ie >= 8', 'last 4 version']
                    })
                  ]
                }
              }
            },
            {
              loader: "sass-loader",
              options: {
                sourceMap: true
              }
            }
          ]
        },
        {
          test: /\.html$/,
          include: path.resolve(__dirname, "src/html/includes"),
          use: ["raw-loader"]
        }
      ]
    },
    plugins: [
      new MiniCssExtractPlugin({
        filename: "./css/main.css"
      }),
      new CopyWebpackPlugin({
        patterns: [
          {
            from: "./src/fonts",
            to: "./fonts"
          },
          {
            from: "./src/favicon",
            to: "./favicon"
          },
          {
            from: "./src/img",
            to: "./img"
          },
          {
            from: "./src/uploads",
            to: "./uploads"
          },
          {
            from: "./src/css",
            to: "./css"
          },
          {
            from: "./src/php",
            to: "./php"
          }
        ]
      })
    ].concat(htmlPlugins(env))
  };
};

module.exports = (env, argv) => {
  if (argv.mode === "production") {
    const conf = makeConfig(argv);
    conf.plugins.push(new CleanWebpackPlugin());
    return conf;
  }
  return makeConfig(argv);
};