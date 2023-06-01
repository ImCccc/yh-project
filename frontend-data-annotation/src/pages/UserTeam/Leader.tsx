import { useCallback, useState } from 'react';
import styles from './Admin.module.less';
import TeamInfo from './TeamInfo';
import TeamList from './TeamList';
import TeamMemberList from './TeamMemberList';

const Comp: React.FC = () => {
  // 选中的团队信息
  const [selectTeamInfo, setSelectTeamInfo] =
    useState<ANNOTATION.dataAnnotationTeam>();

  // 添加队员回调
  const addSuccess = useCallback((addUsersLength: number) => {
    if (!selectTeamInfo) return;
    selectTeamInfo.member_count += addUsersLength;
    setSelectTeamInfo({ ...selectTeamInfo });
  }, [selectTeamInfo]);

  // 移除队员回调
  const removeSuccess = useCallback(() => {
    if (!selectTeamInfo) return;
    selectTeamInfo.member_count -= 1;
    setSelectTeamInfo({ ...selectTeamInfo });
  }, [selectTeamInfo]);

  // 修改团队信息回调
  const teamChange = useCallback((temaInfo: ANNOTATION.dataAnnotationTeam) => {
    setSelectTeamInfo(temaInfo);
  }, []);

  return (
    <div className={styles.main}>
      <TeamList selectTeamInfo={selectTeamInfo} teamChange={teamChange} />
      <div className={styles.rightCom}>
        <TeamInfo teamInfo={selectTeamInfo} />
        <TeamMemberList
          canEdit
          teamId={selectTeamInfo?.id}
          addSuccess={addSuccess}
          removeSuccess={removeSuccess}
        />
      </div>
    </div>
  );
};

export default Comp;
