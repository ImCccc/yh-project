const join = require("path").join;
const { app } = require("electron");

// 是否开发环境
const isDev = !app.isPackaged;

const env = process.env;

// 存放项目文件的路径
const BASE_PATH = join(env.USERPROFILE || env.PWD, "/electron-data");

// 视频记录文件路径
const DOWNLOAD_RECORD_PATH = join(BASE_PATH, "/electron-ice-screen-env.json");

// 日志路径
const LOG_PATH = join(BASE_PATH, "/logs");

// 预留 5G 缓存
const MEMORY_SPACE = 1024 * 5;

// 请求路径配置 - 开发环境
const REQUEST_URL_DEV = {
  webSocketUrl:
    "wss://platform-gateway.dev.inrobot.cloud/ws/smzx.smzx/StreamService.IceScreen",
  updaterUrl: "https://minio.dev.inrobot.cloud/smzx/appelectron/",
};

// 请求路径配置 - 生产环境
const REQUEST_URL_PRD = {
  webSocketUrl:
    "wss://gateway.smzx.inrobot.cloud/ws/smzx.smzx/StreamService.IceScreen",
  updaterUrl: "https://minio.smzx.inrobot.cloud/smzx/appelectron/",
};

// 开发环境的窗口配置
const WINDOW_OPTIONS_DEV = {
  x: 0,
  y: 0,
  show: false,
  useContentSize: true,
  autoHideMenuBar: true,
  disableAutoHideCursor: true,
  webPreferences: {
    nodeIntegration: true,
    contextIsolation: false,
  },
};

// 生产环境的窗口配置
const WINDOW_OPTIONS_PRD = {
  ...WINDOW_OPTIONS_DEV,
  frame: false,
  role: "hide",
  fullscreen: true,
  titleBarStyle: "hidden",
};

const REQUEST_URL =
  isDev || process.platform === "win32" ? REQUEST_URL_DEV : REQUEST_URL_PRD;
const WINDOWO_PTIONS = isDev ? WINDOW_OPTIONS_DEV : WINDOW_OPTIONS_PRD;

module.exports = {
  LOG_PATH,
  BASE_PATH,
  REQUEST_URL,
  MEMORY_SPACE,
  WINDOWO_PTIONS,
  DOWNLOAD_RECORD_PATH,
};
