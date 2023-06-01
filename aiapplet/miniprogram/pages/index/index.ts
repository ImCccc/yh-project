import {
  ConfigServiceGet,
  FileServiceUpload,
  ChatServiceInteract,
  ChatServiceSyncResult,
} from "../../services/index";
import { formatTime } from "../../utils/util";

const app = getApp<IAppOption>();

type LinkProps = {
  text: string;
  route?: string; // 跳转路由
  vocalPrintVerification?: boolean; // 是否声纹验证
  [key: string]: any;
};

type ContentProps =
  | {
    text: string;
    color?: string;
    [key: string]: any;
  }
  | string;

type ChatRecordProps = {
  type: 1 | 2 | 3; // 类型: 1:AI一般回复; 2:代表用户; 3:AI表情回复
  content?: string; // AI回复: 内容
  faceUrl?: string; // AI回复: 表情地址
  links?: LinkProps[]; // AI回复: 其他链接
  url?: string; // 用户输入: 有url代表语音记录
  duration?: number; // 用户输入: 语音时长
  text?: string; // 用户输入: 文本
  tip?: ContentProps | string; // 提示
  subContent?: ContentProps[]; // 次要内容
  currentTimeFormat?: string; // 聊天时间
};

export type IList = {
  template_type: "text" | "face"; // face: 表情回复; text:文本回复
  template_data: string; // 答复, 是json对象, 需要转化
  is_real: boolean; // 是否真实答案,游客问了公司问题,返回false
  recommend_answers?: string[]; // 其他问题列表
};

export type IAianswer = {
  interact_id: string; // 如果触发员工验证，验证完成后，需要获取真实答案，需要用到interact_id
  question: string; // 客户提出的问题
  list: IList[];
};

export type IPageIndexData = {
  scrollStyle: string; // 元素的style
  bottomStyle: string; // 元素的style
  scrollY: boolean; // 能否滚动, ios 上用到
  isIos: boolean; // 是否 ios 系统
  pcPlatform: boolean; // 是否pc环境
  chatRecordList: ChatRecordProps[];
  scrollId: string; // 滚动到某一个元素的id
  inputValue: string; // 输入的文本
  isRecord: boolean; // 是否在录音界面
  playRecordUrl: string; // 当前播放语音的地址
  isAgree: boolean; // 是否同意用户协议
  avatar: string; // 用户头像
  showPopup: boolean; // 显示用户身份认证弹框
  isFocus: boolean; // 输入框是否聚焦
  recordingConfig: {
    interval: number; // 每隔多长时间, 聊天记录显示聊天时间, 单位毫秒
    prevRecordTime: number; // 上一次显示时间的时刻, 单位毫秒
  };
};

let innerAudioContext: WechatMiniprogram.InnerAudioContext | null = null;

// 是否第一次进来
let isFirst = true;
// 正在请求的数量
let requestQuantity = 0;

