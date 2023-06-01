import ModalForm, {
  FormItemListProps,
  ImperativeHandleProps,
} from '@/components/ModalForm';
import { ContentModal } from '@/pages/Layout/Content';
import useTeam from '@/pages/TaskCreate/useTeam';
import {
  TaskServiceAccept,
  TaskServiceGet,
} from '@/services/dataAnnotation/TaskService';
import { modalConfirm } from '@/utils/util';
import { markTeamRule, qualityTeamRule } from '@/utils/verification';
import { Button, message } from 'antd';
import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import { useNavigate } from 'react-router-dom';

const Comp: React.FC<{ id: string }> = ({ id }) => {
  const { teamList } = useTeam();
  const navigate = useNavigate();
  const modalFormRef = useRef<ImperativeHandleProps>(null);
  const [isQuality, setIsQuality] = useState(false);

  const [initialValues, setInitialValues] = useState<{
    quality_team_id?: string;
    mark_team_id?: string;
  }>();

  const formItemList = useMemo(() => {
    const list: FormItemListProps = [
      {
        name: 'mark_team_id',
        label: '标注团队',
        type: 'Select',
        rules: markTeamRule,
        props: {
          placeholder: '请选择标注团队',
          options: teamList,
        },
      },
    ];

    if (isQuality) {
      list.push({
        name: 'quality_team_id',
        label: '质检团队',
        type: 'Select',
        rules: qualityTeamRule,
        props: {
          placeholder: '请选择质检团队',
          options: teamList,
        },
      });
    }
    return list;
  }, [isQuality, teamList]);

  const showModal = useCallback(() => {
    modalFormRef.current?.showModal();
  }, []);

  const allPass = useCallback(async () => {
    await modalConfirm('确定验收通过?');
    await TaskServiceAccept({
      id,
      describe: '',
      mark_team_id: '',
      quality_team_id: '',
      is_accept: true,
    });
    message.success('提交成功');
    navigate('/task/index');
  }, [id, navigate]);

  const unPass = useCallback(
    async ({ mark_team_id, quality_team_id }: any) => {
      await TaskServiceAccept({
        id,
        describe: '',
        mark_team_id,
        quality_team_id,
        is_accept: false,
      });
      message.success('提交成功');
      navigate('/task/index');
    },
    [id, navigate],
  );

  useEffect(() => {
    if (!id) return;
    TaskServiceGet({ id }).then(({ item }) => {
      const { is_quality, quality_team, mark_team } = item;
      const values = { quality_team_id: '', mark_team_id: '' };
      if (is_quality && quality_team) values.quality_team_id = quality_team.id;
      if (mark_team) values.mark_team_id = mark_team.id;
      setIsQuality(!!is_quality);
      setInitialValues(values);
    });
  }, [id]);

  return (
    <>
      <ContentModal>
        <Button onClick={showModal} className="btn-mr">
          不通过
        </Button>
        <Button type="primary" onClick={allPass}>
          通过
        </Button>
      </ContentModal>
      <ModalForm
        onSubmit={unPass}
        ref={modalFormRef}
        formItemList={formItemList}
        initialValues={initialValues}
        title="验收不通过，请选择团队重新标注"
      />
    </>
  );
};

export default Comp;
