import Annotation from '@/annotation-components/AudioAnnotation';
import Mark from '@/annotation-components/Mark';
import { AUDIO_CLASS } from '@/utils/globalData';
import { useMemo } from 'react';
import { useParams } from 'react-router-dom';

export const formatTaskData = (item: any) => ({
  name: item.name, // 样本名称
  id: item.sample_id,
  result: item.result, // 标注结果
  audioUrl: item.context, // 音频地址
  serialNo: `${item.sample_sequence}`, // 样本序号
});

export const useIsAudioClass = () => {
  const params = useParams();
  // 音频分类不需要音频内容字段
  const isAudioClass = useMemo(
    () => (params.type ? +params.type === AUDIO_CLASS : false),
    [params.type],
  );
  return isAudioClass;
};

// 去标注 - 音频分类 11 / 音频分割 13
const Comp: React.FC = () => (
  <Mark
    hideText={useIsAudioClass()}
    formatData={formatTaskData}
    Component={Annotation}
  />
);

export default Comp;
