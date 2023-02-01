import { existsSync, writeFileSync } from "fs";
import { createRequire } from "module";
import os from "os";
import { basename, dirname, join } from "path";
import { fileURLToPath } from "url";

import { codeFrameColumns } from "@babel/code-frame";
import chalk from "chalk";
import detect from "detect-port-alt";
import { config } from "dotenv";
import fs from "fs-extra";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
/**
 * @typedef {import('./webpack.config').AllSettings} AllSettings
 */

/**
 *
 * @param {AllSettings} allSettings
 * @returns {string} Source map value for webpack config
 * @see https://webpack.js.org/configuration/devtool/
 */
export const getSourceMap = (allSettings) => {
  const { WP_SOURCE_MAP } = allSettings;

  if (allSettings.vscodeDebug) {
    return "source-map";
  }

  if (WP_SOURCE_MAP === "false") {
    return false;
  }

  if (allSettings.isDev && (WP_SOURCE_MAP === undefined || WP_SOURCE_MAP === "" || WP_SOURCE_MAP === "default" || WP_SOURCE_MAP === "true")) {
    return "eval-source-map";
  }

  return allSettings.WP_SOURCE_MAP;
};

/**
 *
 * @param {AllSettings} allSettings
 * @param {*} dotenvSettings
 * @returns {string} url
 */
export const getProxyTarget = (allSettings, dotenvSettings) => {
  // Determine which port from the running dotnet project we need to use when configuring webpack proxy
  // The port is determined by passing variables through npm scripts

  if (
    !allSettings.isDev ||
    dotenvSettings.WP_BACKEND_DEV_PROFILE === "" ||
    dotenvSettings.WP_BACKEND_DEV_PROFILE === "none" ||
    dotenvSettings.WP_BACKEND_DEV_PROFILE === "false"
  ) {
    return "";
  }

  if (dotenvSettings.WP_BACKEND_DEV_PROFILE !== "kestrel" && dotenvSettings.WP_BACKEND_DEV_PROFILE !== "iis") {
    try {
      return new URL(dotenvSettings.WP_BACKEND_DEV_PROFILE).href;
    } catch (error) {
      console.error("INVALID URL", dotenvSettings.WP_BACKEND_DEV_PROFILE);
      return "";
    }
  }

  try {
    const projectFolderName = basename(dirname(__dirname));
    const isKestrel = dotenvSettings.WP_BACKEND_DEV_PROFILE.toLowerCase() === "kestrel";

    const requireCompat = createRequire(import.meta.url);
    const dotnetLaunchSettings = requireCompat("../Backend/Properties/launchSettings.json");
    const debugConfiguration = isKestrel ? dotnetLaunchSettings.profiles[projectFolderName] : dotnetLaunchSettings.iisSettings.iisExpress;
    const formatedApplicationUrl = debugConfiguration.applicationUrl
      .split(";")
      .find((url) => url.includes(dotenvSettings.WP_HTTPS === "true" ? "https:" : "http:"));

    const proxyUrl = new URL(formatedApplicationUrl);
    if (debugConfiguration.sslPort && debugConfiguration.sslPort > 0) {
      proxyUrl.port = debugConfiguration.sslPort;
      proxyUrl.protocol = "https:";
    }
    const proxyTarget = proxyUrl.href;
    return proxyTarget;
  } catch (error) {
    console.error("COULD NOT READ BACKEND PROFILE");
    return "";
  }
};

/**
 *
 * @param {AllSettings} allSettings
 * @returns {*}
 */
export const readDotEnv = (allSettings) => {
  // Parse .env files for using environment specific variables in webpack config and react code
  let dotenvSettings;
  const dotenvSettingsGlobal = config({ path: join(__dirname, ".env") }).parsed;

  dotenvSettings = config({ path: join(__dirname, `.env.${allSettings.environment}`) }).parsed;

  // A developer might use an .env.local file for environment variables only to their environment
  // In that case merge these variables with other .env file
  const envLocal = join(__dirname, ".env.local");
  if (existsSync(envLocal)) {
    const dotenvSettingsLocal = config({ path: envLocal }).parsed;
    dotenvSettings = { ...dotenvSettings, ...dotenvSettingsLocal };
  }

  const mergedDotenvSettings = { ...dotenvSettingsGlobal, ...dotenvSettings };

  return mergedDotenvSettings;
};

/**
 *
 * @param {*} data
 * @param {string} path
 */
export const writeToJson = (data, path) => {
  try {
    writeFileSync(path, JSON.stringify(data));
  } catch (err) {
    console.error(err);
  }
};

/**
 *
 * @param {boolean} vscodeDebug
 * @param {string} BROWSER
 * @returns {string} Browser value for webpack config
 */
export const getBrowserSetting = (vscodeDebug, BROWSER) => {
  // Webpack doesnt need open browser when debugging in vscode
  if (vscodeDebug || BROWSER === "none" || BROWSER === "false") {
    return false;
  }
  // If BROWSER is not defined or if set as default, then open users default browser
  if (!BROWSER || BROWSER === "default") {
    return "default";
  }
  // Open the browser given in dotenv file
  return BROWSER;
};

/**
 *
 * @param {string} host
 * @param {string} defaultPort
 * @returns
 */
export const choosePort = (host, defaultPort) => {
  return detect(defaultPort, host).then(
    (port) =>
      new Promise((resolve) => {
        if (port !== defaultPort) {
          console.log(`Port already in use. Using next available port: ${port}`);
        }
        return resolve(port);
      })
  );
};

const createBasicFormatter = () => {
  return function basicFormatter(issue) {
    return chalk.grey(`${issue.code}: `) + issue.message;
  };
};

const basicFormatter = createBasicFormatter();
// const options = { linesBelow: 2, message: "bla_asdasd" };
const options = {};

export const webpackMessageFormatter = (issue) => {
  const source = issue.file && fs.existsSync(issue.file) && fs.readFileSync(issue.file, "utf-8");
  let frame = "";
  if (source && issue.location && issue.severity === "error") {
    frame = codeFrameColumns(source, issue.location, {
      highlightCode: true,
      ...(options || {})
    })
      .split("\n")
      .map((line) => `  ${line}`)
      .join(os.EOL);
  }

  const lines = [basicFormatter(issue)];

  if (frame && issue.severity === "error") {
    lines.push(frame);
  }

  return lines.join(os.EOL);
};
