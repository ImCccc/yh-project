/* eslint-disable */
declare namespace SMZX {
  
  type smzxAgvDevice =  {
    /** 充电点 x|y|angle */
    'charge_point': string;
    'device_id': string;
    'device_name': string;
    /** 在线状态 导入不要入参 */
    'is_online': boolean;
    'mac': string;
    'product_id': string;
    'product_name': string;
  }
  
  type smzxAgvDeviceGetReq =  {
    'id': string;
  }
  
  type smzxAgvDeviceGetResp =  {
    'agv_device': smzxAgvDevice;
    'code': number;
    'msg': string;
    'propertys': string;
  }
  
  type smzxAgvDeviceImportReq =  {
    'list': smzxAgvDevice[];
  }
  
  type smzxAgvDeviceImportResp =  {
    'code': number;
    'msg': string;
  }
  
  type smzxAgvDevicePageReq =  {
    'device_name': string;
    /** 第几页，从1开始 */
    'page_index': number;
    /** 每页多少条 */
    'page_size': number;
  }
  
  type smzxAgvDevicePageResp =  {
    'code': number;
    /** 设备列表 */
    'list': smzxAgvDevice[];
    'msg': string;
    /** 列表数量 */
    'total': number;
  }
  
  type smzxAgvDeviceProduct =  {
    'product_id': string;
    'product_name': string;
  }
  
  type smzxAgvDeviceProductListReq = Record<string, any>;
  
  type smzxAgvDeviceProductListResp =  {
    'code': number;
    'list': smzxAgvDeviceProduct[];
    'msg': string;
  }
  
  type smzxAgvDeviceUpdate =  {
    /** 充电点 x|y|angle */
    'charge_point': string;
    'id': string;
    'mac': string;
  }
  
  type smzxAgvDeviceUpdateReq =  {
    'agv_device_update': smzxAgvDeviceUpdate;
  }
  
  type smzxAgvDeviceUpdateResp =  {
    'agv_device': smzxAgvDevice;
    'code': number;
    'msg': string;
  }
  
  type smzxAppUpgrade =  {
    /** app连接 */
    'app_url': string;
    /** 创建毫秒时间戳 */
    'date_created': number;
    /** 更新说明 */
    'desc': string;
    /** 应用版本id */
    'id': string;
    /** 应用版本名称 */
    'name': string;
    /** 产品id */
    'product_id': string;
    /** 应用版本代码 */
    'version': number;
  }
  
  type smzxAppUpgradeAddReq =  {
    'app_upgrade': smzxAppUpgrade;
  }
  
  type smzxAppUpgradeAddResp =  {
    'app_upgrade': smzxAppUpgrade;
    'code': number;
    'msg': string;
  }
  
  type smzxAppUpgradeDelReq =  {
    'id': string;
  }
  
  type smzxAppUpgradeDelResp =  {
    'code': number;
    'id': string;
    'msg': string;
  }
  
  type smzxAppUpgradeGetReq =  {
    'id': string;
  }
  
  type smzxAppUpgradeGetResp =  {
    'app_upgrade': smzxAppUpgrade;
    'code': number;
    'msg': string;
  }
  
  type smzxAppUpgradePadVersionReq =  {
    /** 设备标识 可以传mac */
    'client_id': string;
    /** 当前版本号 */
    'version': number;
  }
  
  type smzxAppUpgradePadVersionResp =  {
    'apk_url': string;
    'code': number;
    'msg': string;
    'need_upgrade': boolean;
    'version': number;
  }
  
  type smzxAppUpgradePageReq =  {
    /** 结束时间 */
    'end_time': number;
    /** 第几页，从1开始 */
    'page_index': number;
    /** 每页多少条 */
    'page_size': number;
    /** 产品id */
    'product_id': string;
    /** 开始时间 */
    'start_time': number;
  }
  
  type smzxAppUpgradePageResp =  {
    'code': number;
    /** 应用版本列表 */
    'list': smzxAppUpgrade[];
    'msg': string;
    /** 列表数量 */
    'total': number;
  }
  
  type smzxAppUpgradeUpdateReq =  {
    'app_upgrade': smzxAppUpgrade;
  }
  
  type smzxAppUpgradeUpdateResp =  {
    'app_upgrade': smzxAppUpgrade;
    'code': number;
    'msg': string;
  }
  
  type smzxBroadcast =  {
    /** 播报代码 */
    'code': string;
    /** 播报内容 */
    'content': string;
    /** 播报id */
    'id': string;
    /** 播报名称 */
    'name': string;
  }
  
  type smzxBroadcastAddReq =  {
    'broadcast': smzxBroadcast;
  }
  
  type smzxBroadcastAddResp =  {
    'broadcast': smzxBroadcast;
    'code': number;
    'msg': string;
  }
  
  type smzxBroadcastDelReq =  {
    'id': string;
  }
  
  type smzxBroadcastDelResp =  {
    'code': number;
    'id': string;
    'msg': string;
  }
  
  type smzxBroadcastGetReq =  {
    'id': string;
  }
  
