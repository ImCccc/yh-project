import {lazy, Suspense} from 'react';
import Test from '@/pages/Test';
import Layout from '@/pages/Layout';
import {initBodyFontSize} from '@/utils/util';
import {HashRouter, Routes, Route} from 'react-router-dom';
import {useInitData} from '@/stores';
import {Spin} from 'antd';
import './App.scss';

const Matrix = lazy(() => import('@/pages/Matrix'));
const Flow = lazy(() => import('@/pages/Flow'));
initBodyFontSize();

const App: React.FC = () => {
  useInitData();
  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route
            path="/"
            element={
              <Suspense fallback={<Spin delay={200} />}>
                <Flow />
              </Suspense>
            }
          />
          <Route
            path="/flow"
            element={
              <Suspense fallback={<Spin delay={200} />}>
                <Flow />
              </Suspense>
            }
          />
          <Route
            path="/matrix"
            element={
              <Suspense fallback={<Spin delay={200} />}>
                <Matrix />
              </Suspense>
            }
          />
        </Route>
        <Route path="/test" element={<Test />} />
      </Routes>
    </HashRouter>
  );
};

export default App;
