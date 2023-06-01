/* eslint-disable */
declare namespace SMZX {
  
  type smzxAgvDevice =  {
    'device_id': string;
    'device_name': string;
    'product_id': string;
    'product_name': string;
    'mac': string;
    /** 在线状态 导入不要入参 */
    'is_online': boolean;
    /** 0 未加锁 1 加锁 */
    'is_lock': number;
    /** 0 不是冰屏 1 是冰屏 */
    'is_ice_screen': number;
    'device_sn': string;
  }
  
  type smzxAgvDeviceBatchLockSwitchReq =  {
    /** 0 未加锁 1 加锁 */
    'is_lock': number;
    'ignore': boolean;
  }
  
  type smzxAgvDeviceBatchLockSwitchResp =  {
    'code': number;
    'msg': string;
    'lock_result_list': smzxDeviceBatchLockResultItem[];
  }
  
  type smzxAgvDeviceDelReq =  {
    'id': string;
  }
  
  type smzxAgvDeviceDelResp =  {
    'code': number;
    'msg': string;
    'id': string;
  }
  
  type smzxAgvDeviceGetReq =  {
    'id': string;
  }
  
  type smzxAgvDeviceGetResp =  {
    'code': number;
    'msg': string;
    'agv_device': smzxAgvDevice;
    'propertys': string;
  }
  
  type smzxAgvDeviceIceScreenListReq = Record<string, any>;
  
  type smzxAgvDeviceIceScreenListResp =  {
    'code': number;
    'msg': string;
    'list': smzxAgvDevice[];
  }
  
  type smzxAgvDeviceImportReq =  {
    'list': smzxAgvDevice[];
  }
  
  type smzxAgvDeviceImportResp =  {
    'code': number;
    'msg': string;
  }
  
  type smzxAgvDeviceListReq = Record<string, any>;
  
  type smzxAgvDeviceListResp =  {
    'code': number;
    'msg': string;
    /** 设备列表 */
    'list': smzxAgvDevice[];
  }
  
  type smzxAgvDeviceLockSwitchReq =  {
    /** 设备id */
    'device_id': string;
    /** 0 未加锁 1 加锁 */
    'is_lock': number;
    'ignore': boolean;
  }
  
  type smzxAgvDeviceLockSwitchResp =  {
    'code': number;
    'msg': string;
    /** 设备id */
    'device_id': string;
    /** 0 未加锁 1 加锁 */
    'is_lock': number;
  }
  
  type smzxAgvDevicePageReq =  {
    /** 第几页，从1开始 */
    'page_index': number;
    /** 每页多少条 */
    'page_size': number;
    'device_name': string;
  }
  
  type smzxAgvDevicePageResp =  {
    'code': number;
    'msg': string;
    /** 列表数量 */
    'total': number;
    /** 设备列表 */
    'list': smzxAgvDevice[];
  }
  
  type smzxAgvDeviceProduct =  {
    'product_id': string;
    'product_name': string;
  }
  
  type smzxAgvDeviceProductListReq = Record<string, any>;
  
  type smzxAgvDeviceProductListResp =  {
    'code': number;
    'msg': string;
    'list': smzxAgvDeviceProduct[];
  }
  
  type smzxAgvDeviceUpdate =  {
    'id': string;
    'mac': string;
    'device_name': string;
    'product_id': string;
    'product_name': string;
    'device_sn': string;
  }
  
  type smzxAgvDeviceUpdateReq =  {
    'agv_device_update': smzxAgvDeviceUpdate;
  }
  
  type smzxAgvDeviceUpdateResp =  {
    'code': number;
    'msg': string;
    'agv_device': smzxAgvDevice;
  }
  
  type smzxAppUpgrade =  {
    /** 应用版本id */
    'id': string;
    /** 应用版本名称 */
    'name': string;
    /** 应用版本代码 */
    'version': number;
    /** 产品id */
    'product_id': string;
    /** app连接 */
    'app_url': string;
    /** 更新说明 */
    'desc': string;
    /** 创建毫秒时间戳 */
    'date_created': number;
  }
  
  type smzxAppUpgradeAddReq =  {
    'app_upgrade': smzxAppUpgrade;
  }
  
  type smzxAppUpgradeAddResp =  {
    'code': number;
    'msg': string;
    'app_upgrade': smzxAppUpgrade;
  }
  
