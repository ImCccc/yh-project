import { UserServiceDel } from '@/services/dataAnnotation/UserService';
import { message, Modal } from 'antd';
import { forwardRef, useCallback, useImperativeHandle, useState } from 'react';
import styles from './index.module.less';

export type DeleteUserRefProps = {
  showDeleteModal: () => void;
}

type Props = {
  deleteData: any;
  tableRef1: any;
  tableRef2: any;
  deleteTarget: '队长' | '队员';
  ref?: any;
};

const Comp: React.FC<Props> = forwardRef(({
  tableRef1,
  tableRef2,
  deleteData,
  deleteTarget,
}, ref) => {
  // 删除是否打开
  const [deleteModalOpen, setDeleteModalOpen] = useState<boolean>(false);

  const imperativeHandle = (): DeleteUserRefProps => ({
    showDeleteModal: () => setDeleteModalOpen(true)
  });

  // 暴露给父组件调用的方法
  useImperativeHandle(ref, imperativeHandle);

  // 删除
  const deleteSubmit = useCallback(async () => {
    if (deleteData) {
      await UserServiceDel({ id: deleteData.id });
      message.success('删除成功');
      setDeleteModalOpen(false);
      tableRef1.current?.refresh();
      tableRef2.current?.refresh();
    }
  }, [deleteData, tableRef1, tableRef2]);

  // 取消删除
  const deleteCancel = useCallback(() => {
    setDeleteModalOpen(false);
  }, []);

  return (
    <Modal
      title="删除用户"
      open={deleteModalOpen}
      onOk={deleteSubmit}
      onCancel={deleteCancel}
    >
      <div className={styles.deleteModalTop}>
        <p>
          是否确定删除{' '}
          <span className={styles.red}>{deleteData && deleteData.name}</span>{' '}
          这个用户？
        </p>
        {deleteTarget === '队长' && (
          <>
            <p>
              此 <span className={styles.red}>队长</span> 及所{' '}
              <span className={styles.red}>创建的队员</span> 也将全部被删除
            </p>
            <p>
              此 <span className={styles.red}>队长所在的所有团队</span>{' '}
              也将全部被解散
            </p>
          </>
        )}
        <p>删除操作无法恢复，请谨慎操作！</p>
      </div>
      <div className={styles.deleteModalBottom}>
        <div className={styles.deleteModalBottomLeft}>
          <span>用户名：</span>
          <span>角色：</span>
          <span>绑定邮箱：</span>
        </div>
        <div className={styles.deleteModalBottomRight}>
          <span>{deleteData && deleteData.name}</span>
          <span>{deleteTarget}</span>
          <span>{deleteData && deleteData.email}</span>
        </div>
      </div>
    </Modal>
  );
})

export default Comp;
