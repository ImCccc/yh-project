import ModalForm, { FormItemListProps } from '@/components/ModalForm';
import {
  AUTHORITY_ADMIN,
  AUTHORITY_LEADER,
  AUTHORITY_MEMBER,
} from '@/config/constant';
import {
  UserServiceAdd,
  UserServiceUpdate,
} from '@/services/dataAnnotation/UserService';
import { useMobx } from '@/stores';
import {
  emailRule,
  getConfirmPasswordRule,
  passwordRule,
  requiredRule,
  userNameRule,
} from '@/utils/verification';
import { message } from 'antd';
import { observer } from 'mobx-react-lite';
import { useCallback } from 'react';
import { getPassword } from '../Login';

const formItemListCreate: FormItemListProps = [
  {
    name: 'name',
    label: '用户名',
    rules: userNameRule,
    props: { placeholder: '请输入用户名' },
  },
  {
    name: 'role_code',
    label: '角色',
    rules: requiredRule,
    props: { placeholder: '请输入角色', disabled: true },
  },
  {
    name: 'email',
    label: '邮箱',
    rules: emailRule,
    props: {
      placeholder: '请输入邮箱',
    },
  },
  {
    name: 'password',
    label: '用户密码',
    rules: passwordRule,
    type: 'Password',
    props: {
      placeholder: '请输入用户密码',
      autoComplete: 'new-password',
      // onCopy: (e: any) => {
      //   e.preventDefault();
      //   return false;
      // },
    },
  },
  {
    name: 'confirmPassword',
    label: '确认密码',
    rules: getConfirmPasswordRule(
      'password',
      '两次输入的密码不一致，请重新输入',
    ),
    type: 'Password',
    props: {
      placeholder: '请再次输入用户密码',
      // onCopy: (e: any) => {
      //   e.preventDefault();
      //   return false;
      // },
    },
  },
];

const formItemListChange: FormItemListProps = [
  {
    name: 'name',
    label: '用户名',
    rules: userNameRule,
    props: { placeholder: '请输入用户名' },
  },
  {
    name: 'role_code',
    label: '角色',
    rules: requiredRule,
    props: { placeholder: '请输入角色', disabled: true },
  },
  {
    name: 'email',
    label: '邮箱',
    rules: emailRule,
    props: { placeholder: '请输入邮箱', disabled: true },
  },
];

const formItemListChangePassword: FormItemListProps = [
  {
    name: 'name',
    label: '用户名',
    rules: userNameRule,
    props: { placeholder: '请输入用户名', disabled: true },
  },
  {
    name: 'role_code',
    label: '角色',
    rules: requiredRule,
    props: { placeholder: '请输入角色', disabled: true },
  },
  {
    name: 'email',
    label: '邮箱',
    rules: emailRule,
    props: { placeholder: '请输入邮箱', disabled: true },
  },
  {
    name: 'new_password',
    label: '用户密码',
    type: 'Password',
    rules: passwordRule,
    props: {
      placeholder: '请输入用户的新密码',
      autoComplete: 'new-password',
      // onCopy: (e: any) => {
      //   e.preventDefault();
      //   return false;
      // },
    },
  },
  {
    name: 'confirmPassword',
    label: '确认密码',
    rules: getConfirmPasswordRule(
      'new_password',
      '两次输入的密码不一致，请重新输入',
    ),
    type: 'Password',
    props: {
      placeholder: '请再次输入用户的新密码',
      // onCopy: (e: any) => {
      //   e.preventDefault();
      //   return false;
      // },
    },
  },
];

type Props = {
  modalState: string;
  initialValues: Record<string, unknown>;
  modalFormRef: any;
  tableRef1: any;
  tableRef2: any;
};

const Comp: React.FC<Props> = ({
  modalState,
  initialValues,
  modalFormRef,
  tableRef1,
  tableRef2,
}) => {
  const userInfo = useMobx('User').thisUserInfo;

  const onSubmit = useCallback(
    async (data: any) => {
      if (data.role_code === '管理员') {
        data.role_code = AUTHORITY_ADMIN;
      } else if (data.role_code === '队长') {
        data.role_code = AUTHORITY_LEADER;
      } else if (data.role_code === '队员') {
        data.role_code = AUTHORITY_MEMBER;
      }
      if (modalState === '创建用户') {
        data['create_username'] = userInfo.name;
        data['create_user'] = userInfo.user_id;
        data['password'] = getPassword(data.password);
        await UserServiceAdd({ item: data });
        message.success('创建成功');
        tableRef1.current?.refresh();
        tableRef2.current?.refresh();
      } else if (modalState === '修改用户') {
        await UserServiceUpdate(data);
        message.success('修改成功');
        tableRef1.current?.refresh();
        tableRef2.current?.refresh();
      } else if (modalState === '修改密码') {
        data['new_password'] = getPassword(data.new_password);
        await UserServiceUpdate(data);
        message.success('修改成功');
        tableRef1.current?.refresh();
        tableRef2.current?.refresh();
      }
    },
    [modalState, tableRef1, tableRef2, userInfo.name, userInfo.user_id],
  );

  return (
    <ModalForm
      title={modalState}
      ref={modalFormRef}
      onSubmit={onSubmit}
      formProps={{ labelCol: { span: 4 } }}
      initialValues={initialValues}
      formItemList={
        modalState === '创建用户'
          ? formItemListCreate
          : modalState === '修改用户'
          ? formItemListChange
          : formItemListChangePassword
      }
    />
  );
};

export default observer(Comp);
