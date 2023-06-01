import { AuthorityType } from '@/config/constant';
import Page403 from '@/pages/403';
import { useMobx } from '@/stores';
import { getToken } from '@/utils/storage';
import { observer } from 'mobx-react-lite';
import React, { ReactElement } from 'react';

type PageAuthProps = {
  children: ReactElement; // 页面路由
  authority?: AuthorityType | string[]; // 菜单配置中的 authority
};

// 未登录, 需要先登录
const verifyPermissions = () => {
  const token = getToken();
  if (!token && !location.hash.includes('#/login')) {
    location.hash = '#/login';
    location.reload(); // 必须刷新浏览器才能跳转登录界面
  }
};

const Comp: React.FC<PageAuthProps> = ({ children, authority }) => {
  const User = useMobx('User');
  verifyPermissions();
  if (!authority) return children;
  return authority.includes(User.role) ? children : <Page403 />;
};

export default observer(Comp);
