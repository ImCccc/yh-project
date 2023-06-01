import React, { useCallback, useRef, useState } from 'react';
import styles from './index.module.less';
import TableList, {
  TableListRef,
  TableListColumns,
} from '@/components/TableList';
import ModalForm from '@/components/ModalForm';
import {
  BroadcastServiceAdd,
  BroadcastServiceDel,
  BroadcastServiceGet,
  BroadcastServicePage,
  BroadcastServiceUpdate,
} from '@/services/smzx/BroadcastService';
import { Button, message } from 'antd';

// 新增表格格式
const formItemList = [
  {
    name: 'code',
    label: '播报类型',
    rules: [{ required: true, message: '请输入播报类型!' }],
    props: {
      placeholder: '请输入播报类型',
    },
  },
  {
    name: 'content',
    label: '播报模板',
    rules: [{ required: true, message: '请输入播报模板!' }],
    props: {
      placeholder: '请输入播报模板',
    },
  },
  {
    name: 'name',
    label: '播报人',
    rules: [{ required: true, message: '请输入播报人!' }],
    props: {
      placeholder: '请输入播报人',
    },
  },
];

const Comp: React.FC = () => {
  // 筛选值
  const [filterValue] = useState<Record<string, any>>({});
  // 新增播报弹框
  const addModalFormRef = useRef<{ showModal: () => void }>(null);
  // 编辑播报弹框
  const editModalFormRef = useRef<{ showModal: () => void }>(null);
  // 弹窗表单初始值
  const [initialValues, setInitialValues] = useState({});
  // 子组件的ref，可以调用子组件的方法
  const tableRef = useRef<TableListRef>();

  // 表格列
  const columns: TableListColumns<SMZX.smzxBroadcast> = [
    {
      title: 'ID',
      dataIndex: 'id',
      key: 'id',
    },
    {
      title: '播报类型',
      dataIndex: 'code',
      key: 'code',
    },
    {
      title: '播报模板',
      dataIndex: 'content',
      key: 'content',
    },
    {
      title: '播报人',
      dataIndex: 'name',
      key: 'name',
    },

    {
      operList: [
        {
          label: '编辑',
          callback: async (row) => {
            // 获取播报
            BroadcastServiceGet({ id: row.id }).then((val) => {
              // 设置表单的默认值
              setInitialValues(val.broadcast);
              // 弹框
              editModalFormRef.current?.showModal();
            });
          },
        },
        {
          label: '删除',
          callback: (row) => BroadcastServiceDel({ id: row.id }),
        },
      ],
    },
  ];

  // 提交新增播报表单
  const add = useCallback(async (data: any) => {
    // 新增播报
    const res = await BroadcastServiceAdd({ broadcast: data });
    if (res) {
      message.success('新增成功');
      // 刷新表格
      tableRef.current?.refresh();
    } else {
      message.warning('新增失败');
    }
  }, []);

  // 提交编辑播报表单
  const edit = useCallback(async (data: any) => {
    // 编辑播报
    const res = await BroadcastServiceUpdate({ broadcast: data });
    if (res) {
      message.success('修改成功');
      // 刷新表格
      tableRef.current?.refresh();
    } else {
      message.warning('修改失败');
    }
  }, []);

  return (
    <div className="common-page">
      <div className={styles.top}>
        <Button
          type="primary"
          onClick={() => addModalFormRef.current?.showModal()}
        >
          新建播报
        </Button>
        <ModalForm
          title="新增播报"
          ref={addModalFormRef}
          onSubmit={add}
          formProps={{ labelCol: { span: 4 } }}
          formItemList={formItemList}
        />
        <ModalForm
          title="编辑播报"
          ref={editModalFormRef}
          onSubmit={edit}
          formProps={{ labelCol: { span: 4 } }}
          formItemList={formItemList}
          initialValues={initialValues}
        />
      </div>
      <TableList
        columns={columns}
        service={BroadcastServicePage}
        reqParams={filterValue}
        pagination={{ showQuickJumper: true }}
        onRef={tableRef}
      />
    </div>
  );
};

export default Comp;
