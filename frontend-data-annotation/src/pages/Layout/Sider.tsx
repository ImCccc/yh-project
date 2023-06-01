import { getMenus, MeunProps } from '@/config/routes';
import { useMobx } from '@/stores';
import { Menu } from 'antd';
import { observer } from 'mobx-react-lite';
import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import styles from './index.module.less';

const Comp: React.FC = () => {
  const User = useMobx('User');
  const KeepAliveRoute = useMobx('KeepAliveRoute');
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const [selectedKeys, setSelectedKeys] = useState<string[]>([]);

  // 记录当前实现的左侧菜单的有效路径
  const menusMap = useRef<{ [k: string]: boolean }>({});

  const thisMenus = useMemo<any[]>(() => {
    menusMap.current = {};
    const loop = (menus: MeunProps[]) => {
      return menus.filter((menu) => {
        const { authority, children, hidemenu, key } = menu;
        if (hidemenu) return false;
        if (key) menusMap.current[key] = true;
        if (authority && !authority.includes(User.role)) return false;
        if (children) menu.children = loop(children);
        return true;
      });
    };
    return loop(getMenus());
  }, [User.role]);

  const defaultOpenKeys = useMemo(
    () => thisMenus.map((v) => v.key),
    [thisMenus],
  );

  // 路由变化, 更新激活的菜单, 详情界面: 在哪个子菜单进入详情界面, 就激活哪个子菜单
  // 详情界面的路径是有规范: /主菜单/子菜单/详情
  useEffect(() => {
    if (menusMap.current[pathname]) return setSelectedKeys([pathname]);
    let paths = pathname;
    let lastIndex = paths.lastIndexOf('/');
    while (lastIndex > 0) {
      paths = pathname.slice(0, lastIndex);
      if (menusMap.current[paths]) return setSelectedKeys([paths]);
      lastIndex = paths.lastIndexOf('/');
    }
  }, [pathname]);

  const goPage = useCallback(
    (key: string) => {
      KeepAliveRoute.remove();
      navigate(key);
    },
    [KeepAliveRoute, navigate],
  );

  const goHome = useCallback(() => {
    KeepAliveRoute.remove();
    navigate('/');
  }, [KeepAliveRoute, navigate]);

  return (
    <div className={styles.menuwrap}>
      <div className={styles.m_title} onClick={goHome}>
        <span className="iconfont icon-logo"></span>
      </div>
      <Menu
        theme="dark"
        mode="inline"
        items={thisMenus}
        className={styles.menu}
        selectedKeys={selectedKeys}
        onClick={(e) => goPage(e.key)}
        defaultOpenKeys={defaultOpenKeys}
      />
    </div>
  );
};

export default observer(Comp);
