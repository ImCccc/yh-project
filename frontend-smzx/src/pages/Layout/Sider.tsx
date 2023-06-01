import React, { useEffect, useMemo, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import { Menu, MenuProps } from 'antd';

import menuItems from '@/config/menu';

import styles from './index.module.less';

const App: React.FC = () => {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const [defaultSelectedKeys, setDefaultSelectedKeys] = useState<string[]>([]);
  const onClick: MenuProps['onClick'] = (e) => navigate(e.key);

  useEffect(() => {
    setDefaultSelectedKeys([pathname]);
  }, [pathname]);

  const openKeys = useMemo(() => [pathname.split('/')[1]], [pathname]);

  return (
    <div className={styles.menuwrap}>
      <div onClick={() => navigate('/')} className={styles.m_title}>
        工展馆总控系统
      </div>
      <Menu
        mode="inline"
        theme="dark"
        onClick={onClick}
        items={menuItems}
        defaultOpenKeys={openKeys}
        className={styles.menu}
        selectedKeys={defaultSelectedKeys}
      />
    </div>
  );
};

export default App;
