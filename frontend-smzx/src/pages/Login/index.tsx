import { IAMLogin } from '@/services/platform/IAM';
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { Button, Input, message } from 'antd';
import classNames from 'classnames';
import { MD5 } from 'crypto-js';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './index.module.less';

const getRedirectPath = () => {
  const path = location.hash.split('redirect=')[1];
  return path ? decodeURIComponent(path) : '/';
};

const getPassword = (value: any) => {
  const salt: any = MD5(value.slice(0, 6));
  return MD5(''.concat(value).concat(salt)).toString();
};

const Login: React.FC = () => {
  const navigate = useNavigate();

  const [password, setPasseord] = useState<string>('');
  const [username, setUsername] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);

  const handleSubmit = async () => {
    if (!username) return message.error('请输入账号');
    if (!password) return message.error('请输入密码');

    const params = {
      username,
      device: 'web',
      login_method: 0,
      password: getPassword(password),
    };

    try {
      setLoading(true);
      const msg = await IAMLogin(params);
      if (msg.code === 0) {
        // setToken(msg.token);
        setLoading(false);
        message.success('登录成功！');
        navigate(getRedirectPath());
      }
    } catch (error) {
      setLoading(false);
      message.error('登录失败，请重试！');
    }
  };

  return (
    <div className={styles.container}>
      <div>
        <h1 className={classNames(styles.title, styles.mbottom)}>
          工展馆总控系统
        </h1>
        <Input
          size="large"
          value={username}
          placeholder="请输入账号"
          prefix={<UserOutlined />}
          className={styles.mbottom}
          onChange={(e) => setUsername(e.target.value)}
        />
        <Input
          size="large"
          type="password"
          value={password}
          placeholder="请输入密码"
          prefix={<LockOutlined />}
          className={styles.mbottom}
          onChange={(e) => setPasseord(e.target.value)}
        />
        <Button
          type="primary"
          size="large"
          loading={loading}
          onClick={handleSubmit}
          className={classNames(styles.button)}
        >
          登录
        </Button>
        <div className={styles.version}>工展馆总控系统版本V1.1.3</div>
      </div>
    </div>
  );
};

export default Login;
