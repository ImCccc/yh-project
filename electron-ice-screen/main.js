// https://www.electronjs.org/zh/docs/latest/api/browser-window
const os = require("os");
const fs = require("fs");
const axios = require("axios");
const { join } = require("path");
const diskinfo = require("diskinfo");
const package = require("./package.json");
const qiaoIsOnline = require("qiao-is-online");
const { NsisUpdater, AppImageUpdater } = require("electron-updater");
const { app, BrowserWindow, ipcMain, globalShortcut } = require("electron");
const { logger, deleteLog } = require("./src/main/log.js");
const {
  BASE_PATH,
  REQUEST_URL,
  MEMORY_SPACE,
  WINDOWO_PTIONS,
  DOWNLOAD_RECORD_PATH,
} = require("./src/main/constant.js");

process.env["ELECTRON_DISABLE_SECURITY_WARNINGS"] = "true";

let win;

// 系统
const platform = process.platform;

// 是否开发环境
const isDev = !app.isPackaged;

// 可用缓存
let availableMemory;

// 当前记录信息
let recordConfig = {};
// 初始化配置
const defauleRecordConfig = {
  volume: 1,
  windowHide: false,
};

/**
 * 说明: 获取视频记录配置文件, 没有就创建配置文件
 * 参数: 无
 * 返回: 视频记录配置信息, 配置格式:
 * {
 *  [记录id]: {
 *    time:          最后播放时间
 *    sizeMB:        视频大小, 单位MB
 *    localVideoPath:本地缓存路径.mp4
 *    downloadUrl:   线上下载地址
 *  }
 * }
 */
function getRecordConfig() {
  try {
    if (fs.existsSync(DOWNLOAD_RECORD_PATH)) {
      return JSON.parse(fs.readFileSync(DOWNLOAD_RECORD_PATH, "utf-8"));
    }

    if (!fs.existsSync(BASE_PATH)) {
      fs.mkdirSync(BASE_PATH);
    }

    fs.writeFileSync(
      DOWNLOAD_RECORD_PATH,
      JSON.stringify(defauleRecordConfig, null, 2),
      "utf8"
    );
    return { ...defauleRecordConfig };
  } catch (error) {
    return { ...defauleRecordConfig };
  }
}

// 向浏览器打印数据
function _log(data, title) {
  if (!win || !win.webContents) return;
  win.webContents.send("browser-consolelog", { data, _title: title });
}

/**
 * 说明: 自动更新逻辑
 * 参数: 无
 * 返回: boolean, 是否有更新
 */
let autoUpdater;
let isUpdateError; // 是否更新失败
let needQuitAndInstall = false; // 判断是否在窗口隐藏的时候更新完成
function updateVersion() {
  if (autoUpdater) return;

  const updaterOptions = {
    provider: "generic",
    url: REQUEST_URL.updaterUrl,
  };

  isUpdateError = false;
  autoUpdater = new NsisUpdater(updaterOptions);
  autoUpdater.logger = logger;

  if (platform === "linux") {
    autoUpdater = new AppImageUpdater(updaterOptions);
  }

  return new Promise((resolve) => {
    const _timer = setTimeout(() => resolve(false), 3000);

    // 当有可用更新的时候触发, 更新将自动下载
    autoUpdater.on("update-available", (info) => {
      _timer && clearTimeout(_timer);
      resolve(true);
    });

    // 下载进度
    autoUpdater.on("download-progress", (progress) => {
      if (isUpdateError) return; // 更新失败, 不需要发送下载进度
      win.webContents.send("download-progress", progress);
    });

    // 在更新下载完成的时候触发
    autoUpdater.on("update-downloaded", (info) => {
      logger.info(`下载版本完成`);
      if (recordConfig.windowHide) {
        needQuitAndInstall = true;
      } else {
        autoUpdater.quitAndInstall(false, true);
      }
    });

    // 当没有可用更新的时候触发
    autoUpdater.on("update-not-available", (info) => {
      _timer && clearTimeout(_timer);
      autoUpdater = undefined;
      resolve(false);
    });

    // 更新失败
    autoUpdater.on("error", (error) => {
      isUpdateError = true;
      autoUpdater = undefined;
      win.webContents.send("error-tip", "冰屏更新失败");
      logger.error(`冰屏更新失败`);
    });

    // 自动更新
    autoUpdater.checkForUpdatesAndNotify();
  });
}

// 本地的记录文件和磁盘中的记录同步
function updateRecordConfig(info, params) {
  fs.writeFileSync(
    DOWNLOAD_RECORD_PATH,
    JSON.stringify(recordConfig, null, 2),
    "utf8"
  );
  if (!info) return;
  logger.info(info, params);
}

