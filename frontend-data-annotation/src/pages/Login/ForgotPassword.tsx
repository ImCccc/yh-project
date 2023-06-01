import {
  UserServiceForgetPassword,
  UserServiceVerificationCode,
} from '@/services/dataAnnotation/UserService';
import { Button, Input, message } from 'antd';
import classNames from 'classnames';
import { useCallback, useState } from 'react';
import { checkEmail, checkPassword, getPassword } from '.';
import EyeIcon from './EyeIcon';
import styles from './index.module.less';

const checkCode = (code: string) => {
  if (!code) {
    return '请输入验证码';
  }
  return true;
};

const checkConfirmPassword = (confirmPassword: string, password: string) => {
  if (!confirmPassword) return '请输入确认密码';
  if (!password) return true;
  if (confirmPassword !== password) return '两次输入的密码不一致，请重新输入';
  return true;
};

const Login: React.FC<{
  isLoginPage: boolean;
  back: () => void;
}> = ({ isLoginPage, back }) => {
  const [password, setPasseord] = useState<string>('');
  const [username, setUsername] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [code, setCode] = useState<string>('');
  const [confirmPassword, setConfirmPassword] = useState<string>('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [errorInfo, setErrorInfo] = useState<{
    code?: string | boolean;
    confirmPassword?: string | boolean;
    password?: string | boolean;
    username?: string | boolean;
  }>({});

  const handleSubmit = async () => {
    const _errorInfo = {
      code: checkCode(code),
      username: checkEmail(username),
      password: checkPassword(password),
      confirmPassword: checkConfirmPassword(confirmPassword, password),
    };
    setErrorInfo(_errorInfo);
    if (
      _errorInfo.password !== true ||
      _errorInfo.username !== true ||
      _errorInfo.code !== true ||
      _errorInfo.confirmPassword !== true
    ) {
      return;
    }

    try {
      setLoading(true);
      await UserServiceForgetPassword({
        email: username,
        verification_code: code,
        password: getPassword(password),
      });
      setLoading(false);
      message.success('密码修改成功！');
      back();
    } catch (error) {
      setLoading(false);
    }
  };

  const sendCode = useCallback(async () => {
    const rs = checkEmail(username);
    setErrorInfo({ ...errorInfo, username: rs });
    if (rs !== true) return;
    await UserServiceVerificationCode({ email: username });
    message.success('验证码已发送到邮箱');
  }, [errorInfo, username]);

  return (
    <div className={classNames({ hide: isLoginPage })}>
      <div className={styles.title}>重置密码</div>
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
      <div className={styles.col}>
        <span className={styles.label}>验证码</span>
        <Input
          value={code}
          maxLength={8}
          className={styles.input}
          placeholder="请输入验证码"
          onChange={(e) => {
            setCode(e.target.value);
            setErrorInfo({
              ...errorInfo,
              code: checkCode(e.target.value),
            });
          }}
        />
        <Button onClick={sendCode} className={styles.send} type="link">
          发送验证码
        </Button>
        <span className={classNames('err-info', styles.err)}>
          {errorInfo.code}
        </span>
      </div>
      <div className={classNames(styles.col)}>
        <span className={styles.label}>新密码</span>
        <Input
          type={showPassword ? '' : 'password'}
          value={password}
          className={styles.input}
          placeholder="请输入用户的新密码"
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
      <div className={classNames(styles.col)}>
        <span className={styles.label}>确认密码</span>
        <Input
          type={showConfirmPassword ? '' : 'password'}
          className={styles.input}
          value={confirmPassword}
          placeholder="请再次输入用户的新密码"
          onChange={(e) => {
            setConfirmPassword(e.target.value);
            setErrorInfo({
              ...errorInfo,
              confirmPassword: checkConfirmPassword(e.target.value, password),
            });
          }}
        />
        <span className={classNames('err-info', styles.err)}>
          {errorInfo.confirmPassword}
        </span>
        <EyeIcon
          showPassword={showConfirmPassword}
          onChange={() => setShowConfirmPassword(!showConfirmPassword)}
        />
      </div>
      <div className={styles.btnBox}>
        <Button
          onClick={back}
          className={classNames(styles.button, styles.small)}
        >
          返回登录
        </Button>
        <Button
          type="primary"
          loading={loading}
          onClick={handleSubmit}
          className={classNames(styles.button, styles.small)}
        >
          确定
        </Button>
      </div>
    </div>
  );
};

export default Login;
