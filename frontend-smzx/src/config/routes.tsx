import { lazy } from 'react';
import { RouteObject } from 'react-router-dom';

import Layout from '@/pages/Layout';

const Login = lazy(() => import('@/pages/Login'));
const NotFound = lazy(() => import('@/pages/404'));
const DeviceSensor = lazy(() => import('@/pages/DeviceSensor'));
const DeviceAgv = lazy(() => import('@/pages/DeviceAgv'));
const DeviceOta = lazy(() => import('@/pages/DeviceOta'));
const LogTask = lazy(() => import('@/pages/LogTask'));
const LogError = lazy(() => import('@/pages/LogError'));
const Play = lazy(() => import('@/pages/Play'));
const Task = lazy(() => import('@/pages/Task'));
const IcescreenList = lazy(() => import('@/pages/IcescreenList'));

const routes: RouteObject[] = [
  { path: '/login', element: <Login /> },
  {
    path: '/',
    element: <Layout />,
    children: [
      { path: '/', element: <DeviceAgv /> },
      { path: 'device/agv', element: <DeviceAgv /> },
      { path: 'device/sensor', element: <DeviceSensor /> },
      { path: 'device/ota', element: <DeviceOta /> },
      { path: 'log/error', element: <LogError /> },
      { path: 'play', element: <Play /> },
      { path: 'task/index', element: <Task /> },
      { path: 'task/log', element: <LogTask /> },
      { path: 'icescreenList', element: <IcescreenList /> },
      { path: '*', element: <NotFound /> },
    ],
  },
  { path: '*', element: <NotFound /> },
];

export default routes;