/**
 * 说明: 下载完成, 需要更新记录文件
 * 参数: videoInfo: 音频信息; localVideoPath: 本地路径
 * 返回: 无
 */
function addRecord(videoInfo, localVideoPath) {
  const addItem = {
    ...videoInfo,
    localVideoPath,
    time: new Date().valueOf(),
  };
  recordConfig[videoInfo.recordId] = addItem;
  updateRecordConfig("addRecord:", addItem);
}

// 更新播放时间
function updateRecordTime(recordId) {
  const currentTime = new Date().valueOf();
  recordConfig[recordId].time = currentTime;
  updateRecordConfig("播放缓存视频之前更新播放时间, 记录ID:", `${recordId}`);
}

/**
 * 说明: 根据 记录id(recordId) 和 视频下载地址(thisDownloadUrl), 判断是否有本地缓存,
 *       有就返回缓存路径, 没有返回false
 * 参数: recordId 记录ID; thisDownloadUrl: 下载地址
 * 返回: 本地缓存路径 / false
 */
const getLocalPath = (recordId, thisDownloadUrl, thisSizeMB) => {
  try {
    // 记录文件不存在, 说明没有下载过
    if (!fs.existsSync(DOWNLOAD_RECORD_PATH)) return false;

    const recordInfo = recordConfig[recordId];

    // 当前记录不存在, 说明没有下载过视频
    if (!recordInfo) {
      return false;
    }

    const { downloadUrl, localVideoPath, sizeMB } = recordInfo;

    // 当前记录存在, 但是下载地址发生变化, 或者视频大小不一样, 需要替换视频
    if (thisDownloadUrl !== downloadUrl || sizeMB !== thisSizeMB) {
      return false;
    }

    // 当前记录存在, 但是下载地址没有发生变化, 但是本地视频被删除
    if (!fs.existsSync(localVideoPath)) {
      return false;
    }

    return localVideoPath;
  } catch (error) {
    return false;
  }
};

/**
 * 说明: 下载视频放在本地磁盘, 更新记录文件
 * 参数: downloadUrl 下载路径; localVideoPath: 本地磁盘路径
 * 返回: 无
 */
async function downloadVideo(downloadUrl, localVideoPath, callback) {
  let file;
  let cancelAxios;
  let start = "pending";
  try {
    const res = await axios({
      method: "GET",
      url: downloadUrl,
      responseType: "stream",
      cancelToken: new axios.CancelToken((c) => (cancelAxios = c)),
    });

    file = fs.createWriteStream(localVideoPath);
    res.data.pipe(file);
    let cur = 0;
    const len = parseInt(res.headers["content-length"]);

    res.data.on("data", (chunk) => {
      cur += chunk.length;
      const percentage = Math.round((cur / len) * 100);
      win.webContents.send("video-download-progress", percentage);
    });

    res.data.on("error", (error) => {
      file && file.close();
      if (error.message !== "request canceled") {
        // 下载视频失败, 浏览器提示用户
        logger.error("视频下载失败: ", error.message);
        win.webContents.send("error-tip", "视频下载失败");
      }
    });

    res.data.on("end", () => {
      start = "success";
      file && file.close();
    });

    file.on("finish", () => {
      if (file) {
        file = null;
        cancelAxios = null;
        if (start === "success") return callback();
        deleteFileByPath(localVideoPath);
        logger.info(`删除未下载完成的视频:${localVideoPath}`);
      }
    });
  } catch (error) {
    file && file.close();
    logger.error(`下载视频报错:`, error.message);
  }

  return () => {
    if (cancelAxios) {
      cancelAxios("request canceled");
      cancelAxios = null;
    }
    // 取消请求, 必须同步删除文件
    if (file) {
      file.close();
      file = null;
      deleteFileByPath(localVideoPath);
      logger.info(`删除未下载完成的视频:${localVideoPath}`);
    }
  };
}

let cancelPrevRequesr;
function cancelReques() {
  cancelPrevRequesr && cancelPrevRequesr();
}

/**
 * 说明: 下载视频
 * 参数: videoInfo 视频信息, 格式: { sizeMB: 视频大小; recordId: 记录ID; downloadUrl: 下载地址 }
 *       callback: 下载完成后回调
 */
async function downloadFile(videoInfo, callback) {
  const { recordId, downloadUrl, sizeMB } = videoInfo;
  await checkMemory(sizeMB);
  localVideoPath = join(BASE_PATH, `/${recordId}.mp4`);
  cancelPrevRequesr = await downloadVideo(downloadUrl, localVideoPath, () => {
    addRecord(videoInfo, localVideoPath); // 添加记录
    availableMemory -= sizeMB; // 下载完成后, 更新可用空间
    callback(localVideoPath);
  });
}