  type smzxAppUpgradeDelReq =  {
    'id': string;
  }
  
  type smzxAppUpgradeDelResp =  {
    'code': number;
    'msg': string;
    'id': string;
  }
  
  type smzxAppUpgradeGetReq =  {
    'id': string;
  }
  
  type smzxAppUpgradeGetResp =  {
    'code': number;
    'msg': string;
    'app_upgrade': smzxAppUpgrade;
  }
  
  type smzxAppUpgradePadVersionReq =  {
    /** 设备标识 可以传mac */
    'client_id': string;
    /** 当前版本号 */
    'version': number;
  }
  
  type smzxAppUpgradePadVersionResp =  {
    'code': number;
    'msg': string;
    'version': number;
    'apk_url': string;
    'need_upgrade': boolean;
    'version_name': string;
    /** 是否强制 */
    'force': boolean;
    /** 发布时间 */
    'publish_time': string;
    /** 内容 |换行 */
    'content': string;
  }
  
  type smzxAppUpgradePageReq =  {
    /** 第几页，从1开始 */
    'page_index': number;
    /** 每页多少条 */
    'page_size': number;
    /** 开始时间 */
    'start_time': number;
    /** 结束时间 */
    'end_time': number;
    /** 产品id */
    'product_id': string;
  }
  
  type smzxAppUpgradePageResp =  {
    'code': number;
    'msg': string;
    /** 列表数量 */
    'total': number;
    /** 应用版本列表 */
    'list': smzxAppUpgrade[];
  }
  
  type smzxAppUpgradeUpdateReq =  {
    'app_upgrade': smzxAppUpgrade;
  }
  
  type smzxAppUpgradeUpdateResp =  {
    'code': number;
    'msg': string;
    'app_upgrade': smzxAppUpgrade;
  }
  
  type smzxBroadcast =  {
    /** 播报id */
    'id': string;
    /** 播报名称 */
    'name': string;
    /** 播报代码 */
    'code': string;
    /** 播报内容 */
    'content': string;
  }
  
  type smzxBroadcastAddReq =  {
    'broadcast': smzxBroadcast;
  }
  
  type smzxBroadcastAddResp =  {
    'code': number;
    'msg': string;
    'broadcast': smzxBroadcast;
  }
  
  type smzxBroadcastDelReq =  {
    'id': string;
  }
  
  type smzxBroadcastDelResp =  {
    'code': number;
    'msg': string;
    'id': string;
  }
  
  type smzxBroadcastGetReq =  {
    'id': string;
  }
  
  type smzxBroadcastGetResp =  {
    'code': number;
    'msg': string;
    'broadcast': smzxBroadcast;
  }
  
  type smzxBroadcastPageReq =  {
    /** 第几页，从1开始 */
    'page_index': number;
    /** 每页多少条 */
    'page_size': number;
  }
  
  type smzxBroadcastPageResp =  {
    'code': number;
    'msg': string;
    /** 列表数量 */
    'total': number;
    /** 播报列表 */
    'list': smzxBroadcast[];
  }
  
  type smzxBroadcastUpdateReq =  {
    'broadcast': smzxBroadcast;
  }
  
  type smzxBroadcastUpdateResp =  {
    'code': number;
    'msg': string;
    'broadcast': smzxBroadcast;
  }
  
  type smzxCommonReq =  {
    'msg_id': string;
    'thing': string;
    'time_stamp': number;
    'raw_data': string;
    'from': string;
  }
  
  type smzxCommonResp =  {
    'code': number;
    'msg': string;
    'time_stamp': number;
  }
  
  type smzxDataAdapterReq = Record<string, any>;
  
  type smzxDataAdapterResp =  {
    'code': number;
    'msg': string;
  }
  
  type smzxDeviceBatchLockResultItem =  {
    'device_id': string;
    /** 当前锁状态 */
    'is_lock': number;
    /** err为空则切换锁失败 */
    'err': string;
  }
  
  type smzxDeviceLockItem =  {
    'device_id': string;
    'is_lock': number;
  }
  
  type smzxDevicePropertyRefreshReq = Record<string, any>;
  
  type smzxDevicePropertyRefreshResp =  {
    'code': number;
    'msg': string;
  }
  
  type smzxErrorLog =  {
    /** 异常日志id */
    'id': string;
    /** 异常类型 */
    'error_type': string;
    /** 异常详情 */
    'detail': string;
    /** 创建毫秒时间戳 */
    'date_created': number;
  }
  
