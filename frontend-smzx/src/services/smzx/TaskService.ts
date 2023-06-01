/* eslint-disable */
import request from '@/utils/request';

export enum ApiUrl {
  TaskServiceCopy = '/rpc/smzx.smzx/TaskService.Copy',
  TaskServiceCreate = '/rpc/smzx.smzx/TaskService.Create',
  TaskServiceCreateWithConfig = '/rpc/smzx.smzx/TaskService.CreateWithConfig',
  TaskServiceDelete = '/rpc/smzx.smzx/TaskService.Delete',
  TaskServiceGet = '/rpc/smzx.smzx/TaskService.Get',
  TaskServiceGetConfig = '/rpc/smzx.smzx/TaskService.GetConfig',
  TaskServiceHideStatus = '/rpc/smzx.smzx/TaskService.HideStatus',
  TaskServiceListV2 = '/rpc/smzx.smzx/TaskService.ListV2',
  TaskServiceLoadLabel = '/rpc/smzx.smzx/TaskService.LoadLabel',
  TaskServiceMigrate = '/rpc/smzx.smzx/TaskService.Migrate',
  TaskServiceNameAndCodeList = '/rpc/smzx.smzx/TaskService.NameAndCodeList',
  TaskServicePage = '/rpc/smzx.smzx/TaskService.Page',
  TaskServicePauseSwitch = '/rpc/smzx.smzx/TaskService.PauseSwitch',
  TaskServiceRemoveDevice = '/rpc/smzx.smzx/TaskService.RemoveDevice',
  TaskServiceSetTwoTaskCode = '/rpc/smzx.smzx/TaskService.SetTwoTaskCode',
  TaskServiceSimulatePassStatus = '/rpc/smzx.smzx/TaskService.SimulatePassStatus',
  TaskServiceStart = '/rpc/smzx.smzx/TaskService.Start',
  TaskServiceStop = '/rpc/smzx.smzx/TaskService.Stop',
  TaskServiceSyncListStatus = '/rpc/smzx.smzx/TaskService.SyncListStatus',
  TaskServiceTopStatus = '/rpc/smzx.smzx/TaskService.TopStatus',
  TaskServiceTwo = '/rpc/smzx.smzx/TaskService.Two',
  TaskServiceUpdate = '/rpc/smzx.smzx/TaskService.Update',
  TaskServiceUpdateWithConfig = '/rpc/smzx.smzx/TaskService.UpdateWithConfig'
}

