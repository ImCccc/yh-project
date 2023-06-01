import Loading from '@/components/Loading';
import routes from '@/config/routes';
import '@/styles/global.less';
import { clientSSO } from '@infore/utils';
import { ConfigProvider } from 'antd';
import zhCN from 'antd/lib/locale/zh_CN';
import { Suspense, useEffect, useState } from 'react';
import { HashRouter, Route, RouteObject, Routes } from 'react-router-dom';
import { initFontSize } from './utils/util';

initFontSize();

const getRoute = (routes: RouteObject[]) => {
  return routes.map((options) => (
    <Route
      key={options.path}
      path={options.path}
      element={<Suspense fallback={<Loading />}>{options.element}</Suspense>}
    >
      {options.children && getRoute(options.children)}
    </Route>
  ));
};

function App() {
  const [loadingToken, setLoadingToken] = useState(true);
  useEffect(() => {
    clientSSO.set({
      options: {
        title: '工展馆总控系统',
        version: '1.1.3',
        expireTime: 86400,
      },
    });
    clientSSO.login().then(() => setLoadingToken(false));
  }, []);

  return (
    <ConfigProvider locale={zhCN}>
      {loadingToken ? (
        <Loading />
      ) : (
        <HashRouter>
          <Routes>{getRoute(routes)}</Routes>
        </HashRouter>
      )}
    </ConfigProvider>
  );
}

export default App;
