import { useEffect, useMemo, useState } from 'react';

import { AgvDeviceServiceProductList } from '@/services/smzx/AgvDeviceService';
import { getMapDataByList } from '@/utils/globalData';

function useDeviceTypeList() {
  const [deviceTypeList, setDeviceList] =
    useState<{ value: number | string; label: string }[]>();

  const deviceNames = useMemo(() => {
    if (!deviceTypeList) return {};
    return getMapDataByList(deviceTypeList);
  }, [deviceTypeList]);

  useEffect(() => {
    AgvDeviceServiceProductList({}).then((data) => {
      setDeviceList(
        (data.list || []).map((item) => ({
          value: item.product_id,
          label: item.product_name,
        })),
      );
    });
  }, []);

  return { deviceTypeList, deviceNames };
}

export default useDeviceTypeList;
