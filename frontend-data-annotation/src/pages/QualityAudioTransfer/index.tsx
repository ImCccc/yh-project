import AudioTransfer from '@/annotation-components/AudioTransfer';
import Quality from '@/annotation-components/Quality';
import React from 'react';
import { formatTaskData } from '../MarkAudio';
// 去质检 - 音频转写
const Comp: React.FC = () => (
  <Quality formatData={formatTaskData} Component={AudioTransfer} />
);
export default Comp;
