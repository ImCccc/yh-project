import ErrorBoundary from '@/components/ErrorBoundary';
import KeepAlive from '@/components/KeepAlive';
import { useMobx } from '@/stores';
import { observer } from 'mobx-react-lite';
import React, { ReactNode, useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import { useLocation, useOutlet } from 'react-router-dom';
import Breadcrumb from './Breadcrumb';
import HeaderDropdown from './HeaderDropdown';
import styles from './index.module.less';

export const ContentModal: React.FC<{
  children: ReactNode;
  currentPath?: string;
}> = React.memo(({ children, currentPath }) => {
  const el = useRef(document.createElement('div'));
  const location = useLocation();

  useEffect(() => {
    const pathname = location.pathname.split('/').slice(0, 4).join('/');

    if (currentPath)
      el.current.style.display = pathname === currentPath ? '' : 'none';
  }, [currentPath, location.pathname]);

  useEffect(() => {
    const modalRoot = document.getElementById('_modalRoot');
    const _el = el.current;

    if (modalRoot) modalRoot.appendChild(_el);
    return () => {
      if (modalRoot) modalRoot.removeChild(_el);
    };
  }, []);

  return createPortal(children, el.current);
});

export const TitleModal: React.FC<{ children: ReactNode }> = React.memo(
  ({ children }) => {
    const el = useRef(document.createElement('span'));
    useEffect(() => {
      const modalRoot = document.getElementById('_modal_title');
      const _el = el.current;
      if (modalRoot) modalRoot.appendChild(_el);
      return () => {
        if (modalRoot) modalRoot.removeChild(_el);
      };
    }, []);
    return createPortal(children, el.current);
  },
);

const Comp: React.FC = () => {
  const outlet = useOutlet();
  const KeepAliveRoute = useMobx('KeepAliveRoute');
  return (
    <div className={styles.content}>
      <div className={styles.header}>
        <HeaderDropdown />
      </div>
      <div className={styles.main}>
        <Breadcrumb>
          <div id="_modalRoot" className={styles.portal}></div>
        </Breadcrumb>
        <ErrorBoundary subTitle="抱歉, 页面出错了">
          <KeepAlive cacheList={KeepAliveRoute.cacheList}>{outlet}</KeepAlive>
        </ErrorBoundary>
      </div>
    </div>
  );
};

export default observer(Comp);
