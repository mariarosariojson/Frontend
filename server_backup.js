import Webpack from "webpack";
import WebpackDevServer from "webpack-dev-server";

import webpackConfig from "./webpack.config.js";

const getArgs = () => {
  const args = {};
  process.argv.slice(2, process.argv.length).forEach((arg) => {
    // long arg
    if (arg.slice(0, 2) === "--") {
      const longArg = arg.split("=");
      const longArgFlag = longArg[0].slice(2, longArg[0].length);
      const longArgValue = longArg.length > 1 ? longArg[1] : true;
      args[longArgFlag] = longArgValue;
    }
    // flags
    else if (arg[0] === "-") {
      const flags = arg.slice(1, arg.length).split("");
      flags.forEach((flag) => {
        args[flag] = true;
      });
    }
  });
  return args;
};
const args = getArgs();
// console.log(args);
// console.log(args.mode);

// console.log(process.argv.slice(2));
// // print process.argv
// process.argv.forEach(function (val, index, array) {
//   console.log(`${index}: ${val}`);
// });

// console.log(await webpackConfig({ WEBPACK_SERVE: true }, { mode: "development", env: { WEBPACK_SERVE: true } }));

const config = await webpackConfig({ WEBPACK_SERVE: true }, { mode: "development", env: { WEBPACK_SERVE: true } });

// console.log(wpConfig.devServer);
const { devServer: devServerOnlyConfig, ...webpackOnlyConfig } = config;
console.log(devServerOnlyConfig);
console.log(webpackOnlyConfig);
const compiler = Webpack(webpackOnlyConfig);

// writeToJson(config, `./completeConfig${new Date().toISOString().split(":").join("-").split(".")[0]}.json`);
// writeToJson(devServerOnlyConfig, `./devServerOnlyConfig${new Date().toISOString().split(":").join("-").split(".")[0]}.json`);
// writeToJson(webpackOnlyConfig, `./webpackOnlyConfig${new Date().toISOString().split(":").join("-").split(".")[0]}.json`);

// const compiler = Webpack(await webpackConfig({ WEBPACK_SERVE: true }, { mode: "development", env: { WEBPACK_SERVE: true } }));
// // // const devServerOptions = { ...devServer, open: true };
// const server = new WebpackDevServer(
//   {
//     // port: allSettings.WP_PORT,
//     open: {
//       //   target: allSettings.WP_OPEN_PAGE,
//       app: {
//         name: "firefox"
//       }
//     },
//     historyApiFallback: true,
//     hot: true,
//     client: {
//       logging: "warn",
//       overlay: {
//         errors: true,
//         warnings: false
//       }
//     }
//     // ...(allSettings.proxyTarget !== "" && {
//     //   proxy: {
//     //     "/api": {
//     //       target: allSettings.proxyTarget,
//     //       secure: false
//     //     }
//     //   }
//     // })
//   },
//   compiler
// );

const server = new WebpackDevServer(devServerOnlyConfig, compiler);

server.startCallback(() => {
  console.log("Successfully started server on http://localhost:8080");
});