Page<any, any>({
  data: {
    scrollStyle: '',
    bottomStyle: '',
    scrollY: true,
    isIos: false,
    pcPlatform: false,
    chatRecordList: [],
    scrollId: "",
    inputValue: "",
    playRecordUrl: "",
    isRecord: false,
    isAgree: true,
    showPopup: false,
    isFocus: false,
    avatar: "../../svg/icon_deforuser.svg",
    recordingConfig: {
      interval: 1000 * 60 * 5,
      prevRecordTime: 0,
    },
  } as IPageIndexData,

  // 转发给朋友
  onShareAppMessage() {
    return {
      title: '盈宝机器人',
      path: '/pages/index/index',
    }
  },

  // 分享到朋友圈
  onShareTimeline() {
    return {
      title: '盈宝机器人',
      path: '/pages/index/index',
    }
  },

  toggle() {
    const isRecord = this.data.isRecord;
    this.setData({ isFocus: isRecord });
    this.setData({ inputValue: "", isRecord: !isRecord });
  },

  // 大于5分钟, 显示聊天时间
  getRecordTime() {
    const currentTime = new Date().valueOf();
    const recordingConfig = this.data.recordingConfig;
    const { interval, prevRecordTime } = recordingConfig;
    if (currentTime - prevRecordTime > interval) {
      recordingConfig.prevRecordTime = currentTime;
      return formatTime();
    }
    return "";
  },

  addAiRecord(result: IAianswer) {
    const chatRecordList = this.data.chatRecordList;
    const { list, interact_id } = result;
    this._interact_id = "";
    let currentTimeFormat = this.getRecordTime();
    list.forEach(
      ({ template_data, template_type, is_real, recommend_answers }) => {
        const data = JSON.parse(template_data);
        const answer: ChatRecordProps = { type: 1 };
        if (template_type === "text") {
          answer.content = data.text || "";
          if (is_real) {
            // 不需要员工验证
            if (recommend_answers && recommend_answers.length) {
              answer.links = recommend_answers.map((text) => ({ text }));
              if (isFirst) {
                // 首次进入, 需要添加小提示
                answer.tip = "点击即可获得对应问题的答案哟";
                isFirst = false;
              }
            }
          } else {
            this._interact_id = interact_id;
            if (app.globalData.userInfo.step === 2) {
              // 再次登录
              answer.links = [
                { text: app.globalData.pcPlatform ? "手机解锁" : "声音解锁", vocalPrintVerification: true },
              ];
            } else {
              // 首次登录
              answer.links = [
                { text: "员工验证", route: "/pages/register/register" },
              ];
            }
          }
        } else {
          answer.type = 3;
          answer.faceUrl = data.url;
        }
        if (currentTimeFormat) {
          answer.currentTimeFormat = currentTimeFormat;
          currentTimeFormat = "";
        }

        chatRecordList.push(answer);
      }
    );
    this.setData({ chatRecordList });
    this.scrollToBottom(chatRecordList);
  },

  addRecord(item: ChatRecordProps) {
    const chatRecordList = this.data.chatRecordList;
    item.currentTimeFormat = this.getRecordTime();
    chatRecordList.push(item);
    this.setData({ chatRecordList });
    this.scrollToBottom(chatRecordList);
  },

  async requestAi(source: string, source_type: "text" | "voice" = "text") {
    requestQuantity++;
    wx.setNavigationBarTitle({ title: "对方正在输入..." });
    try {
      const { result } = await ChatServiceInteract({ source, source_type });
      this.addAiRecord(result);
    } catch ({ errMsg }) { 
      if (errMsg === 'request:fail timeout') {
        wx.showToast({ title: '请求超时', icon: "none" })
      }
    }
    requestQuantity--;
    if (!requestQuantity) wx.setNavigationBarTitle({ title: "盈宝机器人" });
  },

  sendText(text: string) {
    text = text.trim();
    if (!text) {
      wx.showToast({ title: "不能发送空文本", icon: "none" });
      return;
    }
    this.addRecord({ type: 2, text });
    this.requestAi(text, "text");
    this.setData({ inputValue: "" });
  },

  bindinput(e: WechatMiniprogram.CustomEvent) {
    this.setData({ inputValue: e.detail.value });
  },

  bindconfirm() {
    this.sendText(this.data.inputValue);
  },

  sendClick() {
    this.setData({ isFocus: true });
    this.sendText(this.data.inputValue);
  },

  scrollToBottom(chatRecordList: ChatRecordProps[]) {
    chatRecordList = chatRecordList || this.data.chatRecordList;
    if (chatRecordList.length <= 2) return;
    // ios滚动时有出现页面空白,需要先设置不滚动, 再设置回来
    this.setData({ scrollY: false }); 
    setTimeout(() => {
      this.setData({ scrollY: true });
      this.setData({ scrollId: `list-child` });
    }, 100)
  },

  async recordFinish(e: WechatMiniprogram.CustomEvent) {
    if (e.detail.duration < 1) {
      wx.showToast({ title: "录音时长不能少于 1 秒", icon: "none" });
      return;
    }
    this.addRecord({ type: 2, ...e.detail });
    const { url } = await FileServiceUpload(e.detail.url, {
      bucket: "wechat",
      file_path: "chat",
    });
    this.requestAi(url, "voice");
  },

  // 播放录音
  playRecord(e: WechatMiniprogram.BaseEvent) {
    const item = e.target.dataset.item as ChatRecordProps;
    if (!item.url) return;

    if (innerAudioContext) innerAudioContext.stop();
    innerAudioContext = wx.createInnerAudioContext();
    innerAudioContext.src = item.url;
    innerAudioContext.play();
    innerAudioContext.onEnded(() => this.setData({ playRecordUrl: "" }));
    this.setData({ playRecordUrl: item.url || "" });

    // 防止录音错误， 导致UI显示错误
    if (!item.duration) return;
    const timer = this.data._PlayRecordTimer;
    if (timer) clearTimeout(timer);
    this.data._PlayRecordTimer = setTimeout(
      () => this.setData({ playRecordUrl: "" }),
      item.duration * 1000
    );
  },

  linkClick(e: WechatMiniprogram.CustomEvent) {
    // 声纹验证
    if (e.detail.vocalPrintVerification) {
      return this.setData({ showPopup: true });
    }
    // 员工验证
    if (e.detail.route) {
      app.globalData.registerState = 4;
      return wx.navigateTo({ url: e.detail.route });
    }
    // 提问
    this.sendText(e.detail.text);
  },

  // 同意协议回调, 初始化界面
  agree() {
    this.setData({ isAgree: true });
    wx.setStorageSync("AgreeToUserAgreement", true);
    this.init();
  },

  getTemplateAnswer(key: string) {
    const config = this._templateConfig[key] || {};
    const answers = config.answers || [];
    if (!answers.length) {
      console.error(`找不到 "${key}" 模板:`, config);
      return "";
    }
    return answers[Math.floor(Math.random() * answers.length)];
  },

  async getTemplateConfig() {
    if (this._templateConfig) {
      return this._templateConfig;
    }
    try {
      const data = await ConfigServiceGet();
      const list: any[] = data.tpl_list;
      return list.reduce((data, cur) => {
        const answers = cur.answers || [];
        data[cur.tlp_type.trim()] = { answers, faces: cur.faces };
        return data;
      }, {});
    } catch (error) {
      return {};
    }
  },

  async closePopup(e: WechatMiniprogram.CustomEvent) {
    this.setData({ showPopup: false });
    const data = e.detail;
    if (!data) return;
    const globalData = app.globalData;

    // 验证成功
    globalData.token = data.token;
    globalData.userRole = data.role_codes[0];

    // 更新用户信息
    const userInfo = await app.getUserInfo();
    this.setData({ avatar: userInfo.avatar });
    if (data.type === 1) {
      // 声纹验证
      this.addAiTip("欢迎员工", "欢迎员工-记住声音");
    } else {
      // 手机验证
      this.addAiTip("欢迎员工");
    }
    // 获取正确答案
    this.getAnswers();
  },

  async addAiTip(type: string, type2?: string) {
    const username = app.globalData.userInfo.username;
    let content = this.getTemplateAnswer(type).replace("%s", username);
    let content2 = type2 ? this.getTemplateAnswer(type2).replace("%s", username) : "";
    content = content2 ? `${content}, ${content2}` : content;
    content && this.addRecord({ type: 1, content });
  },

  async getAnswers() {
    // 验证完需要回复正确的答案
    const interact_id = this._interact_id;
    if (!interact_id) return;
    let { result } = await ChatServiceSyncResult({ interact_id });
    this.addAiRecord(result);
  },

  async init() {
    const { avatar, result, errMsg } = await app.initialization();
    if (result) {
      this.addAiRecord(result);
      this.setData({ avatar });
      this._templateConfig = await this.getTemplateConfig();
      return;
    }

    if (errMsg) wx.showModal({
      title: '提示',
      showCancel: false,
      success: this.init,
      confirmText: "刷新重试",
      content: '网络连接不可用，请检查网络',
    })
  },

  keyboardHeightChange() {
    let _timer: number | null = null;
    const _keyboardheightchange = (rs: { height: number }) => {
      const kh = rs.height;
      if (!kh) return this.setData({ bottomStyle: '', scrollStyle: '' });
      if (_timer) return;
      _timer = setTimeout(() => (_timer = null), 400)
      const pixel = kh - 10;
      const scrollStyle = `bottom: calc(${pixel}px + 136rpx); top: initial;`;
      this.setData({ scrollStyle, bottomStyle: `bottom: ${pixel}px;` });
      this.scrollToBottom();
    };
    wx.onKeyboardHeightChange(_keyboardheightchange);
  },

  onLoad() {
    const isAgree = wx.getStorageSync("AgreeToUserAgreement");
    this.setData({ isAgree: !!isAgree });
    if (isAgree) this.init();
    const rs = wx.getSystemInfoSync();
    const platform = rs.platform;
    app.globalData.platform = platform;
    const pcPlatform = app.isPc();
    app.globalData.pcPlatform = pcPlatform;
    const isIos = platform === "ios";
    this.setData({ isIos, pcPlatform });
    this.keyboardHeightChange();
    if (isIos) wx.setInnerAudioOption({ obeyMuteSwitch: false });
  },

  async onShow() {
    const registerState = app.globalData.registerState;
    let tips = {
      0: "",
      1: "欢迎员工-记住声音",
      2: "欢迎员工-下次再录声音",
      3: "欢迎员工",
      4: "员工验证失败",
    }[registerState];
    app.globalData.registerState = 0;
    if (tips) {
      if (registerState === 4) {
        return this.addAiTip(tips);
      }
      const userInfo = await app.getUserInfo();
      this.setData({ avatar: userInfo.avatar });
      this.getAnswers();
      if (registerState === 1) {
        this.addAiTip("欢迎员工", "欢迎员工-记住声音");
      } else {
        this.addAiTip(tips);
      }
    }
  },
});
