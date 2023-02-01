import path, { join } from "path";
import { fileURLToPath } from "url";

import ReactRefreshTypeScript from "react-refresh-typescript";
import ReactRefreshPlugin from "@pmmmwh/react-refresh-webpack-plugin";
import { CleanWebpackPlugin } from "clean-webpack-plugin";
import CssMinimizerPlugin from "css-minimizer-webpack-plugin";
import DuplicatePackageCheckerPlugin from "duplicate-package-checker-webpack-plugin";
import ForkTsCheckerWebpackPlugin from "fork-ts-checker-webpack-plugin";
import HtmlWebPackPlugin from "html-webpack-plugin";
import MiniCssExtractPlugin from "mini-css-extract-plugin";
import SpeedMeasurePlugin from "speed-measure-webpack-plugin";
import TerserPlugin from "terser-webpack-plugin";
import TsconfigPathsPlugin from "tsconfig-paths-webpack-plugin";
import webpack from "webpack";
import { BundleAnalyzerPlugin } from "webpack-bundle-analyzer";
import { merge, mergeWithRules } from "webpack-merge";

import { loaders, plugins as extendedPlugins } from "./webpack.config.extendedSettings.js";
import { choosePort, getBrowserSetting, getProxyTarget, getSourceMap, readDotEnv, webpackMessageFormatter, writeToJson } from "./webpack.utils.js";

const { ProvidePlugin, DefinePlugin } = webpack;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

/**
 * @typedef {Object} AllSettings
 * @property {boolean} isDev how the person is called
 * @property {boolean} isProd how the person is called
 * @property {boolean} vscodeDebug how the person is called
 * @property {boolean} bundleAnalyzer how the person is called
 * @property {string} environment how the person is called
 * @property {string} BASE_URL how the person is called
 * @property {string} WP_SOURCE_MAP how the person is called
 * @property {string} WP_ABSOLUTE_URL how the person is called
 */

/**
 * @typedef {Object} Env
 * @property {boolean} [vscodeDebug] how the person is called
 * @property {boolean} [bundleAnalyzer] how the person is called
 * @property {string} [environment] how the person is called
 * @property {boolean} [WEBPACK_BUNDLE] how the person is called
 * @property {boolean} [WEBPACK_BUILD] how the person is called
 */

/**
 * A webpack configuration is essentially an exported javascript object.
 * This javascript object contains several properties of various types (strings, booleans, functions),
 * and these properties are the options for webpack and webpack-dev-server.
 *
 * @param {Env} env
 * @param {{mode: string, env: Env}} argv
 */
