import { useEffect, useState } from 'react';
import { Link, Outlet, useLocation, useParams } from 'react-router-dom';

import { Breadcrumb } from 'antd';
import { observer } from 'mobx-react-lite';

import menuItems from '@/config/menu';
import { useMobx } from '@/stores';

import HeaderDropdown from './HeaderDropdown';

import styles from './index.module.less';

const Comp: React.FC = () => {
  const { id } = useParams();
  const location = useLocation();
  const appData = useMobx('appInfo');
  const [mennName, setMenuName] = useState<string | undefined>('');

  // 初始化请求应用信息, 传进 mobx
  useEffect(() => {
    if (!id) return;
    if (!appData.appInfo) return appData.initData({ id, appid: '' });
  }, [appData, id]);

  // 布局页面销毁, 需要重新清除全局信息, 防止再次在主页进入页面, 信息对应不上
  useEffect(() => () => appData.clearAppInfo(), [appData]);

  useEffect(() => {
    const key = location.pathname.split('/').slice(-1)[0];
    const meunItem = menuItems.find((item) => item.key === key)?.label;
    setMenuName(meunItem);
  }, [location]);

  return (
    <div className={styles.content}>
      <div className={styles.c_header}>
        <Breadcrumb>
          <Breadcrumb.Item>
            <Link to="/">主页</Link>
          </Breadcrumb.Item>
          <Breadcrumb.Item>
            <span>{mennName}</span>
            <span className={styles.appname}>
              （ {appData.appInfo?.name} ）
            </span>
          </Breadcrumb.Item>
        </Breadcrumb>
        <HeaderDropdown />
      </div>
      <Outlet />
    </div>
  );
};

export default observer(Comp);
