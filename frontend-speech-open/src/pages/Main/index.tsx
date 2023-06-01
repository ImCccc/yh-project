import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { Button, message } from 'antd';

import ModalForm, {
  FormItemListProps,
  ImperativeHandleProps,
} from '@/components/ModalForm';
import TableList, {
  TableListColumns,
  TableListRef,
} from '@/components/TableList';
import TableSearch from '@/components/TableSearch';
import Header from '@/pages/Layout/Header';
import { statusMapText } from '@/utils/globalData';

import {
  AppServiceAppTypeList,
  AppServiceCreate,
  AppServicePage,
} from '@/services/speechOpen/AppService';

import styles from './index.module.less';

const fields = [
  {
    label: '',
    key: 'app_name',
    placeholder: '请输入应用名称搜索',
  },
];

const columns: TableListColumns<SPEECHOPEN.speechopenAppInfo> = [
  {
    title: '应用名称',
    dataIndex: 'name',
  },
  {
    title: '应用分类',
    dataIndex: 'type',
  },
  {
    title: '创建时间',
    dataIndex: 'create_time',
    timeFormat: 'YYYY-MM-DD',
  },
  {
    title: '应用状态',
    dataIndex: 'status',
    render: (status: number) => <span>{statusMapText[status] || ''}</span>,
  },
];

type ParamsProps = {
  device_name?: string;
};

const Comp: React.FC = () => {
  const [formItemList, setFormItemList] = useState<FormItemListProps>();

  const tableRef = useRef<TableListRef>();
  const modalFormRef = useRef<ImperativeHandleProps>(null);

  const navigate = useNavigate();
  const [params, setParams] = useState<ParamsProps>({});

  useEffect(() => {
    AppServiceAppTypeList({}).then((data) => {
      const options = (data.list || []).map((label) => ({
        value: label,
        label,
      }));
      setFormItemList([
        {
          name: 'name',
          label: '应用名称',
          rules: [{ required: true, message: '请输入应用名称!' }],
          props: { placeholder: '请输入应用名称' },
        },
        {
          name: 'type',
          type: 'Select',
          label: '应用类型',
          rules: [{ required: true, message: '请选选择应用类型!' }],
          props: {
            options,
            placeholder: '请选选择应用类型',
            mode: false,
          },
        },
        {
          name: 'describe',
          label: '描述',
          props: { placeholder: '请输入描述' },
        },
        {
          name: 'aiui_appid',
          label: 'Aiui Appid',
          props: { placeholder: '请输入Aiui Appid' },
        },
        {
          name: 'aiui_appkey',
          label: 'Aiui Appkey',
          props: { placeholder: '请输入Aiui Appkey' },
        },
      ]);
    });
  }, []);

  // 点击查询
  const onSearch = (data: ParamsProps) => {
    setParams({ ...data });
  };

  const onRowClick = (record: SPEECHOPEN.speechopenAppInfo) => {
    navigate(`/main/${record.id}/application`);
  };

  const createApp = () => {
    modalFormRef.current?.showModal();
  };

  const onSubmit = async (params: SPEECHOPEN.speechopenAppCreateReq) => {
    console.log(params);
    await AppServiceCreate(params);
    message.success('应用创建成功!');
    tableRef.current?.refresh();
  };

  return (
    <>
      <Header />
      <div className={styles.container}>
        <TableSearch
          className="margin-space"
          fields={fields}
          onSearch={onSearch}
          renderButtons={() => <Button onClick={createApp}>创建应用</Button>}
        />
        <TableList
          rowKey="id"
          onRef={tableRef}
          columns={columns}
          reqParams={params}
          service={AppServicePage}
          onRow={(record) => ({ onClick: () => onRowClick(record) })}
        />
      </div>
      {formItemList && (
        <ModalForm
          title="新增设备"
          ref={modalFormRef}
          onSubmit={onSubmit}
          formItemList={formItemList}
          formProps={{ labelCol: { span: 5 } }}
        />
      )}
    </>
  );
};

export default Comp;