export default async (env, argv) => {
  // Parameters from npm scripts in "package.json" or vscode tasks in "task.json"
  const { vscodeDebug, bundleAnalyzer, environment } = env;

  const isDev = argv && argv.mode === "development";
  const isProd = !isDev;

  let allSettings = {
    isDev,
    isProd,
    vscodeDebug, // Disables webpack browser open since vscode opens the browser in this mode
    bundleAnalyzer,
    environment: environment ?? argv.mode
  };

  // Parse .env files for environment specific settings/values in webpack config and react
  const dotenvSettings = readDotEnv(allSettings);

  // Determine which port of the running backend/sdotnet project we need to use when configuring webpack proxy
  const proxyTarget = getProxyTarget(allSettings, dotenvSettings);
  console.log("proxyTarget", proxyTarget);
  const devServerPort = await choosePort("0.0.0.0", parseInt(dotenvSettings.WP_PORT) || 8080);

  // Merge all settings
  allSettings = {
    ...allSettings, // Start with existing settings
    proxyTarget, // Add proxy target
    ...dotenvSettings, // Add dotenv settings
    WP_BROWSER: getBrowserSetting(vscodeDebug, dotenvSettings.WP_BROWSER), // Overwrite setting from dotenv
    BASE_URL: dotenvSettings && dotenvSettings.BASE_URL ? dotenvSettings.BASE_URL : "/", // Overwrite setting from dotenv
    WP_PORT: devServerPort
  };

  // Print settings to terminal
  console.log("Config values");
  console.table(allSettings);
  console.log("");

  const webpackConfigObject = {
    devServer: {
      port: allSettings.WP_PORT,
      ...(allSettings.WP_BROWSER !== false && {
        open: {
          target: allSettings.WP_OPEN_PAGE,
          ...(allSettings.WP_BROWSER !== "default" && {
            app: {
              name: allSettings.WP_BROWSER
            }
          })
        }
      }),
      historyApiFallback: true,
      hot: true,
      client: {
        logging: "warn",
        overlay: {
          errors: true,
          warnings: false
        }
      },
      ...(allSettings.proxyTarget !== "" && {
        proxy: {
          "/api": {
            target: allSettings.proxyTarget,
            secure: false
          }
        }
      })
    },
    mode: allSettings.isDev ? "development" : "production",
    target: "web",
    devtool: getSourceMap(allSettings),
    stats: allSettings.WP_VERBOSE_BUILD === "true" ? "normal" : "errors-only",
    entry: join(__dirname, "/src/Root.tsx"),
    output: {
      filename: allSettings.isDev ? "[name].bundle.js" : "[name].[contenthash].bundle.js",
      path: join(__dirname, "/dist"),
      publicPath: allSettings.baseUrl,
      pathinfo: allSettings.isProd // Disable in dev for faster compile time
    },
    ...(allSettings.isProd && {
      optimization: {
        splitChunks: {
          chunks: "all"
        },
        minimizer: [new TerserPlugin(), new CssMinimizerPlugin()]
      }
    }),
    module: {
      rules: [
        {
          test: /\.tsx?$/,
          use: [
            {
              loader: "ts-loader",
              options: {
                transpileOnly: true, // Type checking is done by ForkTsCheckerWebpackPlugin to speed up compile time
                compilerOptions: { jsx: allSettings.isDev ? "react-jsxdev" : "react-jsx" },
                ...(allSettings.isDev && {
                  getCustomTransformers: () => ({
                    before: [ReactRefreshTypeScript()]
                  })
                })
              }
            }
          ],
          include: join(__dirname, "/src"),
          exclude: /node_modules/
        },
        {
          test: /\.html$/,
          use: { loader: "html-loader" },
          include: join(__dirname, "/src/index.ejs")
        },
        {
          test: /\.css$/,
          use: [
            allSettings.isDev && {
              loader: "style-loader"
            },
            allSettings.isProd && {
              loader: MiniCssExtractPlugin.loader
            },
            {
              loader: "css-loader"
            }
          ].filter(Boolean)
        },
        {
          test: /\.(png|jpg|jpeg|gif|svg)$/,
          type: "asset/inline"
        },
        {
          test: /\.(png|jpg|jpeg|gif|svg)$/,
          type: "asset/resource"
        },
        {
          test: /\.(ttf|eot|woff|woff2)$/,
          type: "asset/resource"
        }
      ]
    },
    resolve: {
      extensions: [".tsx", ".ts", ".js"],
      plugins: [new TsconfigPathsPlugin()]
    },
    plugins: [
      new HtmlWebPackPlugin({
        template: "./src/index.ejs",
        filename: "./index.html",
        title: allSettings.WP_TITLE,
        base: allSettings.BASE_URL, // Base path is used so that ajax requests are routed properly in production
        lang: allSettings.WP_LANG,
        favicon: "./src/images/favicon.ico",
        meta: {
          "absolute-url": allSettings.WP_ABSOLUTE_URL
        }
      }),
      new ProvidePlugin({
        process: "process/browser"
      }),
      new DefinePlugin({
        "process.env": JSON.stringify(dotenvSettings)
      }),
      new ForkTsCheckerWebpackPlugin({
        eslint: {
          enabled: allSettings.WP_DISABLE_ESLINT === "true" ? false : true,
          files: "./src/**/*.{ts,tsx,js,jsx}" // required - same as command `eslint ./src/**/*.{ts,tsx,js,jsx} --ext .ts,.tsx,.js,.jsx`
        }
        // formatter: webpackMessageFormatter
      }),
      allSettings.isDev && new ReactRefreshPlugin(),
      allSettings.isProd && new CleanWebpackPlugin(), // Cleans "dist" from old build files
      allSettings.isProd &&
        new MiniCssExtractPlugin({
          // Options similar to the same options in webpackOptions.output
          // both options are optional
          filename: "[name].[contenthash].css",
          chunkFilename: "[id].[contenthash].css"
        }),
      allSettings.bundleAnalyzer && new BundleAnalyzerPlugin({ analyzerMode: "static" }),
      allSettings.WP_DUPLICATE_PACKAGE === "true" && new DuplicatePackageCheckerPlugin()
    ].filter(Boolean)
  };

  // Used when profiling webpack configuration
  const smp = new SpeedMeasurePlugin({
    disable: !allSettings.WP_SPEED_MEASURE || allSettings.WP_SPEED_MEASURE === "false"
  });

  // First, merge loaders. The order of objects to merge is important
  let mergedOutput = mergeWithRules({
    module: {
      rules: {
        test: "match",
        use: {
          loader: "match"
        }
      }
    }
  })(loaders(allSettings), webpackConfigObject);

  // Second, merge plugins
  mergedOutput = merge(mergedOutput, extendedPlugins(allSettings));

  if (allSettings.WP_DEBUG_WEBPACK === "true") {
    writeToJson(mergedOutput, `./webpackConfigOutput_${new Date().toISOString().split(":").join("-").split(".")[0]}.json`);
  }

  return smp.wrap(mergedOutput);
};
