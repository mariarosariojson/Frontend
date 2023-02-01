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

const config = await webpackConfig({ WEBPACK_SERVE: true, ...args }, { mode: "development", env: { WEBPACK_SERVE: true } });

const { devServer: devServerOnlyConfig, ...webpackOnlyConfig } = config;

const compiler = Webpack(webpackOnlyConfig);
const server = new WebpackDevServer(devServerOnlyConfig, compiler);

function clearConsole() {
  process.stdout.write(process.platform === "win32" ? "\x1B[2J\x1B[0f" : "\x1B[2J\x1B[3J\x1B[H");
}

const isInteractive = process.stdout.isTTY;

compiler.hooks.invalid.tap("invalid", () => {
  if (isInteractive) {
    clearConsole();
    console.log("\n\n");
  }
  console.log("Compiling...");
});

compiler.hooks.done.tap("done", async (stats) => {
  if (isInteractive) {
    clearConsole();
    console.log("\n\n");
  }
});

server.startCallback(() => {
  console.log("Successfully started server on http://localhost:8080");
});
