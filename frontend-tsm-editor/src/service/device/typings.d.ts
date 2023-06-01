// @ts-ignore
/* eslint-disable */

declare namespace API {
  type taskDeviceListTaskDeviceRequest = Record<string, any>;

  type taskDeviceListTaskDeviceResponse = {
    /** 设备列表 */
    Devices: taskDeviceTaskDevice[];
    code: number;
    msg: string;
    /** 列表数量 */
    total: number;
  };

  type taskDeviceTaskDevice = {
    /** 设备id */
    deviceId: string;
    /** 设备类型 */
    deviceType: string;
    /** 设备名称 */
    name: string;
  };
}