  type smzxErrorLogAddReq =  {
    'error_log': smzxErrorLog;
  }
  
  type smzxErrorLogAddResp =  {
    'code': number;
    'msg': string;
    'error_log': smzxErrorLog;
  }
  
  type smzxErrorLogPageReq =  {
    /** 第几页，从1开始 */
    'page_index': number;
    /** 每页多少条 */
    'page_size': number;
    /** 开始时间 */
    'start_time': number;
    /** 结束时间 */
    'end_time': number;
  }
  
  type smzxErrorLogPageResp =  {
    'code': number;
    'msg': string;
    /** 列表数量 */
    'total': number;
    /** 异常日志列表 */
    'list': smzxErrorLog[];
  }
  
  type smzxIcescreenDeviceCommandReq =  {
    /** 设备id */
    'device_id': string;
    /** 指令类型 
停止播放 StopPlayResp
显示模式切换 ShowModeSwitchResp
设置音量 SetVolumeResp
冰屏通电 IcescreenPowerOnResp
冰屏断电 IcescreenPowerOffResp
工控机通电 IPCPowerOnResp
工控机断电 IPCPowerOffResp */
    'command': string;
    /** 指令蚕食
停止播放 {}
显示模式切换 {"hide":true}
设置音量 {"volume":100}
冰屏通电 {}
冰屏断电 {}
工控机通电 {}
工控机断电 {} */
    'data': string;
  }
  
  type smzxIcescreenDeviceCommandResp =  {
    'code': number;
    'msg': string;
    'device_id': string;
  }
  
  type smzxIcescreenDeviceGetReq =  {
    /** 设备id */
    'device_id': string;
  }
  
  type smzxIcescreenDeviceGetResp =  {
    'code': number;
    'msg': string;
    'item': smzxIcescreenDeviceInfo;
  }
  
  type smzxIcescreenDeviceInfo =  {
    /** 设备id */
    'device_id': string;
    /** 设备名称 */
    'device_name': string;
    /** 冰屏是否在线 */
    'is_online': boolean;
    /** 设备sn */
    'device_sn': string;
    /** 是否冰屏隐藏 即手动模式 */
    'hide': boolean;
    /** 音量 0-100 静音0 打开声音100 */
    'volume': number;
    /** 状态 待机中 更新中 下载视频 播放视频 手动模式 已关机 已离线 */
    'status': string;
    /** 如果是下载跟播放视频 {"id":"1","name":"1"} */
    'status_info': string;
  }
  
  type smzxIcescreenDeviceListReq = Record<string, any>;
  
  type smzxIcescreenDeviceListResp =  {
    'code': number;
    'msg': string;
    'list': smzxIcescreenDeviceInfo[];
  }
  
  type smzxIcescreenDevicePlayReq =  {
    /** 设备id */
    'device_id': string;
    /** 视频id */
    'video_id': string;
  }
  
  type smzxIcescreenDevicePlayResp =  {
    'code': number;
    'msg': string;
    /** 设备id */
    'device_id': string;
    /** 视频id */
    'video_id': string;
  }
  
  type smzxIcescreenVideo =  {
    /** 冰屏视频id */
    'id': string;
    /** 冰屏视频名称 */
    'name': string;
    /** 缩略图地址 */
    'scale_url': string;
    /** 视频地址 */
    'video_url': string;
    /** 冰屏视频宽 */
    'width': number;
    /** 冰屏视频高 */
    'height': number;
  }
  
  type smzxIcescreenVideoAddReq =  {
    'icescreen_video': smzxIcescreenVideo;
  }
  
  type smzxIcescreenVideoAddResp =  {
    'code': number;
    'msg': string;
    'icescreen_video': smzxIcescreenVideo;
  }
  
  type smzxIcescreenVideoDelReq =  {
    'id': string;
  }
  
  type smzxIcescreenVideoDelResp =  {
    'code': number;
    'msg': string;
    'id': string;
  }
  
  type smzxIcescreenVideoGetReq =  {
    'id': string;
  }
  
  type smzxIcescreenVideoGetResp =  {
    'code': number;
    'msg': string;
    'icescreen_video': smzxIcescreenVideo;
  }
  
  type smzxIcescreenVideoListReq = Record<string, any>;
  
