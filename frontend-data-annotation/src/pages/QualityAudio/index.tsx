import Annotation from '@/annotation-components/AudioAnnotation';
import Quality from '@/annotation-components/Quality';
import { formatTaskData, useIsAudioClass } from '../MarkAudio';
// 去质检 - 音频分类 11 / 音频分割 13
const Comp: React.FC = () => (
  <Quality
    hideText={useIsAudioClass()}
    formatData={formatTaskData}
    Component={Annotation}
  />
);
export default Comp;
