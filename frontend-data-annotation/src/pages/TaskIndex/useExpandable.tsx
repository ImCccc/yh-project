import {
  dimensionTypeMapText,
  isQualityText,
  ListProps,
} from '@/utils/globalData';
import { formatDate } from '@/utils/util';
import { ExpandableConfig } from 'antd/lib/table/interface';
import { useMemo, useState } from 'react';
import Expanded from './Expanded';

type TableRowProps = ANNOTATION.dataAnnotationJob & {
  task_id?: string;
  job_type?: number;
  quality_status?: number;
  mark_status?: number;
};

function useExpandable(service: any) {
  // 缓存列表展开的数据
  const [listData, setListData] = useState<{
    [key: string]: ListProps[] | null;
  }>({});
  // 展开配置
  const expandable = useMemo<ExpandableConfig<TableRowProps>>(() => {
    return {
      onExpand: async (expanded, row) => {
        // const { job_type, quality_status, mark_status, status } = row;
        // if (status === TEAM_TASK_STATUS_UNPASS) {
        //   // 队长端-验收不通过 -> 不能查看详情
        //   return setListData({ ...listData, [row.id]: null });
        // }
        // if (
        //   job_type === TASK_TYPE_QUALITY &&
        //   quality_status === MEMBER_TASK_STATUS_QA_UNPASS
        // ) {
        //   // 队员端-质检任务-验收不通过 -> 不能查看详情
        //   return setListData({ ...listData, [row.id]: null });
        // }
        // if (
        //   job_type === TASK_TYPE_MARK &&
        //   mark_status === MEMBER_TASK_STATUS_MK_UNPASS
        // ) {
        //   // 队员端-标注任务-验收不通过 -> 不能查看详情
        //   return setListData({ ...listData, [row.id]: null });
        // }
        const id = row.task_id || row.id;
        if (!expanded) return;
        const { item }: { item: TableRowProps } = await service({ id });
        setListData({
          ...listData,
          [row.id]: [
            { label: '任务名称:', value: item.name },
            {
              label: '标注类型:',
              value: dimensionTypeMapText[item.mark_type] || '',
            },
            { label: '数据集名称:', value: item.data_name },
            { label: '创建人:', value: item.create_username },
            { label: '创建时间:', value: formatDate(item.create_time) },
            {
              label: '标签集:',
              value: (item.label_sets || []).map((v) => v.name).join(', '),
            },
            { label: '截止时间:', value: formatDate(item.need_finish_time) },
            { label: '标注团队:', value: item.mark_team?.name },
            { label: '是否质检:', value: isQualityText[item.is_quality] },
            { label: '质检团队:', value: item.quality_team?.name },
            { label: '描述:', value: item.describe },
          ],
        });
      },
      expandedRowRender: (row) => <Expanded list={listData[row.id]} />,
    };
  }, [listData, service]);

  return expandable;
}

export default useExpandable;
