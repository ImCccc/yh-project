import React, {useCallback, useEffect, useState} from 'react';
import {Outlet, useNavigate, useLocation} from 'react-router-dom';
import classNames from 'classnames';
import styles from './index.module.scss';

const TABS_LIST = [
  {
    tabName: '任务设计',
    route: 'flow',
  },
  {
    tabName: '任务矩阵',
    route: 'matrix',
  },
];

const Layout: React.FC = () => {
  const navigate = useNavigate();
  const routes = useLocation();
  const [thisTab, setThisTab] = useState<string>();

  useEffect(() => {
    if (routes.pathname === '/') return setThisTab(TABS_LIST[0].route);
    setThisTab(routes.pathname.replace('/', ''));
  }, [routes]);

  const tabClick = useCallback(
    (tab: string) => {
      navigate(`/${tab}`);
      setThisTab(tab);
    },
    [navigate]
  );

  return (
    <div className={styles.layout}>
      <div className={styles.header}>
        <div className={styles.title} onClick={() => navigate('/flow')}>
          <span className="font-lg bold pointer">服务机器人TSM编辑器</span>
        </div>
        <div className={styles.tabs}>
          {TABS_LIST.map((options) => (
            <div
              key={options.route}
              onClick={() => tabClick(options.route)}
              className={classNames({
                pointer: true,
                [styles.tab]: true,
                [styles.select]: thisTab === options.route,
              })}>
              {options.tabName}
            </div>
          ))}
        </div>
      </div>
      <Outlet />
    </div>
  );
};

export default Layout;
