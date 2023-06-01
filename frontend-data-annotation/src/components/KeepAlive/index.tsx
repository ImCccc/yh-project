import { useUpdate } from 'ahooks';
import { useLocation } from 'react-router-dom';
import React, { useRef, useEffect, memo, ReactNode } from 'react';
import { useDispatchEvent } from '@/hooks/useEffectCacheRoute';

type KeepAliveProps = {
  cacheList: string[]; // 缓存的路由
  children: ReactNode; // 路由界面
};

const KeepAlive: React.FC<KeepAliveProps> = ({ cacheList = [], children }) => {
  const update = useUpdate();
  const activeKey = useRef('');
  const { pathname } = useLocation();
  const componentList = useRef(new Map<string, KeepAliveProps['children']>());

  const dispatchEvent = useDispatchEvent();

  useEffect(() => {
    activeKey.current = pathname;
    Array.from(componentList.current).map(([key]) => {
      if (!cacheList.includes(key) && key !== pathname) {
        componentList.current.delete(key);
      }
    });
    if (!componentList.current.has(pathname)) {
      componentList.current.set(pathname, children);
    } else {
      // 缓存的路由, 再次进入不会触发 useEffect, 使用事件派发模式模拟
      dispatchEvent();
    }
    update(); // 强制刷新界面
  }, [cacheList, children, dispatchEvent, pathname, update]);

  return (
    <>
      {Array.from(componentList.current).map(([key, component]) => (
        <div
          key={key}
          className="layout-container__keep-alive"
          style={{ display: key === activeKey.current ? '' : 'none' }}
        >
          {component}
        </div>
      ))}
    </>
  );
};

export default memo(KeepAlive);