  type smzxBroadcastGetResp =  {
    'broadcast': smzxBroadcast;
    'code': number;
    'msg': string;
  }
  
  type smzxBroadcastPageReq =  {
    /** 第几页，从1开始 */
    'page_index': number;
    /** 每页多少条 */
    'page_size': number;
  }
  
  type smzxBroadcastPageResp =  {
    'code': number;
    /** 播报列表 */
    'list': smzxBroadcast[];
    'msg': string;
    /** 列表数量 */
    'total': number;
  }
  
  type smzxBroadcastUpdateReq =  {
    'broadcast': smzxBroadcast;
  }
  
  type smzxBroadcastUpdateResp =  {
    'broadcast': smzxBroadcast;
    'code': number;
    'msg': string;
  }
  
  type smzxChargeConfigGetReq = Record<string, any>;
  
  type smzxChargeConfigGetResp =  {
    'code': number;
    'msg': string;
    /** 剩余电量百分比 0-100 去回充 */
    'power': number;
    /** 0 关闭 1 开启 */
    'status': number;
  }
  
  type smzxChargeConfigUpdateReq =  {
    /** 剩余电量百分比 0-100 去回充 */
    'power': number;
    /** 0 关闭 1 开启 */
    'status': number;
  }
  
  type smzxChargeConfigUpdateResp =  {
    'code': number;
    'msg': string;
    /** 剩余电量百分比 0-100 去回充 */
    'power': number;
    /** 0 关闭 1 开启 */
    'status': number;
  }
  
  type smzxChargeDevice =  {
    'device_id': string;
    'device_name': string;
    /** 剩余电量百分比 0-100 */
    'power': number;
    'product_id': string;
    'product_name': string;
    /** 1 充电 2 放电 3 正在去充电 */
    'status': number;
  }
  
  type smzxChargeDeviceListReq = Record<string, any>;
  
  type smzxChargeDeviceListResp =  {
    'code': number;
    'list': smzxChargeDevice[];
    'msg': string;
    'total': number;
  }
  
  type smzxCommonReq =  {
    'from': string;
    'msg_id': string;
    'raw_data': string;
    'thing': string;
    'time_stamp': number;
  }
  
  type smzxCommonResp =  {
    'code': number;
    'msg': string;
    'time_stamp': number;
  }
  
  type smzxDevicePropertyRefreshReq = Record<string, any>;
  
  type smzxDevicePropertyRefreshResp =  {
    'code': number;
    'msg': string;
  }
  
  type smzxErrorLog =  {
    /** 创建毫秒时间戳 */
    'date_created': number;
    /** 异常详情 */
    'detail': string;
    /** 异常类型 */
    'error_type': string;
    /** 异常日志id */
    'id': string;
  }
  
  type smzxErrorLogAddReq =  {
    'error_log': smzxErrorLog;
  }
  
  type smzxErrorLogAddResp =  {
    'code': number;
    'error_log': smzxErrorLog;
    'msg': string;
  }
  
  type smzxErrorLogPageReq =  {
    /** 结束时间 */
    'end_time': number;
    /** 第几页，从1开始 */
    'page_index': number;
    /** 每页多少条 */
    'page_size': number;
    /** 开始时间 */
    'start_time': number;
  }
  
  type smzxErrorLogPageResp =  {
    'code': number;
    /** 异常日志列表 */
    'list': smzxErrorLog[];
    'msg': string;
    /** 列表数量 */
    'total': number;
  }
  
  type smzxMeeting =  {
    /** 区域 1 南门左侧平台 2 南门右侧平台 3 北门平台 */
    'area': number;
    /** 会议室代码 */
    'code': string;
    /** 会议室名称 */
    'name': string;
    'taskRecord': smzxTaskRecord;
    /** 图片地址 */
    'url': string;
  }
  
  type smzxMeetingListReq = Record<string, any>;
  
  type smzxMeetingListResp =  {
    'code': number;
    /** 会议室列表 */
    'list': smzxMeeting[];
    /** 被锁定会议 */
    'lock_code_list': string[];
    'msg': string;
    /** 列表数量 */
    'total': number;
  }
  
  type smzxMeetingStartTaskReq =  {
    /** 会议室代码 */
    'code': string;
    /** 是否拼接 */
    'splice': boolean;
  }
  
  type smzxMeetingStartTaskResp =  {
    'code': number;
    'lock_code_list': string[];
    'meeting': smzxMeeting;
    'msg': string;
  }
  
  type smzxSensorDevice =  {
    /** 区位类型 0无 1 外室 2 中式茶艺厅 3西式茶歇亭-1 */
    'area': number;
    'device_id': string;
    'device_name': string;
    /** 在线状态 导入不要入参 */
    'is_online': boolean;
    'product_id': string;
    'product_name': string;
  }
  
  type smzxSensorDeviceAllPropertyReq = Record<string, any>;
  
  type smzxSensorDeviceAllPropertyResp =  {
    'code': number;
    'list': smzxSensorDeviceProperty[];
    'msg': string;
  }
  
  type smzxSensorDeviceImportReq =  {
    'list': smzxSensorDevice[];
  }
  
