// http://www.manongjc.com/detail/29-hhqcmubuogtovmn.html
const execShell = require("child_process").exec;
const { logger } = require("./log.js");
const isLinux = process.platform === "linux";
const shutdownShell = isLinux ? "shutdown now" : "shutdown -s -t 00";
const rebootShell = isLinux ? "shutdown -r now" : "shutdown -r -t 0";

const _execShell = (shell) => {
  let command = execShell(shell, function (err, stdout, stderr) {
    if (err || stderr) logger.info(`exec shell error: ${err} ${stderr}`);
  });
  command.stdin.end();
  command.on("close", function () {});
};

//关机
exports.shutdownOs = () => _execShell(shutdownShell);

//重启
exports.rebootOs = () => _execShell(rebootShell);
