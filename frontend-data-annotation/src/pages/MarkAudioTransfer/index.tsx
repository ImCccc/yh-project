import AudioTransfer from '@/annotation-components/AudioTransfer';
import Mark from '@/annotation-components/Mark';
import React from 'react';
import { formatTaskData } from '../MarkAudio';
// 去标注 - 音频转写
const Comp: React.FC = () => (
  <Mark formatData={formatTaskData} Component={AudioTransfer} />
);
export default Comp;
