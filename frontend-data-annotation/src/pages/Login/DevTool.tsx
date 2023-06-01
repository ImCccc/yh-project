import Select from '@/components/Select';
import {
  AUTHORITY_ADMIN,
  AUTHORITY_LEADER,
  AUTHORITY_MEMBER,
} from '@/config/constant';
import { AuthServiceLogin } from '@/services/dataAnnotation/AuthService';
import { useMobx } from '@/stores';
import { roleList } from '@/utils/globalData';
import { setToken, setUserInfo } from '@/utils/storage';
import { Button, Input } from 'antd';
import { observer } from 'mobx-react-lite';
import { useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getPassword } from '.';
import styles from './DevTool.module.less';

const defauleUseList = [
  {
    username: 'admin@qq.com',
    role_code: AUTHORITY_ADMIN,
  },
  {
    username: '635969862@qq.com',
    role_code: AUTHORITY_LEADER,
    password: '1234qwer',
  },
];

const getUseList = () => {
  const defVal = JSON.parse(JSON.stringify(defauleUseList));
  try {
    const val =
      JSON.parse(localStorage.getItem('__devTool_cache__') || '') || defVal;
    return val;
  } catch (error) {
    return defVal;
  }
};

const setUserListInlocalStorage = (list: any) => {
  localStorage.setItem('__devTool_cache__', JSON.stringify(list));
};

const isDev =
  location.hostname === 'localhost' || location.hostname === '10.55.132.187';

const Test: React.FC = () => {
  const User = useMobx('User');
  const navigate = useNavigate();
  const [userList, setUserList] = useState(getUseList());
  const [username, setusername] = useState<string>('@qq.com');
  const [password, setpassword] = useState<string>('1234qwer');
  const [role_code, setrole_code] = useState<string>(AUTHORITY_MEMBER);

  const adminList = useMemo(() => {
    return userList.filter((item: any) => item.role_code === AUTHORITY_ADMIN);
  }, [userList]);

  const leaderList = useMemo(() => {
    return userList.filter((item: any) => item.role_code === AUTHORITY_LEADER);
  }, [userList]);

  const memberList = useMemo(() => {
    return userList.filter((item: any) => item.role_code === AUTHORITY_MEMBER);
  }, [userList]);

  const login = async (item: any) => {
    try {
      const msg = await AuthServiceLogin({
        username: item.username,
        role_code: item.role_code,
        password: getPassword(item.password || '1234qwer'),
      });
      const useInfo = { ...msg, role: msg.role_codes[0] };
      setToken(msg.token);
      setUserInfo(useInfo);
      User.useInfo = useInfo;
      navigate('/');
    } catch (error) {}
  };

  const submit = () => {
    try {
      if (!username) return;
      userList.push({
        username,
        role_code,
        password: password || '1234qwer',
      });
      setusername('@qq.com');
      setpassword('1234qwer');
      setUserList([...userList]);
      setUserListInlocalStorage([...userList]);
    } catch (error) {}
  };

  const getJSX = (list: any, label: string) => {
    try {
      return (
        <div className={styles.flex}>
          <span>{label}:</span>
          <div>
            {list.map((item: any, index: any) => (
              <a
                key={index}
                className={styles.link}
                onClick={() => login(item)}
              >
                {item.username}
                <span
                  className={'iconfont icon-guanbi del ' + styles.x}
                  onClick={(e) => {
                    e.stopPropagation();
                    const _index = userList.findIndex((_item: any) => {
                      return (
                        item.username === _item.username &&
                        item.role_code === _item.role_code
                      );
                    });
                    userList.splice(_index, 1);
                    setUserList([...userList]);
                    setUserListInlocalStorage([...userList]);
                  }}
                ></span>
              </a>
            ))}
          </div>
        </div>
      );
    } catch (error) {}
    return <></>;
  };

  return isDev ? (
    <section className={styles.wrap}>
      {getJSX(adminList, '管理员')}
      {getJSX(leaderList, '队长')}
      {getJSX(memberList, '队员')}
      <div className={styles.addWrap}>
        <Input
          value={username}
          placeholder="输入邮箱"
          onChange={(e) => setusername(e.target.value)}
        />
        <Input
          value={password}
          placeholder="输入密码"
          onChange={(e) => setpassword(e.target.value)}
        />
        <Select
          size="small"
          clearIcon={false}
          showSearch={false}
          value={role_code}
          options={roleList}
          className={styles.w}
          onChange={(e) => setrole_code(e)}
        ></Select>
        <Button onClick={submit}>添加</Button>
      </div>
    </section>
  ) : (
    <></>
  );
};

export default observer(Test);
