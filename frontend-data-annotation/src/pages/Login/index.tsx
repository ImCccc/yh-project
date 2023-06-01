import { AUTHORITY_ADMIN } from '@/config/constant';
import { AuthServiceLogin } from '@/services/dataAnnotation/AuthService';
import { useMobx } from '@/stores';
import { roleList } from '@/utils/globalData';
import {
  getLoginInfo,
  setLoginInfo,
  setToken,
  setUserInfo,
} from '@/utils/storage';
import { isEmail, isPassword, passwordFormatTips } from '@/utils/verification';
import { Button, Checkbox, Input, Radio } from 'antd';
import classNames from 'classnames';
import { MD5 } from 'crypto-js';
import { observer } from 'mobx-react-lite';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import DevTool from './DevTool';
import EyeIcon from './EyeIcon';
import ForgotPassword from './ForgotPassword';
import styles from './index.module.less';

export const checkEmail = (email: string) => {
  if (!email) {
    return '请输入邮箱';
  }
  if (!isEmail(email)) {
    return '邮箱格式不正确';
  }
  return true;
};

export const checkPassword = (password: string) => {
  if (!password) {
    return '请输入密码';
  }
  if (!isPassword(password)) {
    return passwordFormatTips;
  }
  return true;
};

export const getPassword = (value: any) => MD5(value).toString();

let loginInfo = getLoginInfo();

const Login: React.FC = () => {
  const User = useMobx('User');
  const navigate = useNavigate();
  const [agree, setAgree] = useState<boolean>(true);
  const [isLoginPage, setIsLoginPage] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [remember, setRemember] = useState<boolean>(loginInfo.remember);
  const [password, setPasseord] = useState<string>(loginInfo.password);
  const [username, setUsername] = useState<string>(loginInfo.username);
  const [roleCode, setRoleCode] = useState<string>(loginInfo.roleCode);

  const [errorInfo, setErrorInfo] = useState<{
    roleCode?: string | boolean;
    password?: string | boolean;
    username?: string | boolean;
  }>({});

  const handleSubmit = async () => {
    const _errorInfo = {
      username: checkEmail(username),
      password: checkPassword(password),
    };

    setErrorInfo(_errorInfo);
    if (_errorInfo.password !== true || _errorInfo.username !== true) return;

    try {
      setLoading(true);
      const msg = await AuthServiceLogin({
        username,
        role_code: roleCode,
        password: getPassword(password),
      });
      if (msg.code === 0) {
        const useInfo = { ...msg, role: msg.role_codes[0] };
        loginInfo = remember
          ? { remember, username, password, roleCode }
          : { remember, username: '', password: '', roleCode: AUTHORITY_ADMIN };
        setLoading(false);
        setToken(msg.token);
        setUserInfo(useInfo);
        setLoginInfo(loginInfo);
        User.useInfo = useInfo;
        navigate('/');
      }
    } catch (error) {
      setLoading(false);
    }
  };

  return (
    <div className={styles.container}>
      <DevTool />
      <div className={styles.bg}></div>
      <div className={classNames({ hide: !isLoginPage })}>
        <div className={styles.title}>欢迎登录盈合标注平台</div>
        <span className={styles.label}>角色</span>
        <Radio.Group
          className={styles.radio}
          options={roleList}
          onChange={(code) => setRoleCode(code.target.value)}
          value={roleCode}
        ></Radio.Group>
        <div className={styles.col}>
          <span className={styles.label}>邮箱</span>
          <Input
            value={username}
            className={styles.input}
            placeholder="请输入邮箱"
            onChange={(e) => {
              setUsername(e.target.value);
              setErrorInfo({
                ...errorInfo,
                username: checkEmail(e.target.value),
              });
            }}
          />
          <span className={classNames('err-info', styles.err)}>
            {errorInfo.username}
          </span>
        </div>
        <div className={classNames(styles.col)}>
          <span className={styles.label}>密码</span>
          <Input
            type={showPassword ? '' : 'password'}
            value={password}
            autoComplete="new-password"
            placeholder="请输入密码"
            className={styles.input}
            onChange={(e) => {
              setPasseord(e.target.value);
              setErrorInfo({
                ...errorInfo,
                password: checkPassword(e.target.value),
              });
            }}
          />
          <span className={classNames('err-info', styles.err)}>
            {errorInfo.password}
          </span>
          <EyeIcon
            showPassword={showPassword}
            onChange={() => setShowPassword(!showPassword)}
          />
        </div>
        <div className="flex-between">
          <Checkbox
            checked={remember}
            onChange={(e) => setRemember(e.target.checked)}
          >
            <span className="f-small">记住密码</span>
          </Checkbox>
          <Button type="link" onClick={() => setIsLoginPage(false)}>
            <span className="f-small">忘记密码</span>
          </Button>
        </div>
        <Button
          type="primary"
          disabled={!agree}
          loading={loading}
          onClick={handleSubmit}
          className={classNames(styles.button, styles.mt, styles.large)}
        >
          登录
        </Button>
        <span className={styles.agree}>
          <Checkbox
            checked={agree}
            onChange={(e) => setAgree(e.target.checked)}
          ></Checkbox>
          {'  请阅读并接受'}
          <a
            target="_blank"
            href="https://minio.dev.inrobot.cloud/data-annotation/protocal/agreement.html"
            rel="noreferrer"
          >
            《用户协议》
          </a>
          及
          <a
            target="_blank"
            href="https://minio.dev.inrobot.cloud/data-annotation/protocal/privacy.html"
            rel="noreferrer"
          >
            《隐私协议》
          </a>
        </span>
      </div>
      <ForgotPassword
        back={() => setIsLoginPage(true)}
        isLoginPage={isLoginPage}
      />
    </div>
  );
};

export default observer(Login);
