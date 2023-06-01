const { ipcRenderer } = window.require("electron");

const BG_VIDEO_URL = "bg_video.WebM";
const SCREEN_SAVER_VIDEO = "screen_video.mp4";

const STATUS_READY = 3; // 待机状态
const STATUS_PLAY = 4; // 播放视频中
const STATUS_WINDOW_HIDE = 5; // 窗口隐藏中
const STATUS_CHECK_NETWORK = 0; // 网络检查中
const STATUS_VIDEO_DOWNLOAD = 1; // 视屏下载中
const STATUS_SYSTEM_UPDATE = 2; // 冰屏更新中

let thisVolume = 1; // 当前音量
let thisStatus = STATUS_CHECK_NETWORK; // 当前状态
let thisSendParams = {}; // 缓存视频下载中或者播放中的参数
let thisWindowHide = false; // 当前窗口是否隐藏
let networkSuccess = false; // 是否联网成功

// 状态配置
const statusConfig = {
  [STATUS_CHECK_NETWORK]: {
    title: "网络检查中",
    videoUrl: BG_VIDEO_URL,
  },
  [STATUS_VIDEO_DOWNLOAD]: {
    percentage: true,
    title: "视频下载中",
    videoUrl: BG_VIDEO_URL,
    device_status: "下载视频",
  },
  [STATUS_SYSTEM_UPDATE]: {
    percentage: true,
    title: "冰屏更新中",
    videoUrl: BG_VIDEO_URL,
    device_status: "更新中",
  },
  [STATUS_PLAY]: {
    device_status: "播放视频",
  },
  [STATUS_READY]: {
    videoUrl: SCREEN_SAVER_VIDEO,
    device_status: "待机中",
  },
  [STATUS_WINDOW_HIDE]: {
    device_status: "手动模式",
    videoUrl: SCREEN_SAVER_VIDEO,
  },
};

const dom_video = document.getElementById("video");
const dom_tipBox = document.getElementById("tipBox");
const dom_tipTitle = document.getElementById("tipTitle");
const dom_percentage = document.getElementById("percentage");
const dom_percentageWrap = document.getElementById("percentageWrap");
const dom_errorTipWrap = document.getElementById("errorTipWrap");
const dom_countdown = document.getElementById("countdown");
const dom_errorTitle = document.getElementById("errorTitle");

let ws;
let version = "";
let device_id = "";
let webSocketUrl = "";
let percentageWrapWidth = 0;

// 发送数据给后台
function _send(type, data) {
  ipcRenderer.send(type, data);
}

// 初始化播放器
function initVideoConfig(src) {
  dom_video.currentTime = 0; // 当前播放时间
  dom_video.playbackRate = 1; // 播放速度
  if (src) dom_video.src = src;
}

// 播放背景视频, 待机状态 / 下载中状态
function playLocalVideo(src) {
  if (!src) return;
  if (!dom_video.src || !dom_video.src.includes(src)) {
    dom_video.src = src;
  }
  dom_video.play();
}

// 获取当前播放视频时长
function getVideoDuration(src) {
  initVideoConfig(src);
  return new Promise((resolve) => {
    dom_video.onloadedmetadata = () => {
      dom_video.volume = thisVolume;
      resolve(`${parseInt(dom_video.duration * 1000)}`);
    };
  });
}

let countdownTimer;
function clearCountdownInterval() {
  countdownTimer && clearInterval(countdownTimer);
  countdownTimer = undefined;
}
function countdownInterval() {
  clearCountdownInterval();
  let n = 10;
  dom_countdown.innerText = n;
  countdownTimer = setInterval(() => {
    dom_countdown.innerText = --n;
    if (n === -1) {
      toggleTitlePercentage();
      clearCountdownInterval();
    }
  }, 1000);
}

// 显示错误信息
function showErrorTip(errorMsg) {
  dom_errorTitle.innerText = errorMsg;
  dom_errorTipWrap.style.display = "flex";
  dom_tipBox.style.display = "none";
  playLocalVideo(BG_VIDEO_URL);
  // 如果此时窗口隐藏, 显示的时再倒计时
  if (!thisWindowHide) countdownInterval();
}

// 根据状态, 更新提示
function toggleTitlePercentage(percentage) {
  // 没有联网, 重置状态
  if (!networkSuccess) thisStatus = STATUS_CHECK_NETWORK;

  // 隐藏错误消息
  dom_errorTipWrap.style.display = "none";
  clearCountdownInterval();

  let { title, videoUrl } = statusConfig[thisStatus];

  if (title) {
    dom_tipTitle.innerHTML = title;
    dom_tipBox.style.display = "";
  } else {
    dom_tipBox.style.display = "none";
    dom_tipTitle.innerHTML = "";
  }

  // 播放背景视频
  playLocalVideo(videoUrl);

  // 隐藏进度条
  if (percentage === undefined) return hidePercentage();

  showPercentage(percentage);
}