  type smzxIcescreenVideoListResp =  {
    'code': number;
    'msg': string;
    'list': smzxIcescreenVideo[];
  }
  
  type smzxIcescreenVideoPageReq =  {
    /** 第几页，从1开始 */
    'page_index': number;
    /** 每页多少条 */
    'page_size': number;
  }
  
  type smzxIcescreenVideoPageResp =  {
    'code': number;
    'msg': string;
    /** 列表数量 */
    'total': number;
    /** 冰屏视频列表 */
    'list': smzxIcescreenVideo[];
  }
  
  type smzxIcescreenVideoUpdateReq =  {
    'icescreen_video': smzxIcescreenVideo;
  }
  
  type smzxIcescreenVideoUpdateResp =  {
    'code': number;
    'msg': string;
    'icescreen_video': smzxIcescreenVideo;
  }
  
  type smzxSensorDevice =  {
    'device_id': string;
    'device_name': string;
    'product_id': string;
    'product_name': string;
    /** 区位类型 0无 1 外室 2 中式茶艺厅 3西式茶歇亭-1 */
    'area': number;
    /** 在线状态 导入不要入参 */
    'is_online': boolean;
  }
  
  type smzxSensorDeviceAllPropertyReq = Record<string, any>;
  
  type smzxSensorDeviceAllPropertyResp =  {
    'code': number;
    'msg': string;
    'list': smzxSensorDeviceProperty[];
  }
  
  type smzxSensorDeviceImportReq =  {
    'list': smzxSensorDevice[];
  }
  
  type smzxSensorDeviceImportResp =  {
    'code': number;
    'msg': string;
  }
  
  type smzxSensorDevicePageReq =  {
    /** 第几页，从1开始 */
    'page_index': number;
    /** 每页多少条 */
    'page_size': number;
    'device_name': string;
  }
  
  type smzxSensorDevicePageResp =  {
    'code': number;
    'msg': string;
    /** 列表数量 */
    'total': number;
    /** 设备列表 */
    'list': smzxSensorDevice[];
  }
  
  type smzxSensorDeviceProperty =  {
    'area': number;
    'device_id': string;
    'propertys': string;
  }
  
  type smzxSensorDeviceUpdate =  {
    'id': string;
    /** 区位类型 0无 1 外室 2 中式茶艺厅 3西式茶歇亭-1 */
    'area': number;
  }
  
  type smzxSensorDeviceUpdateReq =  {
    'sensor_device_update': smzxSensorDeviceUpdate;
  }
  
  type smzxSensorDeviceUpdateResp =  {
    'code': number;
    'msg': string;
    'sensor_device': smzxSensorDevice;
  }
  
  type smzxStreamIceScreenOnlineReq = Record<string, any>;
  
  type smzxStreamIceScreenOnlineResp =  {
    'code': number;
    'msg': string;
    'list': smzxAgvDevice[];
  }
  
  type smzxStreamReq =  {
    'msg_id': string;
    'time_stamp': number;
    'device_id': string;
    'command': string;
    'data': string;
    'context': string;
  }
  
  type smzxStreamResp =  {
    'msg_id': string;
    'time_stamp': number;
    'command': string;
    'data': string;
    'context': string;
  }
  
  type smzxTaskConfig =  {
    /** 更新必传 */
    'code': string;
    'name': string;
    'device_name_list': string[];
    'list': smzxTaskConfigItem[];
    'map_id': string;
    'task_type': number;
  }
  
  type smzxTaskConfigItem =  {
    'param': smzxTaskItemParam;
    /** 行 */
    'row': number;
    /** 列 */
    'col': number;
    /** 是否等待 */
    'is_wait': boolean;
  }
  
  type smzxTaskCopyReq =  {
    /** 任务代码 */
    'source_code': string;
    /** 名称 */
    'name': string;
  }
  
  type smzxTaskCopyResp =  {
    'code': number;
    'msg': string;
  }
  
  type smzxTaskCreateReq =  {
    /** 任务名称 */
    'name': string;
    /** 地图id */
    'map_id': string;
    /** 任务模板 */
    'task_url': string;
    /** 任务代码 */
    'code': string;
    /** 任务类型 0 普通任务 1 拼接任务  2 拆解任务 3 返回任务 */
    'task_type': number;
  }
  
  type smzxTaskCreateResp =  {
    'code': number;
    'msg': string;
  }
  