  type smzxSensorDeviceImportResp =  {
    'code': number;
    'msg': string;
  }
  
  type smzxSensorDevicePageReq =  {
    'device_name': string;
    /** 第几页，从1开始 */
    'page_index': number;
    /** 每页多少条 */
    'page_size': number;
  }
  
  type smzxSensorDevicePageResp =  {
    'code': number;
    /** 设备列表 */
    'list': smzxSensorDevice[];
    'msg': string;
    /** 列表数量 */
    'total': number;
  }
  
  type smzxSensorDeviceProperty =  {
    'area': number;
    'device_id': string;
    'propertys': string;
  }
  
  type smzxSensorDeviceUpdate =  {
    /** 区位类型 0无 1 外室 2 中式茶艺厅 3西式茶歇亭-1 */
    'area': number;
    'id': string;
  }
  
  type smzxSensorDeviceUpdateReq =  {
    'sensor_device_update': smzxSensorDeviceUpdate;
  }
  
  type smzxSensorDeviceUpdateResp =  {
    'code': number;
    'msg': string;
    'sensor_device': smzxSensorDevice;
  }
  
  type smzxStreamReq =  {
    'command': string;
    'context': string;
    'data': string;
    'device_id': string;
    'msg_id': string;
    'time_stamp': number;
  }
  
  type smzxStreamResp =  {
    'command': string;
    'context': string;
    'data': string;
    'msg_id': string;
    'time_stamp': number;
  }
  
  type smzxTaskItem =  {
    /** 参数 */
    'arg': string[];
    /** 指令 */
    'command': string;
    /** 设备id */
    'device_id': string;
    /** 错误原因 */
    'err': string;
    /** 结束时间 */
    'finish_time': number;
    /** 任务组id */
    'group_id': string;
    /** 任务项id */
    'id': string;
    /** 开始时间 */
    'start_time': number;
    /** 状态 0 已发送 1 执行中 2 失败 3 成功 */
    'status': number;
    /** 任务id */
    'task_id': string;
    /** 是否需要等待结束 */
    'wait_finish': boolean;
  }
  
  type smzxTaskRecord =  {
    /** 任务代码 */
    'code': string;
    'current': number;
    /** 失败原因 */
    'err': string;
    /** 结束时间 */
    'finish_time': number;
    /** 任务id */
    'id': string;
    /** 任务名称 */
    'name': string;
    /** 是否拼接 拼接完成可以解体 解体完成可以拼接 */
    'splice': boolean;
    /** 开始时间 */
    'start_time': number;
    /** 任务项列表 */
    'task_item_list': smzxTaskItem[];
    /** 任务状态 0 待拼接 1 执行中 2 失败 3 成功 */
    'task_status': number;
    'total': number;
  }
  
  type smzxTaskRecordPageReq =  {
    /** 结束时间 */
    'end_time': number;
    /** 第几页，从1开始 */
    'page_index': number;
    /** 每页多少条 */
    'page_size': number;
    /** 开始时间 */
    'start_time': number;
  }
  
  type smzxTaskRecordPageResp =  {
    'code': number;
    /** 任务记录列表 */
    'list': smzxTaskRecord[];
    'msg': string;
    /** 列表数量 */
    'total': number;
  }
  
  type smzxVideo =  {
    /** 视频id */
    'id': string;
    /** 视频名称 */
    'name': string;
    /** 视频url */
    'video_url': string;
  }
  
  type smzxVideoAddReq =  {
    'video': smzxVideo;
  }
  
  type smzxVideoAddResp =  {
    'code': number;
    'msg': string;
    'video': smzxVideo;
  }
  
  type smzxVideoDelListReq =  {
    'ids': string[];
  }
  
  type smzxVideoDelListResp =  {
    'code': number;
    'ids': string[];
    'msg': string;
  }
  
  type smzxVideoDevice =  {
    'device_id': string;
    'device_name': string;
    'product_id': string;
    'product_name': string;
  }
  
  type smzxVideoDeviceListReq = Record<string, any>;
  
  type smzxVideoDeviceListResp =  {
    'code': number;
    /** 设备列表 */
    'list': smzxVideoDevice[];
    'msg': string;
  }
  
  type smzxVideoGetReq =  {
    'id': string;
  }
  
  type smzxVideoGetResp =  {
    'code': number;
    'msg': string;
    'video': smzxVideo;
  }
  
  type smzxVideoPageReq =  {
    /** 第几页，从1开始 */
    'page_index': number;
    /** 每页多少条 */
    'page_size': number;
  }
  
  type smzxVideoPageResp =  {
    'code': number;
    /** 视频列表 */
    'list': smzxVideo[];
    'msg': string;
    /** 列表数量 */
    'total': number;
  }
  
  type smzxVideoPushReq =  {
    'device_ids': string[];
    'video_id': string;
  }
  
  type smzxVideoPushResp =  {
    'code': number;
    'msg': string;
  }
  
  type smzxVideoUpdateReq =  {
    'video': smzxVideo;
  }
  
  type smzxVideoUpdateResp =  {
    'code': number;
    'msg': string;
    'video': smzxVideo;
  }
  
}
