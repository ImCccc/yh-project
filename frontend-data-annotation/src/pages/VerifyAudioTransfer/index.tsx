import AudioTransfer from '@/annotation-components/AudioTransfer';
import Verify from '@/annotation-components/Verify';
import React from 'react';
import { formatTaskData } from '../MarkAudio';
// 去质检 - 音频转写
const Comp: React.FC = () => (
  <Verify formatData={formatTaskData} Component={AudioTransfer} />
);
export default Comp;