  type smzxTaskCreateWithConfigReq =  {
    'config': smzxTaskConfig;
  }
  
  type smzxTaskCreateWithConfigResp =  {
    'code': number;
    'msg': string;
    'config': smzxTaskConfig;
  }
  
  type smzxTaskDeleteReq =  {
    'code': string;
  }
  
  type smzxTaskDeleteResp =  {
    'code': number;
    'msg': string;
  }
  
  type smzxTaskDetail =  {
    /** 任务名称 */
    'name': string;
    /** 任务代码 */
    'code': string;
    /** 区域 1 南门左侧平台 2 南门右侧平台 3 北门平台 */
    'area': number;
    /** 地图id */
    'map_id': string;
    /** 图片地址 */
    'url': string;
    /** 任务模板 */
    'task_url': string;
    /** 隐藏状态 0 显示 1 隐藏 */
    'hide': number;
    /** 标签 */
    'tab': string;
    /** 创建时间 */
    'date_created': number;
    /** 任务类型 0 普通任务 1 拼接任务  2 拆解任务 3 返回任务 */
    'task_type': number;
  }
  
  type smzxTaskDeviceInfo =  {
    /** 设备Id */
    'device_id': string;
    /** 设备名称 */
    'device_name': string;
    /** 设备SN */
    'device_sn': string;
    /** 产品类型 */
    'product_id': string;
    /** 产品名称 */
    'product_name': string;
  }
  
  type smzxTaskGetConfigReq =  {
    'code': string;
  }
  
  type smzxTaskGetConfigResp =  {
    'code': number;
    'msg': string;
    'config': smzxTaskConfig;
  }
  
  type smzxTaskGetReq =  {
    /** 任务代码 */
    'task_code': string;
  }
  
  type smzxTaskGetResp =  {
    'code': number;
    'msg': string;
    /** 任务名称 */
    'name': string;
    /** 任务代码 */
    'task_code': string;
    /** 任务模板 */
    'task_url': string;
    /** 地图 */
    'map_id': string;
    /** 创建时间 */
    'date_created': number;
    /** 任务类型 0 普通任务 1 拼接任务  2 拆解任务 3 返回任务 */
    'task_type': number;
    /** 设备列表 */
    'device_list': smzxTaskDeviceInfo[];
  }
  
  type smzxTaskHideStatusReq =  {
    'code': string;
    /** 0 显示 1 隐藏 */
    'hide': number;
  }
  
  type smzxTaskHideStatusResp =  {
    'code': number;
    'msg': string;
  }
  
  type smzxTaskItem =  {
    /** 任务项id */
    'id': string;
    /** 任务组id */
    'group_id': string;
    /** 设备id */
    'device_id': string;
    /** 参数 */
    'params': smzxTaskItemParam[];
    /** 状态 0 已发送 1 执行中 2 失败 3 成功 */
    'status': number;
    /** 错误原因 */
    'err': string;
    /** 开始时间 */
    'start_time': number;
    /** 结束时间 */
    'finish_time': number;
    /** 是否需要等待结束 */
    'wait_finish': boolean;
    /** 任务id */
    'task_id': string;
    'row': number;
    'col': number;
    'text': string;
  }
  
  type smzxTaskItemParam =  {
    /** 指令 */
    'command': string;
    /** 参数 */
    'args': string[];
  }
  
  type smzxTaskLabel =  {
    'name': string;
    'code': string;
  }
  
  type smzxTaskListV2Req =  {
    /** 第几页，从1开始 */
    'page_index': number;
    /** 每页多少条 */
    'page_size': number;
    /** 便签名称 */
    'tab': string;
    /** 是否显示所有 0 不显示 1 显示所有 */
    'show_all': number;
    /** 设备id列表 */
    'device_ids': string[];
  }
  
  type smzxTaskListV2Resp =  {
    'code': number;
    'msg': string;
    /** 列表数量 */
    'total': number;
    /** 任务列表 */
    'list': smzxTaskV2[];
  }
  
  type smzxTaskLoadLabelReq = Record<string, any>;
  
  type smzxTaskLoadLabelResp =  {
    'code': number;
    'msg': string;
    /** 任务标签 */
    'tab_list': smzxTaskLabel[];
  }
  
  type smzxTaskMigrateReq =  {
    'code': string;
  }
  
