/* eslint-disable */
import request from '@/utils/request';

export enum ApiUrl {
  MeetingServiceList = '/rpc/smzx.service-robotics/MeetingService.List',
  MeetingServiceStartTask = '/rpc/smzx.service-robotics/MeetingService.StartTask'
}

/** 会议室列表 POST /rpc/smzx.service-robotics/MeetingService.List */
export async function MeetingServiceList(
  body: SMZX.smzxMeetingListReq,
  options ?: {[key: string]: any}
) {
  return request<SMZX.smzxMeetingListResp>('/rpc/smzx.service-robotics/MeetingService.List', {
  method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 POST /rpc/smzx.service-robotics/MeetingService.StartTask */
export async function MeetingServiceStartTask(
  body: SMZX.smzxMeetingStartTaskReq,
  options ?: {[key: string]: any}
) {
  return request<SMZX.smzxMeetingStartTaskResp>('/rpc/smzx.service-robotics/MeetingService.StartTask', {
  method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