/** Android 拷贝任务 POST /rpc/smzx.smzx/TaskService.Copy */
export async function TaskServiceCopy(
  body: SMZX.smzxTaskCopyReq,
  options ?: {[key: string]: any}
) {
  return request<SMZX.smzxTaskCopyResp>('/rpc/smzx.smzx/TaskService.Copy', {
  method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** Web创建任务 POST /rpc/smzx.smzx/TaskService.Create */
export async function TaskServiceCreate(
  body: SMZX.smzxTaskCreateReq,
  options ?: {[key: string]: any}
) {
  return request<SMZX.smzxTaskCreateResp>('/rpc/smzx.smzx/TaskService.Create', {
  method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** Android配置创建任务 POST /rpc/smzx.smzx/TaskService.CreateWithConfig */
export async function TaskServiceCreateWithConfig(
  body: SMZX.smzxTaskCreateWithConfigReq,
  options ?: {[key: string]: any}
) {
  return request<SMZX.smzxTaskCreateWithConfigResp>('/rpc/smzx.smzx/TaskService.CreateWithConfig', {
  method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** Android/Web删除任务 POST /rpc/smzx.smzx/TaskService.Delete */
export async function TaskServiceDelete(
  body: SMZX.smzxTaskDeleteReq,
  options ?: {[key: string]: any}
) {
  return request<SMZX.smzxTaskDeleteResp>('/rpc/smzx.smzx/TaskService.Delete', {
  method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** rms获取任务详情 POST /rpc/smzx.smzx/TaskService.Get */
export async function TaskServiceGet(
  body: SMZX.smzxTaskGetReq,
  options ?: {[key: string]: any}
) {
  return request<SMZX.smzxTaskGetResp>('/rpc/smzx.smzx/TaskService.Get', {
  method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** Android获取任务配置 POST /rpc/smzx.smzx/TaskService.GetConfig */
export async function TaskServiceGetConfig(
  body: SMZX.smzxTaskGetConfigReq,
  options ?: {[key: string]: any}
) {
  return request<SMZX.smzxTaskGetConfigResp>('/rpc/smzx.smzx/TaskService.GetConfig', {
  method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** Android/Web设置隐藏状态 POST /rpc/smzx.smzx/TaskService.HideStatus */
export async function TaskServiceHideStatus(
  body: SMZX.smzxTaskHideStatusReq,
  options ?: {[key: string]: any}
) {
  return request<SMZX.smzxTaskHideStatusResp>('/rpc/smzx.smzx/TaskService.HideStatus', {
  method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** Android 所有任务列表版本2 POST /rpc/smzx.smzx/TaskService.ListV2 */
export async function TaskServiceListV2(
  body: SMZX.smzxTaskListV2Req,
  options ?: {[key: string]: any}
) {
  return request<SMZX.smzxTaskListV2Resp>('/rpc/smzx.smzx/TaskService.ListV2', {
  method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** Android/Web加载标签 POST /rpc/smzx.smzx/TaskService.LoadLabel */
export async function TaskServiceLoadLabel(
  body: SMZX.smzxTaskLoadLabelReq,
  options ?: {[key: string]: any}
) {
  return request<SMZX.smzxTaskLoadLabelResp>('/rpc/smzx.smzx/TaskService.LoadLabel', {
  method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 迁移任务 POST /rpc/smzx.smzx/TaskService.Migrate */
export async function TaskServiceMigrate(
  body: SMZX.smzxTaskMigrateReq,
  options ?: {[key: string]: any}
) {
  return request<SMZX.smzxTaskMigrateResp>('/rpc/smzx.smzx/TaskService.Migrate', {
  method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 获取任务名称跟标识 POST /rpc/smzx.smzx/TaskService.NameAndCodeList */
export async function TaskServiceNameAndCodeList(
  body: SMZX.smzxTaskNameAndCodeListReq,
  options ?: {[key: string]: any}
) {
  return request<SMZX.smzxTaskNameAndCodeListResp>('/rpc/smzx.smzx/TaskService.NameAndCodeList', {
  method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** Web分页查询 POST /rpc/smzx.smzx/TaskService.Page */
export async function TaskServicePage(
  body: SMZX.smzxTaskPageReq,
  options ?: {[key: string]: any}
) {
  return request<SMZX.smzxTaskPageResp>('/rpc/smzx.smzx/TaskService.Page', {
  method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** Android暂停状态切换 POST /rpc/smzx.smzx/TaskService.PauseSwitch */
export async function TaskServicePauseSwitch(
  body: SMZX.smzxTaskPauseSwitchReq,
  options ?: {[key: string]: any}
) {
  return request<SMZX.smzxTaskPauseSwitchResp>('/rpc/smzx.smzx/TaskService.PauseSwitch', {
  method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 剔除设备 POST /rpc/smzx.smzx/TaskService.RemoveDevice */
export async function TaskServiceRemoveDevice(
  body: SMZX.smzxTaskRemoveDeviceReq,
  options ?: {[key: string]: any}
) {
  return request<SMZX.smzxTaskRemoveDeviceResp>('/rpc/smzx.smzx/TaskService.RemoveDevice', {
  method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 设置拼接跟解体任务代码 POST /rpc/smzx.smzx/TaskService.SetTwoTaskCode */
export async function TaskServiceSetTwoTaskCode(
  body: SMZX.smzxTaskSetTwoTaskCodeReq,
  options ?: {[key: string]: any}
) {
  return request<SMZX.smzxTaskSetTwoTaskCodeResp>('/rpc/smzx.smzx/TaskService.SetTwoTaskCode', {
  method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** Android仿真通过状态 POST /rpc/smzx.smzx/TaskService.SimulatePassStatus */
export async function TaskServiceSimulatePassStatus(
  body: SMZX.smzxTaskSimulatePassStatusReq,
  options ?: {[key: string]: any}
) {
  return request<SMZX.smzxTaskSimulatePassStatusResp>('/rpc/smzx.smzx/TaskService.SimulatePassStatus', {
  method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** Android开始任务 POST /rpc/smzx.smzx/TaskService.Start */
export async function TaskServiceStart(
  body: SMZX.smzxTaskStartReq,
  options ?: {[key: string]: any}
) {
  return request<SMZX.smzxTaskStartResp>('/rpc/smzx.smzx/TaskService.Start', {
  method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** Android停止任务 POST /rpc/smzx.smzx/TaskService.Stop */
export async function TaskServiceStop(
  body: SMZX.smzxTaskStopReq,
  options ?: {[key: string]: any}
) {
  return request<SMZX.smzxTaskStopResp>('/rpc/smzx.smzx/TaskService.Stop', {
  method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** Android 同步列表状态 POST /rpc/smzx.smzx/TaskService.SyncListStatus */
export async function TaskServiceSyncListStatus(
  body: SMZX.smzxTaskSyncListStatusReq,
  options ?: {[key: string]: any}
) {
  return request<SMZX.smzxTaskSyncListStatusResp>('/rpc/smzx.smzx/TaskService.SyncListStatus', {
  method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** Android设置置顶状态 POST /rpc/smzx.smzx/TaskService.TopStatus */
export async function TaskServiceTopStatus(
  body: SMZX.smzxTaskTopStatusReq,
  options ?: {[key: string]: any}
) {
  return request<SMZX.smzxTaskTopStatusResp>('/rpc/smzx.smzx/TaskService.TopStatus', {
  method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 演示的拼接跟解体任务 POST /rpc/smzx.smzx/TaskService.Two */
export async function TaskServiceTwo(
  body: SMZX.smzxTaskTwoReq,
  options ?: {[key: string]: any}
) {
  return request<SMZX.smzxTaskTwoResp>('/rpc/smzx.smzx/TaskService.Two', {
  method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** Web更新 POST /rpc/smzx.smzx/TaskService.Update */
export async function TaskServiceUpdate(
  body: SMZX.smzxTaskUpdateReq,
  options ?: {[key: string]: any}
) {
  return request<SMZX.smzxTaskUpdateResp>('/rpc/smzx.smzx/TaskService.Update', {
  method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** Android配置更新任务 POST /rpc/smzx.smzx/TaskService.UpdateWithConfig */
export async function TaskServiceUpdateWithConfig(
  body: SMZX.smzxTaskUpdateWithConfigReq,
  options ?: {[key: string]: any}
) {
  return request<SMZX.smzxTaskUpdateWithConfigResp>('/rpc/smzx.smzx/TaskService.UpdateWithConfig', {
  method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

