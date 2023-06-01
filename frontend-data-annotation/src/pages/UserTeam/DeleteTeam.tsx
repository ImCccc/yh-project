import { TeamServiceDel } from '@/services/dataAnnotation/TeamService';
import { getMapDataByList } from '@/utils/globalData';
import { Button, message, Modal } from 'antd';
import React, { useCallback, useState } from 'react';
import { TeamInfoProps } from './Admin';
import styles from './Admin.module.less';
import useUserList from './useUserList';

type CompProps = {
  teamInfo?: TeamInfoProps;
  successCallback: (isCreate?: boolean, info?: TeamInfoProps) => void;
};

const Comp: React.FC<CompProps> = ({ successCallback, teamInfo }) => {
  const [deleteModalOpen, setDeleteModalOpen] = useState<boolean>(false);

  const close = useCallback(() => {
    setDeleteModalOpen(false);
  }, []);

  const open = useCallback(() => {
    setDeleteModalOpen(true);
  }, []);

  // 确定删除
  const deleteSubmit = useCallback(async () => {
    if (teamInfo?.id) {
      await TeamServiceDel({ id: teamInfo.id });
      message.success('删除成功');
      successCallback();
    }
  }, [successCallback, teamInfo?.id]);

  // 获取用户名
  const { userList } = useUserList('');
  const getUserName = getMapDataByList(userList);

  return (
    <>
      <Button danger className={styles.deleteButton} onClick={open}>
        删除
      </Button>
      <Modal
        title="删除团队"
        open={deleteModalOpen}
        onOk={deleteSubmit}
        onCancel={close}
      >
        <div className={styles.deleteModalTop}>
          <p>
            是否确定删除 <span className={styles.red}>{teamInfo?.name}</span>{' '}
            这个团队？
          </p>
          <p>
            删除后此团队的 <span className={styles.red}>队长</span> 和{' '}
            <span className={styles.red}>所有队员</span> 的信息仍保留在系统中
          </p>
          <p>删除操作无法恢复，请谨慎操作！</p>
        </div>
        <div className={styles.deleteModalBottom}>
          <div className={styles.deleteModalBottomLeft}>
            <span>团队名：</span>
            <span>队长：</span>
            <span>邮箱：</span>
          </div>
          <div className={styles.deleteModalBottomRight}>
            <span>{teamInfo?.name}</span>
            <span>
              {teamInfo?.leader_user_id &&
                typeof getUserName[teamInfo?.leader_user_id] == 'string' &&
                getUserName[teamInfo?.leader_user_id].replace(/\(.*?\)/g, '')}
            </span>
            <span>
              {teamInfo?.leader_user_id &&
                typeof getUserName[teamInfo?.leader_user_id] == 'string' &&
                getUserName[teamInfo?.leader_user_id]
                  .match(/\((.+?)\)/g)[0]
                  .replace('(', '')
                  .replace(')', '')}
            </span>
          </div>
        </div>
      </Modal>
    </>
  );
};

export default React.memo(Comp);
