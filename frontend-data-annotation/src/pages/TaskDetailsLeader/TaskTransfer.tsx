import ModalForm, {
  FormItemListProps,
  ImperativeHandleProps,
} from '@/components/ModalForm';
import { JobServiceTransfer } from '@/services/dataAnnotation/JobService';
import { MemberServicePage } from '@/services/dataAnnotation/MemberService';
import {
  JOB_TYPE_ANNOTATION,
  ListProps,
  PAGE_PARAMS,
} from '@/utils/globalData';
import { message } from 'antd';
import React, { useEffect, useMemo, useRef, useState } from 'react';
import { DetailProps } from './useTaskData';

export type RowProps = {
  packageId: string;
  userId: string;
};

type CompProps = {
  detail: DetailProps;
  success?: () => void;
  row?: RowProps;
};

const Comp: React.FC<CompProps> = ({ detail, row, success }) => {
  const modalFormRef = useRef<ImperativeHandleProps>(null);

  // 团队成员列表
  const teamId = useMemo(() => {
    return detail.type === JOB_TYPE_ANNOTATION
      ? detail.mark_team?.id
      : detail.quality_team?.id;
  }, [detail]);

  // 团队成员列表
  const [teamList, setTeamList] = useState<ListProps[]>();
  useEffect(() => {
    if (!teamId) return;
    MemberServicePage({ ...PAGE_PARAMS, team_id: teamId }).then(({ list }) =>
      setTeamList(
        list.map((item) => ({
          label: `${item.name}(${item.email})`,
          value: item.id,
        })),
      ),
    );
  }, [teamId]);

  const formItemList = useMemo<FormItemListProps>(
    () => [
      {
        name: 'user_id',
        type: 'Select',
        label: '移交人员',
        rules: [{ required: true, message: '请选择移交人员!' }],
        props: {
          placeholder: '请选择移交人员',
          options: teamList?.filter((item) => item.value !== row?.userId) || [],
        },
      },
    ],
    [row?.userId, teamList],
  );

  const onSubmit = async (data: any) => {
    if (!row) return;
    const params = {
      ...data,
      job_type: detail.type,
      package_id: row.packageId,
    };
    await JobServiceTransfer(params);
    message.success('移交成功');
    success && success();
  };

  useEffect(() => {
    row && modalFormRef.current?.showModal();
  }, [row]);

  return (
    <ModalForm
      title="任务移交"
      ref={modalFormRef}
      onSubmit={onSubmit}
      formItemList={formItemList}
    />
  );
};

export default React.memo(Comp);
