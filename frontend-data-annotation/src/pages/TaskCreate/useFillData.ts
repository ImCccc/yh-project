import { TaskServiceGet } from '@/services/dataAnnotation/TaskService';
import {
  AUDIO_CLASS,
  AUDIO_DIVISION,
  AUDIO_TRANSCRIPTION,
  FALST_VALUE,
  LABEL_COMMON,
  LABEL_INTENT,
  LABEL_SLOT,
  TEXT_CLASS,
} from '@/utils/globalData';
import { useEffect } from 'react';
import { useParams, useSearchParams } from 'react-router-dom';

function useFillData(callback: (data: any, taskId?: string) => void) {
  const params = useParams();
  const [searchParams] = useSearchParams();

  useEffect(() => {
    const data_id = searchParams.get('dataId');
    const markType = +(searchParams.get('markType') || '');

    const defaultData = {
      name: '',
      describe: '',
      data_id: null,
      labelIntent: null,
      labelSlot: null,
      labelCommon: [],
      mark_team_id: null,
      quality_team_id: null,
      quality_rate: null,
      need_finish_time: null,
      isAudioType: true,
      is_quality: FALST_VALUE,
      markTypeText: TEXT_CLASS,
      markTypeAudio: AUDIO_CLASS,
    };

    if (data_id && markType) {
      const isAudioType =
        markType === AUDIO_DIVISION ||
        markType === AUDIO_CLASS ||
        markType === AUDIO_TRANSCRIPTION;
      return callback({
        ...defaultData,
        data_id,
        isAudioType,
        markTypeAudio: isAudioType ? markType : AUDIO_CLASS,
        markTypeText: !isAudioType ? markType : TEXT_CLASS,
      });
    }

    if (!params.id) return callback(defaultData);

    TaskServiceGet({ id: params.id }).then(({ item }) => {
      const mark_team_id = (item.mark_team || { id: '' }).id;
      const quality_team_id = (item.quality_team || { id: '' }).id;
      const need_finish_time = +item.need_finish_time;
      const is_quality = item.is_quality ?? 0;
      const quality_rate = item.quality_rate ?? 0;
      const describe = item.describe ?? '';
      const data_id = item.data_id;
      const markType = item.mark_type;

      const isAudioType =
        markType === AUDIO_DIVISION ||
        markType === AUDIO_CLASS ||
        markType === AUDIO_TRANSCRIPTION;

      const labels = item.label_sets || [];
      const labelSlot = labels.reduce((label, cur) => {
        return cur.type === LABEL_SLOT ? cur.id : label;
      }, '');

      const labelIntent = labels.reduce((label, cur) => {
        return cur.type === LABEL_INTENT ? cur.id : label;
      }, '');

      const labelCommon = labels.reduce((labels, cur) => {
        if (cur.type === LABEL_COMMON) labels.push(cur.id);
        return labels;
      }, [] as string[]);

      const formData = {
        name: '',
        data_id,
        describe,
        is_quality,
        quality_rate,
        need_finish_time,
        mark_team_id,
        quality_team_id,
        isAudioType,
        labelIntent,
        labelCommon,
        labelSlot,
        markTypeAudio: isAudioType ? markType : AUDIO_CLASS,
        markTypeText: !isAudioType ? markType : TEXT_CLASS,
      };

      callback(formData, params.id);
    });
  }, [callback, params.id, searchParams]);
}

export default useFillData;
