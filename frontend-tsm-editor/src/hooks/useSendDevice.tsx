import {DryModal} from '@/utils/util';
import useDeviceList from '@/hooks/useDeviceList';
import CheckboxGroup from '@/components/CheckboxGroup';

type DevicesProps = {
  device_sn: string;
  device_type_id: string;
}[];

// 任务分类
export default function useSendDevice(
  callback: (devices: DevicesProps) => void
) {
  // 设备列表
  const {deviceList} = useDeviceList();

  const sendTask = () => {
    let devices: DevicesProps;
    const onChange = (_: string[], optionsValue?: any[]) => {
      devices = (optionsValue || []).map((v) => ({
        device_sn: v.deviceId,
        device_type_id: v.deviceType,
      }));
    };
    DryModal({
      width: '60rem',
      title: '下发至设备',
      content: <CheckboxGroup options={deviceList} onChange={onChange} />,
      onOk: () => {
        if (!devices?.length) return;
        callback(devices);
      },
    });
  };

  return sendTask;
}
