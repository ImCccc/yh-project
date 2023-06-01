import { Tabs } from 'antd';
import React, { useCallback, useMemo, useState } from 'react';
import styles from './Admin.module.less';
import DeleteTeam from './DeleteTeam';
import TeamInfo from './TeamInfo';
import TeamList from './TeamList';
import TeamMemberList from './TeamMemberList';
import UpdateTeam from './UpdateTeam';
import useUserList from './useUserList';

export type TeamInfoProps = ANNOTATION.dataAnnotationTeam;

const Comp: React.FC = () => {
  const [activeKey, setActiveKey] = useState<string>('0');
  const items = useMemo(() => {
    return [
      { key: '0', label: `我创建的`, children: null },
      { key: '1', label: `所有的`, children: null },
    ];
  }, []);

  // 用户列表
  const { userList } = useUserList('');

  // 刷新团队列表
  const [refreshTeamList, setRefreshTeamList] = useState<{
    refresh: boolean;
  }>();

  const tabChange = useCallback((e: string) => {
    setActiveKey(e);
  }, []);

  // 选中的团队信息
  const [selectTeamInfo, setSelectTeamInfo] = useState<TeamInfoProps>();

  // 创建团队/编辑团队完成后回调
  const successCallback = useCallback(
    (create?: boolean, info?: TeamInfoProps) => {
      if (create) {
        setRefreshTeamList({ refresh: true });
      } else {
        setSelectTeamInfo(info);
      }
    },
    [],
  );

  // 删除团队完成后回调
  const deleteCallback = useCallback(() => {
    setSelectTeamInfo(undefined);
    setRefreshTeamList({ refresh: true });
  }, []);

  // 修改团队信息回调
  const teamChange = useCallback((temaInfo: ANNOTATION.dataAnnotationTeam) => {
    setSelectTeamInfo(temaInfo);
  }, []);

  return (
    <>
      <Tabs
        items={items}
        className="page-tabs"
        onChange={tabChange}
        activeKey={activeKey}
      />
      <div className={styles.main}>
        <TeamList
          isTotal={+activeKey}
          refresh={refreshTeamList}
          selectTeamInfo={selectTeamInfo}
          teamChange={teamChange}
          buttons={
            <UpdateTeam
              isCreate
              userList={userList}
              successCallback={successCallback}
            />
          }
        />
        <div className={styles.rightCom}>
          <TeamInfo
            teamInfo={selectTeamInfo}
            buttons={
              <div>
                <UpdateTeam
                  isCreate={false}
                  userList={userList}
                  teamInfo={selectTeamInfo}
                  successCallback={successCallback}
                />
                <DeleteTeam
                  successCallback={deleteCallback}
                  teamInfo={selectTeamInfo}
                />
              </div>
            }
          />
          <TeamMemberList teamId={selectTeamInfo?.id} />
        </div>
      </div>
    </>
  );
};

export default Comp;