  type smzxTaskMigrateResp =  {
    'code': number;
    'msg': string;
  }
  
  type smzxTaskNameAndCodeListReq = Record<string, any>;
  
  type smzxTaskNameAndCodeListResp =  {
    'code': number;
    'msg': string;
    /** 任务名称代码列表 */
    'list': smzxTaskLabel[];
  }
  
  type smzxTaskPageReq =  {
    /** 任务名称 */
    'name': string;
    /** 代码 */
    'code': string;
    /** 分页 */
    'page_index': number;
    'page_size': number;
  }
  
  type smzxTaskPageResp =  {
    'code': number;
    'msg': string;
    /** 列表数量 */
    'total': number;
    /** 任务列表 */
    'list': smzxTaskDetail[];
  }
  
  type smzxTaskPauseSwitchReq =  {
    /** 任务代码 */
    'code': string;
    /** 开始时间 */
    'start_time': number;
    /** 是否暂停 false为恢复 */
    'is_pause': boolean;
    /** 是否一键启动 */
    'fast_return': boolean;
  }
  
  type smzxTaskPauseSwitchResp =  {
    'code': number;
    'msg': string;
    'task_code': string;
    'is_pause': boolean;
  }
  
  type smzxTaskRecord =  {
    /** 任务id */
    'id': string;
    /** 任务名称 */
    'name': string;
    /** 任务代码 */
    'code': string;
    /** 是否拼接 拼接完成可以解体 解体完成可以拼接 */
    'splice': boolean;
    /** 总任务项数 */
    'total': number;
    /** 当前执行任务项 */
    'current': number;
    /** 任务状态 0 待拼接 1 执行中 2 失败 3 成功 */
    'task_status': number;
    /** 失败原因 */
    'err': string;
    /** 开始时间 */
    'start_time': number;
    /** 结束时间 */
    'finish_time': number;
    /** 任务项列表 */
    'task_item_list': smzxTaskItem[];
    /** 最大任务组 */
    'group_total': number;
    /** 当前任务组 */
    'group_current': number;
    /** 是否暂停 */
    'is_pause': boolean;
    /** 是否仿真 */
    'is_simulate': boolean;
    /** 是否一键返回 */
    'fast_return': boolean;
    /** 任务序号 */
    'serial_number': number;
  }
  
  type smzxTaskRecordDetailV2Req =  {
    'code': string;
    'id': string;
    'fast_return': boolean;
  }
  
  type smzxTaskRecordDetailV2Resp =  {
    'code': number;
    'msg': string;
    'device_name_list': string[];
    'item': smzxTaskRecord;
    /** 任务其他信息 */
    'simulate_pass': boolean;
  }
  
  type smzxTaskRecordExportReq =  {
    'running_id': string;
  }
  
  type smzxTaskRecordExportResp =  {
    'code': number;
    'msg': string;
    'file_url': string;
  }
  
  type smzxTaskRecordGetReq =  {
    /** 任务执行id：任务每次执行都会生成一个唯一的id */
    'running_id': string;
  }
  
  type smzxTaskRecordGetResp =  {
    'code': number;
    'msg': string;
    /** 任务执行id：任务每次执行都会生成一个唯一的id */
    'running_id': string;
    /** 任务名称 */
    'name': string;
    /** 任务代码 */
    'task_code': string;
    /** 任务状态 0 待拼接 1 执行中 2 失败 3 成功 */
    'task_status': number;
    /** 失败原因 */
    'err': string;
    /** 开始时间 */
    'start_time': number;
    /** 结束时间 */
    'finish_time': number;
    /** 是否一键返回 */
    'fast_return': boolean;
    /** 是否仿真 */
    'is_simulate': boolean;
    /** 设备列表 */
    'device_list': smzxTaskDeviceInfo[];
    /** 地图id */
    'map_id': string;
  }
  
  type smzxTaskRecordInnerPageItem =  {
    /** 任务执行id：任务每次执行都会生成一个唯一的id */
    'running_id': string;
    /** 任务名称 */
    'name': string;
    /** 任务代码 */
    'task_code': string;
    /** 任务状态 0 待拼接 1 执行中 2 失败 3 成功 */
    'task_status': number;
    /** 失败原因 */
    'err': string;
    /** 开始时间 */
    'start_time': number;
    /** 结束时间 */
    'finish_time': number;
    /** 是否一键返回 */
    'fast_return': boolean;
    /** 是否仿真 */
    'is_simulate': boolean;
    /** 地图id */
    'map_id': string;
  }
  
