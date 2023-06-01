import Annotation from '@/annotation-components/AudioAnnotation';
import Verify from '@/annotation-components/Verify';
import { formatTaskData, useIsAudioClass } from '../MarkAudio';
// 去质检 - 音频分类 11 / 音频分割 13
const Comp: React.FC = () => (
  <Verify
    hideText={useIsAudioClass()}
    formatData={formatTaskData}
    Component={Annotation}
  />
);
export default Comp;
