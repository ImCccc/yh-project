import { ImperativeHandleProps } from '@/components/ModalForm';
import PageTags from '@/components/PageTags';
import { TableListColumns, TableListRef } from '@/components/TableList';
import { ContentModal } from '@/pages/Layout/Content';
import { UserServicePage } from '@/services/dataAnnotation/UserService';
import { roleMapText } from '@/utils/globalData';
import { splitButtons } from '@/utils/util';
import { FormOutlined } from '@ant-design/icons';
import { Button } from 'antd';
import { observer } from 'mobx-react-lite';
import { useMemo, useRef, useState } from 'react';
import styles from './index.module.less';
import Table from './Table';
import UpdateUser from './UpdateUser';
import DeleteUser, { DeleteUserRefProps } from './DeleteUser';

const is_total0 = { is_total: 0 };
const is_total1 = { is_total: 1 };

const Comp: React.FC = () => {
  const modalFormRef = useRef<ImperativeHandleProps>(null);
  const [modalState, setModalState] = useState<
    '创建用户' | '修改用户' | '修改密码'
  >('创建用户');
  const [initialValues, setInitialValues] = useState<Record<string, unknown>>(
    {},
  );
  const deleteModalRef = useRef<DeleteUserRefProps>(null);
  const [deleteData, setDeleteData] = useState<any>();
  const tableRef1 = useRef<TableListRef>();
  const tableRef2 = useRef<TableListRef>();

  const columns: TableListColumns<ANNOTATION.dataAnnotationUser> = useMemo(
    () => [
      {
        title: '用户名',
        dataIndex: 'name',
        width: 200,
        render: (text, data) => (
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <div
              style={{
                maxWidth: '150px',
                overflow: 'hidden',
                whiteSpace: 'nowrap',
                textOverflow: 'ellipsis',
              }}
            >
              {text}
            </div>
            &nbsp;
            <FormOutlined
              style={{ color: '#1890FF', cursor: 'pointer' }}
              onClick={() => {
                const _data = JSON.parse(JSON.stringify(data));
                _data.password = '';
                _data.role_code = roleMapText[data.role_code];
                setInitialValues(_data);
                setModalState('修改用户');
                modalFormRef.current?.showModal();
              }}
            />
          </div>
        ),
      },
      {
        title: '邮箱',
        dataIndex: 'email',
        width: 150,
      },
      {
        title: '角色',
        dataIndex: 'role_code',
        render: (text) => roleMapText[text],
        width: 80,
      },
      {
        title: '创建者',
        dataIndex: 'create_username',
        width: 90,
      },
      {
        type: 'dateTime',
        title: '创建时间',
        dataIndex: 'create_time',
        width: 180,
      },
      {
        width: 180,
        align: 'center',
        title: '操作',
        render: (data) =>
          splitButtons(
            <Button
              type="link"
              onClick={() => {
                const _data = JSON.parse(JSON.stringify(data));
                _data.password = '';
                _data.role_code = roleMapText[data.role_code];
                setInitialValues(_data);
                setModalState('修改密码');
                modalFormRef.current?.showModal();
              }}
            >
              修改密码
            </Button>,
            <Button
              type="link"
              onClick={() => {
                setDeleteData(data);
                deleteModalRef.current?.showDeleteModal()
              }}
            >
              删除
            </Button>,
          ),
      },
    ],
    [],
  );

  const items = useMemo(
    () => [
      {
        label: '我创建的',
        key: 'item-1',
        children: (
          <Table
            onRef={tableRef1}
            tableParams={is_total0}
            columns={columns}
            service={UserServicePage}
          />
        ),
      },
      {
        label: '所有的',
        key: 'item-2',
        children: (
          <Table
            onRef={tableRef2}
            tableParams={is_total1}
            columns={columns}
            service={UserServicePage}
          />
        ),
      },
    ],
    [columns],
  );

  return (
    <div className={styles.container}>
      <ContentModal>
        <Button
          type="primary"
          onClick={() => {
            setInitialValues({ role_code: '队长' });
            setModalState('创建用户');
            modalFormRef.current?.showModal();
          }}
        >
          创建用户
        </Button>
      </ContentModal>
      <PageTags items={items} />
      <UpdateUser
        modalState={modalState}
        initialValues={initialValues}
        modalFormRef={modalFormRef}
        tableRef1={tableRef1}
        tableRef2={tableRef2}
      />
      <DeleteUser
        deleteData={deleteData}
        ref={deleteModalRef}
        tableRef1={tableRef1}
        tableRef2={tableRef2}
        deleteTarget="队长"
      />
    </div>
  );
};

export default observer(Comp);