// 显示下载进度
function showPercentage(percentage) {
  dom_percentageWrap.style.display = "flex";
  percentageWrapWidth = percentageWrapWidth || dom_percentageWrap.clientWidth;
  dom_percentage.style.width = (percentageWrapWidth * percentage) / 100 + "px";
  dom_percentage.innerHTML = `${percentage}%`;
  dom_percentage.style.display = percentage ? "" : "none";
}

function hidePercentage() {
  dom_percentageWrap.style.display = "none";
  dom_percentage.innerHTML = "";
}

// 状态上报
function sendStatus(params) {
  if (!ws || !ws.send) return;

  const { device_status } =
    statusConfig[thisWindowHide ? STATUS_WINDOW_HIDE : thisStatus];

  params = {
    device_status,
    device_agrs: [`${new Date().valueOf()}`],
    ...params,
  };

  const sendParams = {
    device_id,
    command: "PropertyChangeReq",
    time_stamp: new Date().valueOf(),
    msg_id: "msg_id-" + Math.random(),
    data: JSON.stringify(params),
  };
  _send("add-log", { describe: "状态上报", data: params });
  ws.send(JSON.stringify(sendParams));
}

function handEvent() {
  // 网络连接完成, 检查更新完成, 后台会发生数据给浏览器
  ipcRenderer.on("globalData", (_, globalData) => {
    version = globalData.version;
    device_id = globalData.macAddress;
    thisVolume = globalData.volume || 1;
    webSocketUrl = globalData.webSocketUrl;
    thisWindowHide = globalData.windowHide;
    thisStatus = globalData.thisStatus;
    networkSuccess = true;
    ipcRenderer.send("send-data-success"); // 回复后台, 已经收到数据
    toggleTitlePercentage(thisStatus === STATUS_SYSTEM_UPDATE ? 0 : undefined);
    connectWebsocket();
  });

  // 需要更新时, 需要更新页面
  ipcRenderer.on("needUpdate", (_, hasUpdate) => {
    if (hasUpdate) {
      ipcRenderer.send("cancelReques");
      thisStatus = STATUS_SYSTEM_UPDATE;
      toggleTitlePercentage(0);
      sendStatus();
    }
  });

  // 视频下载完成或者已经缓存
  ipcRenderer.on("video-finish-download", (_, data) => {
    const { localVideoPath, contextId, video_name, video_url, video_id } = data;
    getVideoDuration(localVideoPath).then((Duration) => {
      dom_video.play();
      thisStatus = STATUS_PLAY;
      toggleTitlePercentage();
      thisSendParams = {
        device_agrs: [
          `${new Date().valueOf()}`,
          video_name,
          video_url,
          Duration,
          video_id,
        ],
      };
      sendStatus(thisSendParams);

      const params = {
        device_id,
        context: contextId,
        command: "PlayerIsReadyReq",
        time_stamp: new Date().valueOf(),
        msg_id: "msg_id-" + Math.random(),
        data: JSON.stringify({ Duration }),
      };
      _send("add-log", {
        describe: "获取视频时长成功, 发送 PlayerIsReadyReq 指令",
        data: JSON.stringify(params),
      });
      ws.send(JSON.stringify(params));
    });
  });

  // 视频下载进度
  ipcRenderer.on("video-download-progress", (_, info) => {
    showPercentage(info);
  });

  // 更新下载进度
  ipcRenderer.on("download-progress", (_, info) => {
    thisStatus = STATUS_SYSTEM_UPDATE;
    toggleTitlePercentage(Math.round(info.percent));
  });

  // 错误提示
  ipcRenderer.on("error-tip", (_, message) => {
    thisStatus = STATUS_READY;
    sendStatus();
    showErrorTip(message);
  });

  // 打印语句在浏览器控制台
  ipcRenderer.on("browser-consolelog", (_, info) => {
    console.error(info._title, info.data && JSON.stringify(info.data, null, 2));
  });

  ipcRenderer.on("window-hide", (_, { hide }) => {
    thisWindowHide = hide;
    sendStatus({ hide });
    ipcRenderer.send("cancelReques");

    if (dom_errorTipWrap.style.display === "flex" && !thisWindowHide) {
      // 显示错误消息
      countdownInterval();
    } else if (thisStatus !== STATUS_SYSTEM_UPDATE) {
      // 不是冰屏更新中, 更新界面
      thisStatus = STATUS_READY;
      toggleTitlePercentage();
    }
  });
}