// 下载时, 先检查内存, 不够就删除本地视频
async function checkMemory(sizeMB) {
  const diff = sizeMB - availableMemory;
  // 缓存足够
  if (diff < 0) {
    _log({ sizeMB, availableMemory }, "视频缓存足够");
    return true;
  }
  // 缓存不够, 需要删除本地视频
  return deleteVideo(diff);
}

// 根据路径删除视频文件
function deleteFileByPath(path) {
  if (fs.existsSync(path)) fs.unlinkSync(path);
}

/**
 * 说明: 下载视频需要先检查磁盘够不够, 不够要删除本地视频
 * 参数: sizeMB: 需要的空间
 * 返回: false 失败; true 成功
 */
function deleteVideo(sizeMB) {
  // 时间排序, 最后播放的排在最后, 获取总的大小
  const timeSortList = Object.keys(recordConfig)
    .map((key) => recordConfig[key])
    .sort((a, b) => b.time - a.time);

  try {
    const _delete = () => {
      if (timeSortList.length === 0) {
        logger.error(`已经删除所有视频`);
        return false;
      }

      let deleteItem = timeSortList.pop();
      if (deleteItem) {
        deleteFileByPath(deleteItem.localVideoPath);
        delete recordConfig[deleteItem.recordId];
        sizeMB -= deleteItem.sizeMB;
        availableMemory += deleteItem.sizeMB; // 删除成功后, 更新可用空间
        logger.info(`缓存不足,删除视频: ${deleteItem.localVideoPath}`);
      }

      return sizeMB > 0;
    };

    let needDelete = _delete();
    while (needDelete) {
      needDelete = _delete();
    }
  } catch (error) {
    logger.error(`删除视频报错`);
  }

  updateRecordConfig("deleteVideo");
  return true;
}

// 打开开发者工具
function openDevTools() {
  win.webContents.openDevTools();
  win.setPosition(0, 0);
  _log({ 可用缓存: availableMemory, 版本号: package.version }, "一些信息:");
}

// 注册快键键
function registerFastkey() {
  globalShortcut.register("Alt + ctrl + q", () => app.quit());
  globalShortcut.register("ctrl + k", openDevTools);
}

/**
 * 说明: 启动程序,需要检查联网,如果断网,隔一秒检查一次,直到连上网络; (如果再次断网不会检查)
 * 参数: 无
 * 返回: 无
 */
function isConnectNetwork(resolve) {
  try {
    qiaoIsOnline.isOnline().then(function (result) {
      if (result === "online") return resolve();
      setTimeout(() => isConnectNetwork(resolve), 2000);
    });
  } catch (error) {
    setTimeout(() => isConnectNetwork(resolve), 2000);
  }
}

// 发送数据给浏览器端
function getGlobalData(thisStatus) {
  const networkInterfaces = os.networkInterfaces();
  for (let k in networkInterfaces) {
    let v = networkInterfaces[k];
    for (let i = 0; i < v.length; i++) {
      const item = v[i];
      if (item.mac && !item.mac.startsWith("00:00:00")) {
        const data = {
          thisStatus,
          volume: recordConfig.volume,
          windowHide: recordConfig.windowHide,
          macAddress: item.mac,
          version: package.version,
          updaterUrl: REQUEST_URL.updaterUrl,
          webSocketUrl: REQUEST_URL.webSocketUrl,
        };
        return data;
      }
    }
  }
}

// 发送数据给浏览器
function sendDataBrowser(status) {
  let _timer;
  return new Promise((resolve) => {
    ipcMain.once("send-data-success", () => {
      clearInterval(_timer);
      resolve(data);
    });

    let data = getGlobalData(status);
    if (data) win.webContents.send("globalData", data);

    _timer = setInterval(() => {
      data = data || getGlobalData(status);
      if (data) {
        logger.info(`发送数据给浏览器 ......`);
        win.webContents.send("globalData", data);
      } else {
        logger.error(`获取全局数据失败 ......`);
      }
    }, 1000);
  });
}

// 获取磁盘的内存信息
function getMemoryInformation() {
  return new Promise((resolve, reject) => {
    diskinfo.getDrives((err, aDrives) => {
      for (var i = 0; i < aDrives.length; i++) {
        const info = aDrives[i];
        if (platform === "win32") {
          if (info.mounted.toLowerCase() === "c:") {
            resolve({
              total: (info.blocks / 1024 / 1024).toFixed(1), // 总量 MB
              used: (info.used / 1024 / 1024).toFixed(1), // 已使用 MB
              available: (info.available / 1024 / 1024).toFixed(1), // 可用 MB
              capacity: info.capacity, // 使用率
            });
          }
        }
        if (platform === "linux") {
          if (info.mounted.toLowerCase() === "/") {
            resolve({
              total: (info.blocks / 1024).toFixed(1), // 总量 MB
              used: (info.used / 1024).toFixed(1), //已使用 MB
              available: (info.available / 1024).toFixed(1), // 可用 MB
              capacity: info.capacity, // 使用率
            });
          }
        }
      }
    });
  });
}

