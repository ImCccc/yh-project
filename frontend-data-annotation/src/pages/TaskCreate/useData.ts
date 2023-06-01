import { DataServicePage } from '@/services/dataAnnotation/DataService';
import {
  DATATYPE_AUDIO,
  DATATYPE_GENERICS,
  DATATYPE_TEXT,
  INTENT_SLOT,
  ListProps,
  TEXT_CLASS,
  TEXT_GENERALIZATION,
} from '@/utils/globalData';
import { useEffect, useMemo, useState } from 'react';

const params = {
  type: 0,
  name: '',
  is_total: 1,
  page_index: 0,
  page_size: 10000,
};

// let index = 1;
// const mockData: any = [
//   { name: '文本分类1', type: TEXT_CLASS, id: index++ + '' },
//   { name: '文本分类2', type: TEXT_CLASS, id: index++ + '' },
//   { name: '文本分类3', type: TEXT_CLASS, id: index++ + '' },
//   { name: '意图/槽位2', type: INTENT_SLOT, id: index++ + '' },
//   { name: '意图/槽位3', type: INTENT_SLOT, id: index++ + '' },
//   { name: '意图/槽位1', type: INTENT_SLOT, id: index++ + '' },
//   { name: '泛化文本1', type: DATATYPE_GENERICS, id: index++ + '' },
//   { name: '泛化文本2', type: DATATYPE_GENERICS, id: index++ + '' },
//   { name: '泛化文本3', type: DATATYPE_GENERICS, id: index++ + '' },
// ];

function useData(markType?: number) {
  const [allList, setAllList] = useState<ANNOTATION.dataAnnotationData[]>([]);

  useEffect(() => {
    DataServicePage(params).then(({ list }) => {
      list && list[0] && setAllList(list);
    });
  }, []);

  const dataList = useMemo<ListProps[]>(() => {
    if (!markType) return [];
    // cur.type: 数据集类型 1 音频 2 普通文本 3 泛化文本
    return allList.reduce((data, cur) => {
      const item = { label: cur.name, value: cur.id };

      // 标注类型是: 文本分类/意图/槽位
      if (markType === TEXT_CLASS || markType === INTENT_SLOT) {
        if (cur.type === DATATYPE_TEXT) {
          data.push(item);
        }
      } else if (markType === TEXT_GENERALIZATION) {
        // 标注类型是: 泛化文本
        if (cur.type === DATATYPE_GENERICS) {
          data.push(item);
        }
      } else if (cur.type === DATATYPE_AUDIO) {
        // 标注类型是: 音频分类/音频转写/音频分割
        data.push(item);
      }

      return data;
    }, [] as ListProps[]);
  }, [allList, markType]);

  return dataList;
}

export default useData;
