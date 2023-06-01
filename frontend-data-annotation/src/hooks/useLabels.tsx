import { PackageServiceLabels } from '@/services/dataAnnotation/PackageService';
import { useEffect, useMemo, useState } from 'react';
import { useParams } from 'react-router-dom';

export type AnnotationLabelsProps = ANNOTATION.dataAnnotationLabelSetDetail[];
export type LabelsColorProps = {
  [k: string]: string;
};

const getColor = (color?: string, opacity?: number) => {
  if (color) {
    return `rgba(${color.replaceAll('|', ',')},${opacity ?? 1})`;
  }
  const i = Math.floor(Math.random() * 3 + 1);
  const r = i === 1 ? 180 : Math.floor(Math.random() * 255 + 1);
  const g = i === 2 ? 180 : Math.floor(Math.random() * 255 + 1);
  const b = i === 3 ? 180 : Math.floor(Math.random() * 255 + 1);
  return `rgba(${r}, ${g}, ${b},${opacity ?? 1})`;
};

// const mockList = [
//   {
//     id: 'p1',
//     name: '标签集1--' + Math.random().toFixed(5),
//     type: 0, //  类型 1 普通 2 意图 3 槽位
//     is_multiple_select: 0, // 是否多选 0-单选 1-多选
//     lables: [
//       {
//         id: Math.random().toFixed(5),
//         label_set_id: 'p1',
//         name: '标签' + Math.random().toFixed(5),
//         color: getColor(1),
//       },

//       {
//         id: Math.random().toFixed(5),
//         label_set_id: 'p1',
//         name: '标签' + Math.random().toFixed(5),
//         color: getColor(1),
//       },
//     ],
//   },
//   {
//     id: 'p2',
//     name: '标签集2--' + Math.random().toFixed(5),
//     type: 0, //  类型 1 普通 2 意图 3 槽位
//     is_multiple_select: 1, // 是否多选 0-单选 1-多选
//     lables: [
//       {
//         id: Math.random().toFixed(5),
//         label_set_id: 'p2',
//         name: '标签' + Math.random().toFixed(5),
//         color: getColor(1),
//       },
//       {
//         id: Math.random().toFixed(5),
//         label_set_id: 'p2',
//         name: '标签' + Math.random().toFixed(5),
//         color: getColor(1),
//       },
//     ],
//   },
// ];

function useLabels() {
  const params = useParams();
  const [labels, setLabels] = useState<AnnotationLabelsProps>();

  const parentLabels = useMemo(
    () => labels?.map((label) => label.name),
    [labels],
  );

  const labelsColor = useMemo<LabelsColorProps>(() => {
    if (!labels) return {};
    return labels.reduce((data, cur) => {
      if (cur.lables)
        cur.lables.forEach((c) => (data[`${cur.name}-${c.name}`] = c.color));
      return data;
    }, {} as LabelsColorProps);
  }, [labels]);

  useEffect(() => {
    if (!params.id) return;
    PackageServiceLabels({ id: params.id }).then(({ item }) => {
      const labs = (item || []).map((item) => {
        item.lables = item.lables.map((lab) => {
          lab.color = getColor(lab.color);
          return lab;
        });
        return item;
      });
      setLabels(labs);
    });
  }, [params.id]);
  return {
    labels,
    labelsColor,
    parentLabels,
  };
}

export default useLabels;
