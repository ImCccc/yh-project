import MeunIcon from '@/components/MeunIcon';
import {
  AuthorityType,
  AUTHORITY_ADMIN,
  AUTHORITY_LEADER,
  AUTHORITY_MEMBER,
} from '@/config/constant';
import {
  AUDIO_TRANSCRIPTION,
  INTENT_SLOT,
  TEXT_CLASS,
  TEXT_GENERALIZATION,
} from '@/utils/globalData';
import { lazy } from 'react';
import { Navigate } from 'react-router-dom';

export type MeunProps = {
  label: string; // 菜单名称
  key?: string; // 路由路径
  icon?: JSX.Element;
  children?: MeunProps[]; // 子菜单
  hidemenu?: boolean; // 菜单是否隐藏, 通常详情页面需要设置为 true
  authority?: AuthorityType | string[]; // 值是角色, 用于指定哪个角色才能访问页面
};

export type RouteProps = {
  path: string; // 路由路径
  Component: React.LazyExoticComponent<React.FC> | React.FC;
  authority?: AuthorityType | string[]; // 值是角色, 用于指定哪个角色才能访问页面
  children?: RouteProps[];
};

export type RouteMenuProps = Partial<RouteProps> &
  MeunProps & { children?: RouteMenuProps[] };

const loginRoute = {
  path: '/login',
  Component: lazy(() => import('@/pages/Login')),
};

const route404 = {
  path: '*',
  Component: lazy(() => import('@/pages/404')),
};

const routeIndex: RouteProps = {
  path: '/',
  Component: () => <Navigate to="/task/index" />,
};

