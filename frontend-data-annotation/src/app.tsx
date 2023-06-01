import routes, { RouteProps } from '@/config/routes';
import '@/styles/global.less';
import { ConfigProvider, message } from 'antd';
import zhCN from 'antd/lib/locale/zh_CN';
import { Suspense } from 'react';
import { HashRouter, Route, Routes } from 'react-router-dom';
import ErrorBoundary from './components/ErrorBoundary';
import PageAuth from './components/PageAuth';
import { initFontSize } from './utils/util';

// 提示的数量,最大为1个, 时间3秒
message.config({ duration: 3, maxCount: 1 });

initFontSize();

const loading = <div className="page-padding">页面加载中......</div>;

const getRoute = (routes: RouteProps[]) =>
  routes.map(({ children, path, Component, authority }) => (
    <Route
      key={path}
      path={path}
      element={
        <Suspense fallback={loading}>
          <PageAuth authority={authority}>
            <Component />
          </PageAuth>
        </Suspense>
      }
    >
      {children && getRoute(children)}
    </Route>
  ));

export default () => (
  <ErrorBoundary>
    <ConfigProvider locale={zhCN}>
      <HashRouter>
        <Routes>{getRoute(routes)}</Routes>
      </HashRouter>
    </ConfigProvider>
  </ErrorBoundary>
);
