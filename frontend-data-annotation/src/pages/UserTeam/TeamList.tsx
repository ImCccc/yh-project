import Loading from '@/components/Loading';
import { TeamServicePage } from '@/services/dataAnnotation/TeamService';
import { PAGE_PARAMS } from '@/utils/globalData';
import { formatDate } from '@/utils/util';
import { Empty, Input } from 'antd';
import classNames from 'classnames';
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import styles from './Admin.module.less';

type CompProps = {
  isTotal?: number;
  buttons?: React.ReactNode;
  refresh?: { refresh: boolean };
  selectTeamInfo?: ANNOTATION.dataAnnotationTeam;
  teamChange?: (info: ANNOTATION.dataAnnotationTeam) => void;
};

let update = false;

const Comp: React.FC<CompProps> = ({
  refresh,
  isTotal,
  buttons,
  teamChange,
  selectTeamInfo,
}) => {
  // 团队信息列表
  const [teamList, setTeamList] = useState<ANNOTATION.dataAnnotationTeam[]>([]);
  const [loading, setLoading] = useState(false);

  const [search, setSearch] = useState('');
  const showList = useMemo(
    () => (teamList || []).filter((item) => item.name.includes(search)),
    [search, teamList],
  );

  const getTeamList = useCallback(async (is_total = 1) => {
    setLoading(true);
    setTeamList([]);
    try {
      const res = await TeamServicePage({ ...PAGE_PARAMS, is_total, name: '' });
      setTeamList(res.list);
    } catch (error) {
      console.error(error);
    }
    setLoading(false);
  }, []);

  // 如果有信息更新, 需要更新列表数据
  useEffect(() => {
    if (!selectTeamInfo) return;
    const index = teamList.findIndex((item) => item.id === selectTeamInfo.id);
    if (index !== -1 && teamList[index] !== selectTeamInfo) {
      teamList[index] = selectTeamInfo;
      setTeamList([...teamList]);
    }
  }, [selectTeamInfo, teamList]);

  useEffect(() => {
    getTeamList(isTotal);
    update = !update;
  }, [getTeamList, refresh, isTotal]);

  // 默认选中第一个
  useEffect(() => {
    if (teamList[0] && teamChange) {
      teamChange(teamList[0]);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [teamChange, teamList[0]]);

  return (
    <div className={styles.leftCom}>
      <div className="base-head">
        <span className="base-font-title">团队列表</span>
        {buttons}
      </div>
      <Input
        allowClear
        suffix={<span className="iconfont icon-Shape"></span>}
        value={search}
        className={styles.search}
        placeholder="请输入团队名查询"
        onChange={(e) => setSearch(e.target.value)}
      />
      <div className={styles.teamMain}>
        {showList.map((item) => (
          <div
            key={item.id}
            className={classNames({
              [styles.teamItem]: true,
              [styles.selectItem]: selectTeamInfo?.id === item.id,
            })}
            onClick={() => teamChange && teamChange(item)}
          >
            <div className={styles.teamItemTop}>
              <span className={styles.teamName}>{item.name}</span>
              <span className="sk0">
                {item.member_count && item.member_count + '人'}
              </span>
            </div>
            <div className={styles.teamItemBottom}>
              <span>{formatDate(item.create_time)}</span>
            </div>
          </div>
        ))}
        {showList.length === 0 && (
          <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />
        )}
      </div>
      {loading && <Loading />}
    </div>
  );
};

export default React.memo(Comp);
