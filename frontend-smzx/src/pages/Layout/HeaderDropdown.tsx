import { IAMLogout } from '@/services/platform/IAM';
import { UserMgrUserInfo } from '@/services/platform/UserMgr';
import { clientSSO } from '@infore/utils';
import { Avatar, Dropdown, Menu } from 'antd';
import { useCallback, useEffect, useState } from 'react';
import styles from './index.module.less';

const dropdownItems = [{ key: '1', label: '退出登录' }];

const Header: React.FC = () => {
  // const navigate = useNavigate();

  const [curUser, setCurUser] = useState<Partial<PLATFORM.platformIamUserInfo>>(
    { image_url: '', nick_name: '' },
  );

  useEffect(() => {
    UserMgrUserInfo({ user_id: '' }).then((data) =>
      setCurUser(data?.user_info),
    );
  }, []);

  const logoutCallback = useCallback(() => {
    // clearLocalStorage();
    // navigate(LOGIN_PATH);
    clientSSO.logout();
    clientSSO.gotoLoginPage();
  }, []);

  const onMenuClick = useCallback(() => {
    IAMLogout({})
      .then(() => logoutCallback())
      .catch(() => logoutCallback());
  }, [logoutCallback]);

  return (
    <Dropdown
      placement="bottom"
      overlay={<Menu onClick={onMenuClick} items={dropdownItems} />}
    >
      <div className={styles.h_right}>
        <Avatar alt="avatar" size="small" src={curUser.image_url} />
        <span className={styles.h_name}>{curUser.nick_name}</span>
      </div>
    </Dropdown>
  );
};

export default Header;