  type smzxTaskRecordInnerPageReq =  {
    /** 可为空 */
    'task_code': string;
    /** 分页 */
    'page_index': number;
    'page_size': number;
  }
  
  type smzxTaskRecordInnerPageResp =  {
    'code': number;
    'msg': string;
    /** 列表数量 */
    'total': number;
    /** 任务记录列表 */
    'list': smzxTaskRecordInnerPageItem[];
  }
  
  type smzxTaskRecordListByCodeReq =  {
    'code': string;
  }
  
  type smzxTaskRecordListByCodeResp =  {
    'code': number;
    'msg': string;
    /** 任务记录列表 */
    'list': smzxTaskRecord[];
  }
  
  type smzxTaskRecordPageItem =  {
    /** 任务id */
    'id': string;
    /** 任务名称 */
    'name': string;
    /** 任务代码 */
    'code': string;
    /** 任务状态 0 待拼接 1 执行中 2 失败 3 成功 */
    'task_status': number;
    /** 失败原因 */
    'err': string;
    /** 开始时间 */
    'start_time': number;
    /** 结束时间 */
    'finish_time': number;
    /** 是否仿真 */
    'is_simulate': boolean;
    /** 任务序号 */
    'serial_number': number;
    /** 任务类型 0 普通任务 1 拼接任务  2 拆解任务 3 返回任务 */
    'task_type': number;
  }
  
  type smzxTaskRecordPageReq =  {
    /** 第几页，从1开始 */
    'page_index': number;
    /** 每页多少条 */
    'page_size': number;
    /** 开始时间 */
    'start_time': number;
    /** 结束时间 */
    'end_time': number;
    /** 任务代码 */
    'code': string;
    /** 任务名称 */
    'name': string;
    /** 是否仿真 0 所有 1 仿真 2 非仿真 */
    'simulate': number;
  }
  
  type smzxTaskRecordPageResp =  {
    'code': number;
    'msg': string;
    /** 列表数量 */
    'total': number;
    /** 任务记录列表 */
    'list': smzxTaskRecordPageItem[];
  }
  
  type smzxTaskRecordSyncRunningReq =  {
    'code': string;
    'fast_return': boolean;
  }
  
  type smzxTaskRecordSyncRunningResp =  {
    'code': number;
    'msg': string;
    'item': smzxTaskRecord;
    'remove_name_list': string[];
    'device_name_list': string[];
  }
  
  type smzxTaskRemoveDeviceReq =  {
    'code': string;
    'deviceName': string;
    /** 是否一键启动 */
    'fast_return': boolean;
  }
  
  type smzxTaskRemoveDeviceResp =  {
    'code': number;
    'msg': string;
  }
  
  type smzxTaskSetTwoTaskCodeReq =  {
    /** 拼接任务 */
    'splice_task_code': string;
    /** 解体任务 */
    'disassemble_task_code': string;
  }
  
  type smzxTaskSetTwoTaskCodeResp =  {
    'code': number;
    'msg': string;
    /** 拼接任务 */
    'splice_task_code': string;
    /** 解体任务 */
    'disassemble_task_code': string;
    /** 拼接任务名称 */
    'splice_task_name': string;
    /** 解体任务名称 */
    'disassemble_task_name': string;
  }
  
  type smzxTaskSimulatePassStatusReq =  {
    /** 修改任务代码 */
    'task_code_list': string[];
    /** 是否所有 */
    'is_all': boolean;
    /** 是否仿真通过 */
    'simulate_pass': boolean;
  }
  
  type smzxTaskSimulatePassStatusResp =  {
    'code': number;
    'msg': string;
    /** 修改任务代码 */
    'task_code_list': string[];
    /** 是否所有 */
    'is_all': boolean;
    /** 是否仿真通过 */
    'simulate_pass': boolean;
  }
  
  type smzxTaskStartReq =  {
    /** 任务代码 */
    'code': string;
    /** 是否拼接 */
    'splice': boolean;
    /** 开始时间 */
    'start_time': number;
    /** 循环次数 */
    'loop_count': number;
    /** 1 加锁 0 不加锁 */
    'is_lock': number;
    /** 是否一键启动 */
    'fast_return': boolean;
    /** 是否失败自动暂停 */
    'fail_auto_pause': boolean;
    /** 是否仿真任务 */
    'simulate': boolean;
  }
  
