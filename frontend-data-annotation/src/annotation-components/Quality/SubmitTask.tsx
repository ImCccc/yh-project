import ModalForm, {
  FormItemListProps,
  ImperativeHandleProps,
} from '@/components/ModalForm';
import { ContentModal } from '@/pages/Layout/Content';
import { PackageServiceCommitQuality } from '@/services/dataAnnotation/PackageService';
import { modalConfirm } from '@/utils/util';
import { reviewDescribeRule } from '@/utils/verification';
import { Button, message } from 'antd';
import React, { useCallback, useRef } from 'react';
import { useNavigate } from 'react-router-dom';

const formItemList: FormItemListProps = [
  {
    name: 'describe',
    label: '审核意见',
    type: 'TextArea',
    rules: reviewDescribeRule,
    props: { placeholder: '请输入审核意见' },
  },
];

const Comp: React.FC<{ id: string }> = ({ id }) => {
  const navigate = useNavigate();
  const modalFormRef = useRef<ImperativeHandleProps>(null);
  const showModal = useCallback(() => modalFormRef.current?.showModal(), []);

  const allPass = useCallback(async () => {
    await modalConfirm('提交后子任务不可再质检, 确定要提交?');
    const params = { id, describe: '', is_pass: 1 };
    await PackageServiceCommitQuality(params);
    message.success('提交成功');
    navigate('/task/index');
  }, [id, navigate]);

  const onSubmit = useCallback(
    async ({ describe }: { describe: string }) => {
      const params = { id, describe, is_pass: 0 };
      await PackageServiceCommitQuality(params);
      message.success('提交成功');
      navigate('/task/index');
    },
    [id, navigate],
  );

  return (
    <>
      <ContentModal>
        <Button onClick={showModal} className="btn-mr">
          全部不通过
        </Button>
        <Button type="primary" onClick={allPass}>
          全部通过
        </Button>
      </ContentModal>
      <ModalForm
        title="审核意见"
        ref={modalFormRef}
        onSubmit={onSubmit}
        formItemList={formItemList}
      />
    </>
  );
};

export default Comp;
