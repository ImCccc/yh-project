import ModalForm, {
  FormItemListProps,
  ImperativeHandleProps,
} from '@/components/ModalForm';
import TableList, {
  TableListColumns,
  TableListRef,
} from '@/components/TableList';
import { AUTHORITY_LEADER } from '@/config/constant';
import {
  MemberServiceAdd,
  MemberServicePage,
  MemberServiceRemove,
} from '@/services/dataAnnotation/MemberService';
import { UserServiceListSelect } from '@/services/dataAnnotation/UserService';
import { ListProps, roleMapText } from '@/utils/globalData';
import { deleteConfirm } from '@/utils/util';
import { Button, message } from 'antd';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import styles from './Admin.module.less';

type CompProps = {
  teamId?: string;
  canEdit?: boolean;
  addSuccess?: (addUsersLength: number) => void;
  removeSuccess?: () => void;
};

type ColumnsProps = TableListColumns<ANNOTATION.dataAnnotationUser>;

const Comp: React.FC<CompProps> = ({
  teamId,
  canEdit,
  addSuccess,
  removeSuccess,
}) => {
  const tableRef = useRef<TableListRef>();
  const modalFormRef = useRef<ImperativeHandleProps>(null);
  const [userList, setUserList] = useState<ListProps[]>([]);

  const params = useMemo(() => {
    if (teamId) return { team_id: teamId };
    return null;
  }, [teamId]);

  const columns = useMemo<ColumnsProps>(() => {
    const _columns: ColumnsProps = [
      {
        title: '用户名',
        dataIndex: 'name',
        width: 90,
      },
      {
        title: '邮箱',
        dataIndex: 'email',
        width: 80,
      },
      {
        title: '角色',
        dataIndex: 'role_code',
        render: (code) => roleMapText[code] || '',
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
    ];
    if (canEdit) {
      _columns.push({
        width: 100,
        align: 'center',
        title: '操作',
        dataIndex: 'role_code',
        render: (roleCode, row) => {
          if (roleCode === AUTHORITY_LEADER) return false;
          return (
            <Button
              type="link"
              onClick={async () => {
                await deleteConfirm(`确定要移除 "${row.name}" ?`);
                if (!teamId) return;
                await MemberServiceRemove({ team_id: teamId, user_id: row.id });
                message.success(`已将 "${row.name}" 移出团队`);
                tableRef.current?.refresh();
                setUserList([
                  ...userList,
                  { label: `${row.name} (${row.email})`, value: row.id },
                ]);
                removeSuccess && removeSuccess();
              }}
            >
              移除
            </Button>
          );
        },
      });
    }
    return _columns;
  }, [canEdit, removeSuccess, teamId, userList]);

  const formItemList = useMemo<FormItemListProps>(
    () => [
      {
        name: 'user_ids',
        type: 'Select',
        label: '用户名',
        rules: [{ required: true, message: '请选择用户' }],
        props: {
          placeholder: '请选择用户',
          options: userList,
          showSearch: true,
          optionFilterProp: 'children',
          mode: 'multiple',
        },
      },
    ],
    [userList],
  );

  const setUserListAPI = useCallback((_teamId: string) => {
    UserServiceListSelect({ team_id: _teamId }).then((data) => {
      setUserList(
        data.list.map((item) => ({
          label: `${item.name} (${item.email})`,
          value: item.id,
        })),
      );
    });
  }, []);

  const onSubmit = useCallback(
    async ({ user_ids }: { user_ids: string[] }) => {
      if (!teamId) return;
      const res = await MemberServiceAdd({ user_ids, team_id: teamId });
      message.success(`已将成员添加到团队`);
      tableRef.current?.refresh();
      setUserListAPI(teamId);
      addSuccess && addSuccess(res.user_ids.length);
    },
    [addSuccess, setUserListAPI, teamId],
  );

  useEffect(() => {
    if (!teamId || !canEdit) return;
    setUserListAPI(teamId);
  }, [canEdit, setUserListAPI, teamId]);

  return (
    <>
      <div className="base-head">
        <span className="base-font-title">成员列表</span>
        {teamId && canEdit && (
          <Button
            type="primary"
            onClick={() => modalFormRef.current?.showModal()}
          >
            添加
          </Button>
        )}
      </div>
      <div className={styles.rightComFourthLayer}>
        {params && (
          <TableList
            onRef={tableRef}
            reqParams={params}
            columns={columns}
            service={MemberServicePage}
          />
        )}
        <ModalForm
          title="添加用户"
          ref={modalFormRef}
          onSubmit={onSubmit}
          formItemList={formItemList}
        />
      </div>
    </>
  );
};

export default Comp;