function createWindow() {
  return new Promise((resolve) => {
    win = new BrowserWindow(WINDOWO_PTIONS);
    win.loadFile("src/index.html");

    win.on("closed", () => {
      win = null;
    });

    // 在加载页面时，渲染进程第一次完成绘制时，如果窗口还没有被显示，
    // 渲染进程会发出 ready-to-show 事件; 在此事件后显示窗口将没有视觉闪烁
    win.once("ready-to-show", () => {
      resolve();
    });

    win.on("show", async () => {
      try {
        win.focus();
        win.restore();
      } catch (error) {}
      recordConfig.windowHide = false;
      win.webContents.send("window-hide", { hide: false });
      updateRecordConfig();
      // 在窗口隐藏的时候下载更新完成, 再次显示, 要安装应用
      if (needQuitAndInstall) autoUpdater.quitAndInstall(false, true);
    });

    win.on("hide", () => {
      recordConfig.windowHide = true;
      win.webContents.send("window-hide", { hide: true });
      updateRecordConfig();
    });
  });
}

// 当全部窗口关闭时退出。
app.on("window-all-closed", () => {
  app.quit();
});

app.on("quit", () => {
  logger.info(`quit`);
});

app.on("activate", () => {
  logger.info(`activate`);
  if (win === null) createWindow();
});

// 初始化后 调用函数
app.on("ready", async () => {
  logger.info(`\n\n================== ${platform}设备启动 ================== `);
  recordConfig = getRecordConfig(); // 获取配置文件
  logger.info(`记录文件信息: ${JSON.stringify(recordConfig)}`);

  const windowHide = recordConfig.windowHide;
  await createWindow();
  win[windowHide ? "hide" : "show"]();

  // 注册快键键
  registerFastkey();

  // 检查网络状态
  logger.info(`检查网络`);
  await new Promise(isConnectNetwork);
  logger.info(`联网成功`);

  // 检查是否有更新
  const hasUpdate = await updateVersion();

  // 发送数据给浏览器端, 等待浏览器收到数据
  let thisGlobalData = await sendDataBrowser(hasUpdate ? 2 : 3);
  logger.info("浏览器收到数据:", thisGlobalData);

  // 删除10天前的日志
  deleteLog();

  // 获取缓存信息
  const info = await getMemoryInformation();
  availableMemory = info.available - MEMORY_SPACE;
  logger.info(`当前可用缓存:${availableMemory.toFixed(1)}MB`);

  if (isDev) openDevTools();
});

// 浏览器告诉服务器下载地址, 服务器下载完成, 告诉浏览器
ipcMain.on("StartDownloadResp", (event, data) => {
  cancelReques(); // 取消上次请求
  const { recordId, downloadUrl, sizeMB } = data;
  let localVideoPath = getLocalPath(recordId, downloadUrl, sizeMB);
  event.returnValue = !!localVideoPath;
  if (localVideoPath) {
    updateRecordTime(recordId);
    logger.info(`本次播放的视频已缓存`);
    event.sender.send("video-finish-download", { localVideoPath, ...data });
  } else {
    downloadFile(data, (localVideoPath) => {
      event.sender.send("video-finish-download", { localVideoPath, ...data });
      logger.info(`告诉浏览器播放地址: ${localVideoPath}`);
    });
  }
});

ipcMain.on("CheckVersionResp", async () => {
  logger.info(`检查更新 CheckVersionResp`);
  const hasUpdate = await updateVersion();
  win.webContents.send("needUpdate", hasUpdate);
});

// 还原窗口
ipcMain.on("win-restore", () => {
  win.show();
});

// 窗口最小化
ipcMain.on("win-minimize", () => {
  win.hide();
});

// 修改音量
ipcMain.on("update-volume", (_, volume) => {
  recordConfig.volume = volume;
  updateRecordConfig("update-volume", volume);
});

// 取消上一个请求, 删除下载中的视频
ipcMain.on("cancelReques", cancelReques);

// 浏览器端添加日志
ipcMain.on("add-log", (_, { describe, type, data }) => {
  const params = data ? [`${describe}:`, data] : [describe];
  logger[type || "info"](...params);
});