const routeMenuList: RouteMenuProps[] = [
  {
    label: '数据标注',
    path: '/task',
    icon: <MeunIcon icon="icon-zhibiaozhushibiaozhu" />,
    children: [
      {
        label: '我的任务',
        path: '/task/index',
        Component: lazy(() => import('@/pages/TaskIndex')),
      },
      {
        label: '任务详情',
        hidemenu: true,
        authority: AUTHORITY_ADMIN,
        path: `/task/index/detalis/${AUTHORITY_ADMIN.toLocaleLowerCase()}/:id`,
        Component: lazy(() => import('@/pages/TaskDetails')),
      },
      {
        label: '任务详情',
        hidemenu: true,
        authority: AUTHORITY_LEADER,
        path: `/task/index/detalis/${AUTHORITY_LEADER.toLocaleLowerCase()}/:id`,
        Component: lazy(() => import('@/pages/TaskDetailsLeader')),
      },
      {
        label: '创建标注任务',
        hidemenu: true,
        authority: AUTHORITY_ADMIN,
        path: '/task/index/create',
        Component: lazy(() => import('@/pages/TaskCreate')),
      },
      {
        label: '创建标注任务',
        hidemenu: true,
        authority: AUTHORITY_ADMIN,
        path: '/task/index/create/:id',
        Component: lazy(() => import('@/pages/TaskCreate')),
      },
      // 音频转写 13
      {
        label: '去标注',
        hidemenu: true,
        authority: AUTHORITY_MEMBER,
        path: `/task/index/mark/${AUDIO_TRANSCRIPTION}/:id`,
        Component: lazy(() => import('@/pages/MarkAudioTransfer')),
      },
      // 文本分类 21
      {
        label: '去标注',
        hidemenu: true,
        authority: AUTHORITY_MEMBER,
        path: `/task/index/mark/${TEXT_CLASS}/:id`,
        Component: lazy(() => import('@/pages/MarkTextClass')),
      },
      // 文本泛化 22
      {
        label: '去标注',
        hidemenu: true,
        authority: AUTHORITY_MEMBER,
        path: `/task/index/mark/${TEXT_GENERALIZATION}/:id`,
        Component: lazy(() => import('@/pages/MarkTextGeneralization')),
      },
      // 意图/槽位 23
      {
        label: '去标注',
        hidemenu: true,
        authority: AUTHORITY_MEMBER,
        path: `/task/index/mark/${INTENT_SLOT}/:id`,
        Component: lazy(() => import('@/pages/MarkIntentSlot')),
      },
      // 音频分类 11 / 音频分割 13
      {
        label: '去标注',
        hidemenu: true,
        authority: AUTHORITY_MEMBER,
        path: `/task/index/mark/:type/:id`,
        Component: lazy(() => import('@/pages/MarkAudio')),
      },

      // 音频转写 13
      {
        label: '去质检',
        hidemenu: true,
        authority: [AUTHORITY_MEMBER, AUTHORITY_LEADER],
        path: `/task/index/quality/${AUDIO_TRANSCRIPTION}/:id`,
        Component: lazy(() => import('@/pages/QualityAudioTransfer')),
      },
      // 文本分类 21
      {
        label: '去质检',
        hidemenu: true,
        authority: [AUTHORITY_MEMBER, AUTHORITY_LEADER],
        path: `/task/index/quality/${TEXT_CLASS}/:id`,
        Component: lazy(() => import('@/pages/QualityTextClass')),
      },
      // 文本泛化 22
      {
        label: '去质检',
        hidemenu: true,
        authority: [AUTHORITY_MEMBER, AUTHORITY_LEADER],
        path: `/task/index/quality/${TEXT_GENERALIZATION}/:id`,
        Component: lazy(() => import('@/pages/QualityTextGeneralization')),
      },
      // 意图/槽位 23
      {
        label: '去质检',
        hidemenu: true,
        authority: [AUTHORITY_MEMBER, AUTHORITY_LEADER],
        path: `/task/index/quality/${INTENT_SLOT}/:id`,
        Component: lazy(() => import('@/pages/QualityIntentSlot')),
      },
      // 音频分类 11 / 音频分割 13
      {
        label: '去质检',
        hidemenu: true,
        authority: [AUTHORITY_MEMBER, AUTHORITY_LEADER],
        path: `/task/index/quality/:type/:id`,
        Component: lazy(() => import('@/pages/QualityAudio')),
      },

      // 音频转写 13
      {
        label: '验收任务',
        hidemenu: true,
        authority: AUTHORITY_ADMIN,
        path: `/task/index/verify/${AUDIO_TRANSCRIPTION}/:id`,
        Component: lazy(() => import('@/pages/VerifyAudioTransfer')),
      },
      // 文本分类 21
      {
        label: '验收任务',
        hidemenu: true,
        authority: AUTHORITY_ADMIN,
        path: `/task/index/verify/${TEXT_CLASS}/:id`,
        Component: lazy(() => import('@/pages/VerifyTextClass')),
      },
      // 文本泛化 22
      {
        label: '验收任务',
        hidemenu: true,
        authority: AUTHORITY_ADMIN,
        path: `/task/index/verify/${TEXT_GENERALIZATION}/:id`,
        Component: lazy(() => import('@/pages/VerifyTextGeneralization')),
      },
      // 意图/槽位 23
      {
        label: '验收任务',
        hidemenu: true,
        authority: AUTHORITY_ADMIN,
        path: `/task/index/verify/${INTENT_SLOT}/:id`,
        Component: lazy(() => import('@/pages/VerifyIntentSlot')),
      },
      // 音频分类 11 / 音频分割 13
      {
        label: '验收任务',
        hidemenu: true,
        authority: AUTHORITY_ADMIN,
        path: `/task/index/verify/:type/:id`,
        Component: lazy(() => import('@/pages/VerifyAudio')),
      },
    ],
  },
  {
    label: '数据管理',
    path: '/data',
    icon: <MeunIcon icon="icon-shujukanban" />,
    authority: AUTHORITY_ADMIN,
    children: [
      {
        label: '数据集',
        path: '/data/source',
        Component: lazy(() => import('@/pages/DataSource')),
      },
      {
        label: '标签集',
        path: '/data/labelSet',
        Component: lazy(() => import('@/pages/LabelSet')),
      },
      {
        label: '数据集详情',
        hidemenu: true,
        authority: AUTHORITY_ADMIN,
        path: `/data/source/detalis/${AUTHORITY_ADMIN.toLocaleLowerCase()}/:id`,
        Component: lazy(() => import('@/pages/DataDetail')),
      },
      {
        label: '标签集详情',
        hidemenu: true,
        authority: AUTHORITY_ADMIN,
        path: `/data/labelSet/detalis`,
        Component: lazy(() => import('@/pages/LabelSetDetail')),
      },
    ],
  },
  {
    label: '用户管理',
    path: '/user',
    icon: <MeunIcon icon="icon-yonghu" />,
    authority: [AUTHORITY_ADMIN, AUTHORITY_LEADER],
    children: [
      {
        label: '用户列表',
        path: '/user/list',
        Component: lazy(() => import('@/pages/UserList')),
      },
      {
        label: '团队管理',
        path: '/user/team',
        Component: lazy(() => import('@/pages/UserTeam')),
      },
    ],
  },
  {
    label: '基本信息',
    path: '/user/info',
    hidemenu: true,
    Component: lazy(() => import('@/pages/BaseInfo')),
  },
];

export const getRoutes = (routeMenuList: RouteMenuProps[]): RouteProps[] => {
  const routes: RouteProps[] = [];
  const loop = (routeMenuList: RouteMenuProps[]) => {
    routeMenuList.forEach((route) => {
      const { children, path, Component, authority } = route;
      if (Component && path) routes.push({ path, Component, authority });
      if (children) loop(children);
    }, routes);
  };
  loop(routeMenuList);
  return [
    loginRoute,
    {
      path: '/',
      Component: lazy(() => import('@/pages/Layout')),
      children: [routeIndex, ...routes, route404],
    },
    route404,
  ];
};

export const getMenus = (list = routeMenuList): MeunProps[] =>
  list.map((item) => {
    const { children, path, label, icon, authority, hidemenu } = item;
    return {
      icon,
      label,
      hidemenu,
      key: path,
      authority,
      children: children ? getMenus(children) : undefined,
    };
  });

export const getBreadcrumbData = () => {
  const breadcrumbData: { [key: string]: string } = {};
  const loop = (routeMenuList: RouteMenuProps[]) => {
    routeMenuList.forEach((route) => {
      const { children, path, label } = route;
      if (path) {
        const formatPath = path.split('/').slice(0, 4).join('/');
        breadcrumbData[formatPath] = label;
      }
      if (children) loop(children);
    });
  };
  loop(routeMenuList);
  return breadcrumbData;
};

export const breadcrumbData = getBreadcrumbData();

export default getRoutes(routeMenuList);
