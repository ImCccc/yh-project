import { LOGIN_PATH } from '@/config/constant';
import { AuthServiceLogout } from '@/services/dataAnnotation/AuthService';
import { useMobx } from '@/stores';
import { observer } from 'mobx-react-lite';
import { useCallback } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styles from './index.module.less';

const Header: React.FC = () => {
  const navigate = useNavigate();
  const user = useMobx('User');

  const logout = useCallback(() => {
    user.clearUseInfo();
    navigate(LOGIN_PATH);
  }, [navigate, user]);

  const menuClick = useCallback(() => {
    AuthServiceLogout({})
      .then(() => logout())
      .catch(() => logout());
  }, [logout]);

  return (
    <div className={styles.h_right}>
      <Link to="/user/info" className={styles.h_name}>
        <span
          className={'iconfont icon-qiehuanyonghu ' + styles.usericon}
        ></span>
        <span>{user.useInfo.name}</span>
      </Link>
      <span
        title="退出登录"
        onClick={menuClick}
        className={'iconfont icon-tuichu ' + styles.out}
      ></span>
    </div>
  );
};

export default observer(Header);
