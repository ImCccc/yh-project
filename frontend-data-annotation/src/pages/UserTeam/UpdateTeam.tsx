import ModalForm, {
  FormItemListProps,
  ImperativeHandleProps,
} from '@/components/ModalForm';
import {
  TeamServiceAdd,
  TeamServiceUpdate,
} from '@/services/dataAnnotation/TeamService';
import { ListProps } from '@/utils/globalData';
import {
  leaderRule,
  teamDescribeRule,
  teamNameRule,
} from '@/utils/verification';
import { Button, message } from 'antd';
import { useCallback, useMemo, useRef, useState } from 'react';
import { TeamInfoProps } from './Admin';

type CompProps = {
  isCreate?: boolean;
  teamInfo?: TeamInfoProps;
  userList?: ListProps[];
  successCallback: (isCreate?: boolean, info?: TeamInfoProps) => void;
};

const Comp: React.FC<CompProps> = ({
  isCreate,
  successCallback,
  teamInfo,
  userList,
}) => {
  const modalFormRef = useRef<ImperativeHandleProps>(null);
  const [initialValues, setInitialValues] = useState<Partial<TeamInfoProps>>();
  const initValue = useCallback(() => {
    setInitialValues({});
  }, []);

  // 提交表单
  const onSubmit = useCallback(
    async (data: ANNOTATION.dataAnnotationTeam) => {
      if (isCreate) {
        await TeamServiceAdd({ item: data });
        message.success('创建成功');
      } else {
        await TeamServiceUpdate({
          id: data.id,
          name: data.name,
          describe: data.describe,
        });
        message.success('编辑成功');
      }
      initValue();
      successCallback(isCreate, data);
    },
    [initValue, isCreate, successCallback],
  );

  const formItemList = useMemo<FormItemListProps>(() => {
    return [
      {
        name: 'name',
        label: '团队名称',
        rules: teamNameRule,
        props: { placeholder: '请输入团队名称' },
      },
      {
        name: 'leader_user_id',
        label: '选择队长',
        type: 'Select',
        rules: leaderRule,
        props: {
          placeholder: '请选择团队队长',
          disabled: !isCreate,
          options: userList,
          showSearch: true,
          optionFilterProp: 'children',
        },
      },
      {
        name: 'describe',
        label: '团队描述',
        type: 'TextArea',
        rules: teamDescribeRule,
        props: { placeholder: '请输入团队描述' },
      },
    ];
  }, [isCreate, userList]);

  return (
    <>
      <Button
        type="primary"
        onClick={() => {
          if (!isCreate && teamInfo) setInitialValues(teamInfo);
          modalFormRef.current?.showModal();
        }}
      >
        {isCreate ? '创建' : '编辑'}
      </Button>
      <ModalForm
        title={isCreate ? '创建团队' : '编辑团队'}
        ref={modalFormRef}
        onSubmit={onSubmit}
        onCancel={initValue}
        formItemList={formItemList}
        initialValues={initialValues}
        formProps={{ labelCol: { span: 4 } }}
      />
    </>
  );
};

export default Comp;
