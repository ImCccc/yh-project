import { LabelSetServicePage } from '@/services/dataAnnotation/LabelSetService';
import {
  LABEL_COMMON,
  LABEL_INTENT,
  LABEL_SLOT,
  ListProps,
} from '@/utils/globalData';
import { useEffect, useMemo, useState } from 'react';

const params = {
  type: 0,
  name: '',
  is_total: 1,
  page_index: 0,
  page_size: 10000,
};

function useLabel() {
  const [allList, setAllList] = useState<ANNOTATION.dataAnnotationLabelSet[]>(
    [],
  );

  useEffect(() => {
    LabelSetServicePage(params).then(({ list }) => {
      list && list[0] && setAllList(list);
    });
  }, []);

  const labelList = useMemo(() => {
    const commonList: ListProps[] = [];
    const intentList: ListProps[] = [];
    const slotList: ListProps[] = [];
    allList.forEach((label) => {
      const item = { label: label.name, value: label.id };
      if (label.type === LABEL_COMMON) commonList.push(item);
      if (label.type === LABEL_INTENT) intentList.push(item);
      if (label.type === LABEL_SLOT) slotList.push(item);
    });
    return {
      slotList,
      commonList,
      intentList,
    };
  }, [allList]);

  return labelList;
}

export default useLabel;