function updateVolume(volume) {
  thisVolume = (+volume || 0) / 100;
  ipcRenderer.send("update-volume", thisVolume);
  try {
    dom_video.volume = thisVolume;
  } catch (error) {}
}

function connectWebsocket() {
  if (ws) return;

  if (!webSocketUrl) {
    return console.error("webSocketUrl 为空");
  }

  ws = new WebSocket(webSocketUrl);
  ws.onopen = function () {
    const params = {
      device_id,
      command: "setContextId",
      time_stamp: new Date().valueOf(),
      msg_id: "msg_id-" + Math.random(),
      context: "context-" + Math.random(),
    };
    const sendParams = JSON.stringify(params);
    ws.send(sendParams);
    _send("add-log", { describe: "webSocke 链接成功", data: sendParams });
    if (
      thisWindowHide ||
      (thisStatus !== STATUS_PLAY && thisStatus !== STATUS_VIDEO_DOWNLOAD)
    ) {
      sendStatus({
        hide: thisWindowHide,
        volume: thisVolume,
      });
    } else {
      // 上一状态是视频播放中, 或者下载中, 需要传参数
      sendStatus({
        hide: thisWindowHide,
        volume: thisVolume,
        ...thisSendParams,
      });
    }
  };

  ws.onmessage = function (evt) {
    const jsonObject = JSON.parse(evt.data);
    if (jsonObject.data) jsonObject.data = JSON.parse(jsonObject.data);
    const { command, data, context } = jsonObject;

    if (command == "HeartBeat") {
      return console.log("webSocke 收到心跳数据");
    }

    console.log("webSocke 收到数据:", jsonObject);
    const dataObject = data;

    // dataObject.hide = true 隐藏窗口, dataObject.hide = false 显示窗口
    if (command === "ShowModeSwitchResp") {
      const isHide = dataObject.hide;
      _send("add-log", {
        describe: `ShowModeSwitchResp 窗口状态: ${isHide}`,
      });
      ipcRenderer.send(isHide ? "win-minimize" : "win-restore");
    }

    const { video_name, video_url, video_id, video_size, volume } = dataObject;
    // 修改音量
    if (command === "SetVolumeResp") updateVolume(volume);

    // 冰屏更新中, 窗口隐藏, 不处理任何事
    if (thisStatus === STATUS_SYSTEM_UPDATE || thisWindowHide) return;

    // 通知后台下载地址, 检查更新
    if (command === "CheckVersionResp") {
      ipcRenderer.send("CheckVersionResp");
    }

    // 获取下载地址
    if (command === "StartDownloadResp") {
      // 通知后台下载地址, 后台会下载视频
      const isCache = ipcRenderer.sendSync("StartDownloadResp", {
        video_id,
        video_url,
        video_name,
        contextId: context,
        recordId: video_id,
        downloadUrl: video_url,
        sizeMB: (video_size || 0) / 1024 / 1024,
      });

      if (isCache) return; // 视频已经缓存
      thisStatus = STATUS_VIDEO_DOWNLOAD;
      toggleTitlePercentage(0);
      thisSendParams = {
        device_agrs: [
          `${new Date().valueOf()}`,
          video_name,
          video_url,
          video_id,
        ],
      };
      sendStatus(thisSendParams);
    }

    // 停止播放, 先终止下载, 然后播放屏保
    if (command === "StopPlayResp") {
      _send("add-log", { describe: "StopPlayResp 停止播放视频" });
      thisStatus = STATUS_READY;
      sendStatus();
      toggleTitlePercentage();
      ipcRenderer.send("cancelReques");
    }
  };

  ws.onclose = function (evt) {
    console.log("触发了 ws.onclose: ", evt);
    _send("add-log", {
      type: "error",
      describe: "ws.onclose",
      data: new Date().valueOf(),
    });
    ws = null;
  };

  ws.onerror = function (evt) {
    console.log("触发了 ws.onerror: ", evt);
    _send("add-log", {
      type: "error",
      describe: "ws.onerror",
      data: new Date().valueOf(),
    });
    ws = null;
  };
}

setInterval(() => {
  // 关闭后需要重新连接
  if (!ws) {
    return connectWebsocket();
  }

  // 需要心跳检查
  const params = {
    device_id,
    command: "HeartBeat",
    context: "context-" + Math.random(),
    time_stamp: new Date().valueOf(),
    msg_id: "msg_id-" + Math.random(),
    data: JSON.stringify({ version }),
  };
  console.log("webSocke 心跳监测");
  ws.send(JSON.stringify(params));
}, 5000);

toggleTitlePercentage();
handEvent();