  type smzxTaskStartResp =  {
    'code': number;
    'msg': string;
    'task': smzxTaskV2;
  }
  
  type smzxTaskStatusItem =  {
    /** 任务代码 */
    'code': string;
    /** 任务名称 */
    'name': string;
    /** 任务编号 */
    'serial_number': number;
    /** 开始时间 */
    'start_time': number;
    /** 结束时间 */
    'finish_time': number;
    /** 任务状态 0 未开始 1 执行中 2 失败 3 成功 */
    'task_status': number;
    /** 失败原因 */
    'err': string;
    /** 仿真验证是否通过 */
    'simulate_pass': boolean;
    /** 是否是仿真任务 */
    'is_simulate': boolean;
  }
  
  type smzxTaskStopReq =  {
    /** 任务代码 */
    'code': string;
    /** 开始时间 */
    'start_time': number;
    /** 是否一键启动 */
    'fast_return': boolean;
  }
  
  type smzxTaskStopResp =  {
    'code': number;
    'msg': string;
    'task': smzxTaskV2;
  }
  
  type smzxTaskSyncListStatusReq = Record<string, any>;
  
  type smzxTaskSyncListStatusResp =  {
    'code': number;
    'msg': string;
    'task_status_list': smzxTaskStatusItem[];
    'device_lock_list': smzxDeviceLockItem[];
  }
  
  type smzxTaskTopStatusReq =  {
    'task_code': string;
    /** 是否置顶状态 */
    'top': boolean;
  }
  
  type smzxTaskTopStatusResp =  {
    'code': number;
    'msg': string;
    'task_code': string;
    'top': boolean;
  }
  
  type smzxTaskTwoReq = Record<string, any>;
  
  type smzxTaskTwoResp =  {
    'code': number;
    'msg': string;
    'splice': smzxTaskV2;
    'disassemble': smzxTaskV2;
  }
  
  type smzxTaskUpdateReq =  {
    /** 任务名称 */
    'name': string;
    /** 任务代码 */
    'code': string;
    /** 地图id */
    'map_id': string;
    /** 任务模板 */
    'task_url': string;
    /** 任务类型 0 普通任务 1 拼接任务  2 拆解任务 3 返回任务 */
    'task_type': number;
  }
  
  type smzxTaskUpdateResp =  {
    'code': number;
    'msg': string;
  }
  
  type smzxTaskUpdateWithConfigReq =  {
    'config': smzxTaskConfig;
  }
  
  type smzxTaskUpdateWithConfigResp =  {
    'code': number;
    'msg': string;
    'config': smzxTaskConfig;
  }
  
  type smzxTaskV2 =  {
    /** 任务名称 */
    'name': string;
    /** 任务代码 */
    'code': string;
    /** 区域 1 南门左侧平台 2 南门右侧平台 3 北门平台 */
    'area': number;
    /** 图片地址 */
    'url': string;
    /** 标签 */
    'tab': string;
    /** 地图 */
    'map_id': string;
    /** 隐藏状态 0 显示 1 隐藏 */
    'hide': number;
    /** 是否置顶状态 */
    'top': boolean;
    /** 仿真验证是否通过 */
    'simulate_pass': boolean;
    /** 创建时间 */
    'date_created': number;
    /** 是否只有拼接 1是 0否 */
    'only_splice': number;
    /** 开始时间 */
    'start_time': number;
    /** 任务状态 0 未开始 1 执行中 2 失败 3 成功 */
    'task_status': number;
    /** 失败原因 */
    'err': string;
    /** 否是仿真任务 */
    'is_simulate': boolean;
    /** 任务类型 0 普通任务 1 拼接任务  2 拆解任务 3 返回任务 */
    'task_type': number;
    /** 任务序号 */
    'serial_number': number;
  }
  
  type smzxUploadLogDownloadReq =  {
    'start_date': string;
    'end_date': string;
  }
  
  type smzxUploadLogDownloadResp =  {
    'code': number;
    'msg': string;
    'zip_url': string;
  }
  
  type smzxUploadLogUploadReq = Record<string, any>;
  
  type smzxUploadLogUploadResp =  {
    'code': number;
    'msg': string;
  }
  
}
