import {useState, useEffect} from 'react';
import {TaskDeviceServiceListTaskDevice} from '@/service/device/TaskDeviceService';

export type DeviceListProps = DeviceProps[];
export type DeviceProps = {
  /** 设备id */
  deviceId: string;
  /** 设备类型 */
  deviceType: string;
  /** 设备名称 */
  name: string;
  label: string;
  value: string;
};

// 任务分类
export default function useDeviceList() {
  const [deviceList, setDeviceList] = useState<DeviceListProps>([]);
  useEffect(() => {
    TaskDeviceServiceListTaskDevice({}).then((data) => {
      const list = data.Devices || [];
      setDeviceList(
        list.map((v) => ({
          ...v,
          label: v.name,
          value: v.deviceId,
        }))
      );
    });
  }, []);
  return {deviceList, setDeviceList};
}
