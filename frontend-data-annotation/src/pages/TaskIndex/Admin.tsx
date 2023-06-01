import CacheLink from '@/components/CacheRouteLink';
import LinkButton from '@/components/LinkButton';
import ModalForm, {
  FormItemListProps,
  ImperativeHandleProps,
} from '@/components/ModalForm';
import { TableListColumns } from '@/components/TableList';
import { AUTHORITY_ADMIN } from '@/config/constant';
import { ContentModal } from '@/pages/Layout/Content';
import {
  TaskServiceDel,
  TaskServiceDownload,
  TaskServiceGet,
  TaskServicePage,
  TaskServiceUpdate,
} from '@/services/dataAnnotation/TaskService';
import { UserServiceVerifyPassword } from '@/services/dataAnnotation/UserService';
import { TASK_STATUS_DONE, TASK_STATUS_PASS } from '@/utils/globalData';
import { linkExport, splitButtons } from '@/utils/util';
import { taskDescribeRule, taskNameRule } from '@/utils/verification';
import { Button, Input, message, Modal, Tabs } from 'antd';
import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import {
  columnCreateTime,
  columnMarkType,
  columnProgress,
  columnUsername,
} from '.';
import { getPassword } from '../Login';
import Table from './Table';
import useExpandable from './useExpandable';

type UpdataProps = ANNOTATION.dataAnnotationTaskUpdateReq;
type TableRowProps = ANNOTATION.dataAnnotationTask;
type ColumnsProps = TableListColumns<TableRowProps>;

type Obj = { [k: string]: any };

const UpdateModal: React.FC<{
  open?: number;
  success: () => void;
  initValues: UpdataProps;
}> = React.memo(({ open, initValues, success }) => {
  const modalFormRef = useRef<ImperativeHandleProps>(null);
  const formItemList: FormItemListProps = useMemo(() => {
    return [
      {
        name: 'name',
        label: '任务名称',
        rules: taskNameRule,
        props: { placeholder: '请输入任务名称' },
      },
      {
        name: 'describe',
        label: '任务描述',
        type: 'TextArea',
        rules: taskDescribeRule,
        props: { placeholder: '请输入任务描述', rows: 4 },
      },
    ];
  }, []);

  const onSubmit = useCallback(
    async (data: any) => {
      await TaskServiceUpdate({ ...initValues, ...data });
      message.success('任务修改成功！');
      success();
    },
    [initValues, success],
  );

  useEffect(() => {
    if (open) modalFormRef.current?.showModal();
  }, [open]);

  return (
    <ModalForm
      title="修改任务"
      ref={modalFormRef}
      onSubmit={onSubmit}
      initialValues={initValues}
      formItemList={formItemList}
      formProps={{ labelCol: { span: 4 } }}
    />
  );
});

const Comp: React.FC = () => {
  const [refresh, setRefresh] = useState<Obj>();
  const [activeKey, setActiveKey] = useState('my');

  const [isOpen, setIsOpen] = useState<number>();
  const [initValues, setInitValues] = useState<UpdataProps>({
    id: '',
    name: '',
    describe: '',
  });

  const tableParams = useMemo(
    () => ({ is_total: activeKey === 'my' ? 0 : 1 }),
    [activeKey],
  );

  // 刷新表格
  const refreshTable = useCallback(() => setRefresh({}), []);

  // 展开配置
  const expandable = useExpandable(TaskServiceGet);

  const columns: ColumnsProps = useMemo(() => {
    // 修改任务
    const updateTask = (row: TableRowProps) => {
      setIsOpen(Math.random());
      setInitValues({ id: row.id, name: row.name, describe: row.describe });
    };

    // 删除任务
    const deleteTask = async (row: TableRowProps) => {
      Modal.confirm({
        width: '52rem',
        content: (
          <div>
            <span>
              是否确定删除<span className="strong">{row.name}</span>
              这个任务？任务删除后此任务下的标注子任务和质检子任务都将被删除，无法再继续标注和质检！
            </span>
            <Input.Password
              id="_VerifyPassword_"
              style={{ marginTop: '1rem' }}
              placeholder="请输入密码验证!"
            />
          </div>
        ),
        closable: true,
        title: '提示',
        okText: '确定',
        cancelText: '取消',
        onOk: async () => {
          try {
            const password = (
              document.getElementById('_VerifyPassword_') as HTMLInputElement
            ).value;

            if (!password) {
              message.error('删除任务需要输入密码验证!');
              return Promise.reject();
            }

            await UserServiceVerifyPassword({
              password: getPassword(password),
            });

            await TaskServiceDel({ id: row.id });
            message.success('删除成功！');
            setRefresh({});
            return Promise.resolve();
          } catch (error) {
            return Promise.reject();
          }
        },
      });
    };

    // 下载
    const downloadTask = async (row: TableRowProps) => {
      const { file_url } = await TaskServiceDownload({ id: row.id });
      linkExport(file_url);
    };

    return [
      {
        width: 100,
        title: '任务名称',
        dataIndex: 'name',
        render: (name, row) => (
          <CacheLink to={`/task/index/detalis/${AUTHORITY_ADMIN}/${row.id}`}>
            {name}
          </CacheLink>
        ),
      },
      columnMarkType,
      {
        width: 120,
        title: '数据集',
        dataIndex: 'data_name',
        render: (dataName, { data_id }) => (
          <CacheLink to={`/data/source/detalis/${AUTHORITY_ADMIN}/${data_id}`}>
            {dataName}
          </CacheLink>
        ),
      },
      columnProgress,
      columnUsername,
      columnCreateTime,
      {
        width: 120,
        title: '操作',
        dataIndex: 'id',
        render: (_, row) => {
          const deleteBtn = (
            <Button type="link" onClick={() => deleteTask(row)}>
              删除
            </Button>
          );
          const updateButton = (
            <Button type="link" onClick={() => updateTask(row)}>
              修改
            </Button>
          );
          const downloadButton = (
            <Button type="link" onClick={() => downloadTask(row)}>
              下载
            </Button>
          );
          const copyButton = (
            <CacheLink to={`/task/index/create/${row.id}`}>复制</CacheLink>
          );
          const checkButton = (
            <CacheLink to={`/task/index/verify/${row.mark_type}/${row.id}`}>
              验收
            </CacheLink>
          );
          //  验收通过
          if (row.status === TASK_STATUS_PASS) {
            return splitButtons(downloadButton, copyButton, deleteBtn);
          }
          // 质检完成
          if (row.status === TASK_STATUS_DONE) {
            return splitButtons(updateButton, checkButton, deleteBtn);
          }
          return splitButtons(updateButton, deleteBtn);
        },
      },
    ];
  }, []);

  const items = useMemo(() => {
    const table = (
      <Table
        columns={columns}
        refresh={refresh}
        params={tableParams}
        expandable={expandable}
        service={TaskServicePage}
      />
    );
    return [
      {
        key: 'my',
        label: '我创建的',
        children: activeKey === 'my' && table,
      },
      {
        key: 'all',
        label: '所有的',
        children: activeKey === 'all' && table,
      },
    ];
  }, [activeKey, columns, expandable, refresh, tableParams]);

  const tabChange = useCallback((key: string) => setActiveKey(key), []);

  return (
    <>
      <ContentModal currentPath="/task/index">
        <LinkButton to="/task/index/create">创建标注任务</LinkButton>
      </ContentModal>
      <Tabs
        className="page-tabs"
        items={items}
        onChange={tabChange}
        activeKey={activeKey}
      />
      <UpdateModal
        open={isOpen}
        initValues={initValues}
        success={refreshTable}
      />
    </>
  );
};

export default Comp;
