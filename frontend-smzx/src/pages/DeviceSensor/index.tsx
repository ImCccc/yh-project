import { useCallback, useRef, useState } from 'react';
import TableList, {
  TableListRef,
  TableListColumns,
} from '@/components/TableList';
import UploadXlsx from '@/components/UploadXlsx';
import TableSearch, { FieldsItemProps } from '@/components/TableSearch';
import {
  SensorDeviceServiceImport,
  SensorDeviceServicePage,
} from '@/services/smzx/SensorDeviceService';
import { areaMapText } from '@/utils/globalData';

const fields: FieldsItemProps[] = [
  {
    label: '设备名称',
    key: 'device_name',
    placeholder: '请输入设备名称搜索',
  },
];

const columns: TableListColumns<SMZX.smzxSensorDevice> = [
  {
    title: '设备ID',
    dataIndex: 'device_id',
  },
  {
    title: '设备名称',
    dataIndex: 'device_name',
  },
  {
    title: '产品ID',
    dataIndex: 'product_id',
  },
  {
    title: '设备类型',
    dataIndex: 'product_name',
  },
  {
    title: '设备状态',
    dataIndex: 'is_online',
    render: (online: boolean) => <span>{online ? '在线' : '离线'}</span>,
  },
  {
    title: '位置',
    dataIndex: 'area',
    render: (area: number) => <span>{areaMapText[area]}</span>,
  },
];

type ParamsProps = {
  device_name?: string;
};
const Comp: React.FC = () => {
  const tableRef = useRef<TableListRef>();
  const [params, setParams] = useState<ParamsProps>({});

  // 点击查询
  const onSearch = (data: ParamsProps) => {
    setParams({ ...data });
  };

  const onUploadSuccess = useCallback(() => {
    tableRef.current?.refresh();
  }, []);

  return (
    <div className="common-page">
      <TableSearch
        className="margin-space"
        fields={fields}
        onSearch={onSearch}
        renderButtons={() => (
          <UploadXlsx
            onSuccess={onUploadSuccess}
            service={SensorDeviceServiceImport}
          />
        )}
      />
      <TableList
        onRef={tableRef}
        rowKey="device_id"
        columns={columns}
        reqParams={params}
        service={SensorDeviceServicePage}
      />
    </div>
  );
};

export default Comp;
