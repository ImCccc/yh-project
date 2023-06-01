// https://github.com/megahertz/electron-log/
const fs = require("fs");
const join = require("path").join;
const logger = require("electron-log");
const { LOG_PATH } = require("./constant.js");

function formatNumber(n) {
  const s = n.toString();
  return s[1] ? s : "0" + s;
}

function _getName() {
  const date = new Date();
  return `${date.getFullYear()}-${formatNumber(
    date.getMonth() + 1
  )}-${formatNumber(date.getDate())}.log`;
}

logger.transports.file.level = "debug";
// 最大10M
logger.transports.file.maxSize = 10 * 1024 * 1024;
// 设置文件内容格式
logger.transports.file.format = "{h}:{i}:{s} [{level}]:{text}";
// 指定日志文件夹位置
logger.transports.file.resolvePath = () => join(LOG_PATH, _getName());

function deleteLog(n = 10) {
  const currDate = new Date();
  const date = new Date(currDate.getTime() - n * 24 * 60 * 60 * 1000);
  const year = date.getFullYear() + "";
  const month = formatNumber(date.getMonth() + 1);
  const day = formatNumber(date.getDate());
  const beforeDate = +(year + month + day); // 10 天前
  fs.readdir(LOG_PATH, (_, files) => {
    files.forEach((filename) => {
      if (!filename.includes(".log")) return;
      const arr = filename.replace(".log", "").split("-");
      if (arr.length !== 3) return;
      const thisDate = +(arr[0] + formatNumber(arr[1]) + formatNumber(arr[2]));
      if (thisDate > beforeDate) return;
      const deletePath = join(LOG_PATH, filename);
      if (fs.existsSync(deletePath)) fs.unlinkSync(deletePath);
    });
  });
}

module.exports = { deleteLog, logger };
