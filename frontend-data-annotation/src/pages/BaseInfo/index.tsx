import { UserServiceUpdateSelf } from '@/services/dataAnnotation/UserService';
import { useMobx } from '@/stores';
import { roleMapText } from '@/utils/globalData';
import {
  getConfirmPasswordRule,
  newPasswordRule,
  oldPasswordRule,
  userNameRule,
} from '@/utils/verification';
import { Button, Form, FormInstance, Input, message } from 'antd';
import { observer } from 'mobx-react-lite';
import { createRef, useEffect, useMemo, useState } from 'react';
import { getPassword } from '../Login';
import styles from './index.module.less';

type FieldValuesProps = {
  id: string;
  name: string;
  role: string;
  email: string;
  oldPassword: string;
  newPassword: string;
  confirmPassword: string;
};

const labelCol = { span: 5 };
const wrapperCol = { offset: 8 };

const Comp: React.FC = () => {
  const User = useMobx('User');
  const formRef = createRef<FormInstance<FieldValuesProps>>();
  const [fieldValues, setFieldValues] = useState<FieldValuesProps>();
  const onFinish = async (values: FieldValuesProps) => {
    const params = {
      id: fieldValues?.id || '',
      name: values.name,
      new_password: '',
      cur_password: '',
    };
    if (values.newPassword) {
      params.new_password = getPassword(values.newPassword);
      params.cur_password = getPassword(values.oldPassword);
    }
    await UserServiceUpdateSelf(params);
    message.success('修改成功');
    User.setInfoField({ name: params.name });
  };

  useEffect(() => {
    const useInfo = User.useInfo;
    setFieldValues({
      id: useInfo.user_id,
      name: useInfo.name,
      role: roleMapText[useInfo.role],
      email: useInfo.email,
      oldPassword: '',
      newPassword: '',
      confirmPassword: '',
    });
  }, [User.useInfo]);

  const valuesChange = (
    _: Partial<FieldValuesProps>,
    allValues: FieldValuesProps,
  ) => {
    setFieldValues({
      ...fieldValues,
      ...allValues,
    });
    if (
      !allValues.confirmPassword &&
      !allValues.newPassword &&
      !allValues.oldPassword
    ) {
      // 触发校验，清除错误样式
      formRef.current?.validateFields();
    }
  };
  const rules = useMemo(() => {
    const oldPassword = fieldValues?.oldPassword;
    const newPassword = fieldValues?.newPassword;
    const confirmPassword = fieldValues?.confirmPassword;
    if (!oldPassword && !newPassword && !confirmPassword) {
      return {
        oldPassword: [],
        newPassword: [],
        confirmPassword: [],
      };
    }
    return {
      oldPassword: oldPasswordRule,
      newPassword: newPasswordRule,
      confirmPassword: getConfirmPasswordRule('newPassword'),
    };
  }, [fieldValues]);

  return (
    <div className="page-padding">
      <div className={styles.container}>
        {fieldValues && (
          <Form
            ref={formRef}
            colon={false}
            scrollToFirstError
            labelCol={labelCol}
            onFinish={onFinish}
            className={styles.form}
            initialValues={fieldValues}
            onValuesChange={valuesChange}
          >
            <Form.Item name="name" label="用户名" rules={userNameRule}>
              <Input placeholder="请输入用户名" />
            </Form.Item>
            <Form.Item name="role" label="角色">
              <Input disabled />
            </Form.Item>
            <Form.Item name="email" label="邮箱/登录账户">
              <Input disabled />
            </Form.Item>
            <Form.Item
              label="旧密码"
              name="oldPassword"
              rules={rules.oldPassword}
            >
              <Input.Password
                autoComplete="new-password"
                placeholder="请输入旧密码"
              />
            </Form.Item>
            <Form.Item
              label="新密码"
              name="newPassword"
              rules={rules.newPassword}
            >
              <Input.Password placeholder="请输入用户的新密码" />
            </Form.Item>
            <Form.Item
              name="confirmPassword"
              label="确认密码"
              rules={rules.confirmPassword}
            >
              <Input.Password placeholder="请再次输入用户的新密码" />
            </Form.Item>
            <Form.Item wrapperCol={wrapperCol}>
              <Button
                type="primary"
                htmlType="submit"
                className={styles.submit}
              >
                修改
              </Button>
            </Form.Item>
          </Form>
        )}
      </div>
    </div>
  );
};

export default observer(Comp);
