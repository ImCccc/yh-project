import { PackageServiceLabels } from '@/services/dataAnnotation/PackageService';
import { remToNumber } from '@/utils/util';

export type AnnotationLabelsProps = ANNOTATION.dataAnnotationLabelSetDetail[];
export type LabelsColorProps = { [k: string]: string };

// 前端音频标签的格式
export type TabProps = {
  label: string;
  parentLabel: string;
  color?: string;
};

export type SegmentParamsProps = {
  time_start: number;
  time_end: number;
  text?: string;
  [key: string]: any;
};

// 时间分段参数的格式
export type ResultProps = {
  key: string;
  invalid?: boolean;
  segment: SegmentParamsProps[];
};

// 页面显示的时间段的数据格式
export type BaseInfoProps = {
  end: string; // 开始时间
  start: string; // 结束时间
  tabs: TabProps[]; // 标签
  text?: string; // 音频内容
};

// 错误提示
export type ErrorInfoProps = Partial<Record<keyof BaseInfoProps, string>>;

export type RegionsProps = BaseInfoProps & {
  id: string; // 区段id, 插件自动生成
  isPlaying?: boolean; // 是否播放
  errorInfo: ErrorInfoProps;
  [k: string]: any;
};

let regionsIdIndex = 1;
export const getRegionsId = () => {
  return `regionsid-${regionsIdIndex++}`;
};

export const getColor = (opacity = 0.4) => {
  const i = Math.floor(Math.random() * 3 + 1);
  const r = i === 1 ? 180 : Math.floor(Math.random() * 255 + 1);
  const g = i === 2 ? 180 : Math.floor(Math.random() * 255 + 1);
  const b = i === 3 ? 180 : Math.floor(Math.random() * 255 + 1);
  return `rgba(${r}, ${g}, ${b},${opacity})`;
};

/*
  {
    父鸡标签1: '便签1|便签2',
    父鸡标签2: ['便签1'],
  } 
  转为:
  [
    {  parentLabel: '父鸡标签1', label: '便签1', color: 'xxx' },
    {  parentLabel: '父鸡标签1', label: '便签2', color: 'xxx' },
    {  parentLabel: '父鸡标签2', label: '便签1', color: 'xxx' },
  ]
*/
export const getLabelListByObject = (
  labelObject: { [key: string]: any },
  tabColor: Record<string, string>,
) => {
  if (!(labelObject instanceof Object)) return [];
  let allTabs: TabProps[] = [];
  Object.keys(labelObject).forEach((parentLabel) => {
    const labels = labelObject[parentLabel];
    if (!labels) return;
    if (typeof labels === 'string' || labels instanceof Array) {
      const list = typeof labels === 'string' ? labels.split('|') : labels;
      const labelList: TabProps[] = list.map((label) => ({
        label,
        parentLabel,
        color: tabColor[`${parentLabel}-${label}`] || '',
      }));
      allTabs = [...allTabs, ...labelList];
    }
  });
  return allTabs;
};

/*
  getRegionsList 方法说明：
  1. 参数result：字符串，转换对象后的数据结构：
  {
    key: 'xxx',
    segment: [
      {
        time_start: 11,
        time_end: 24,
        text: 'string',
        父鸡标签1: '便签1|便签2',
        父鸡标签2: '便签1',
      },
    ],
  };
  2. 方法返回结果：
  [
    {
      end:24,
      start:11,
      tabs: [
        { label: '便签1', parentLabel: '父鸡标签1', color: 'xxx' },
        { label: '便签2', parentLabel: '父鸡标签1', color: 'xxx' },
        { label: '便签1', parentLabel: '父鸡标签2', color: 'xxx' },
      ],
      text:'string',
      id: getRegionsId(),
      isPlaying: false,
      errorInfo: {}
    }
  ]
*/

export const getResult = (result?: string) => {
  try {
    return JSON.parse(result || '') as ResultProps;
  } catch (error) {
    return {
      key: '',
      invalid: false,
      segment: [],
    };
  }
};

export const getRegionsList = (
  segment: ResultProps['segment'],
  tabColor: Record<string, string>,
) => {
  try {
    const regionsList: RegionsProps[] = segment.map(
      ({ time_end, time_start, text, ...tabs }) => ({
        id: getRegionsId(),
        text: text ?? '',
        end: (time_end ?? '') + '',
        start: (time_start ?? '') + '',
        errorInfo: {},
        isPlaying: false,
        tabs: getLabelListByObject(tabs, tabColor),
      }),
    );
    return regionsList;
  } catch (error) {
    return [];
  }
};

// 获取音频组件离左侧的距离：菜单宽度 + 父组件padding + 父父组件padding
export const getMenuWidth = () => {
  return (
    document.querySelector('.ant-menu.ant-menu-root')?.clientWidth ||
    remToNumber(28)
  );
};

// 获取当前游标的时间值，创建时间段时候需要用到
export const getTimeslice = () => {
  const times = document.querySelector('.wave showtitle')?.textContent || '';

  const interval = times.split(':');
  let hour = 0;
  let minute = 0;
  let second = 0;
  let millisecond = 0;

  if (interval.length === 3) {
    minute = +interval[0];
    second = +interval[1];
    millisecond = +interval[2];
  }

  if (interval.length === 4) {
    hour = +interval[0];
    minute = +interval[1];
    second = +interval[2];
    millisecond = +interval[3];
  }

  return hour * 3600 + minute * 60 + second + millisecond / 1000;
};

/*
  获取音频标签的请求参数格式： 
  { 
    [标签集1名称]: '标签1|标签2',
    [标签集2名称]: '标签1|标签2',
  }
*/
export const getTabParams = (tabs?: TabProps[]) => {
  // 保存标签参数
  const tabsParams: Record<string, string> = {};
  // 生成标签参数
  (tabs || []).forEach(({ parentLabel, label }) => {
    if (tabsParams[parentLabel]) {
      tabsParams[parentLabel] += `|${label}`;
    } else {
      tabsParams[parentLabel] = label;
    }
  });
  return tabsParams;
};

// 时间段的格式校验
export const checkTime = (value: string, duration: number, type = 'start') => {
  if (value.trim() === '') {
    return type === 'start' ? '开始时间不能为空' : '结束时间不能为空';
  }

  if (isNaN(+value)) {
    return type === 'start' ? '开始时间必须是数字' : '结束时间必须是数字';
  }

  if (+value > duration) {
    return type === 'start'
      ? `开始时间不能大于${duration.toFixed(2)}`
      : `结束时间不能大于${duration.toFixed(2)}`;
  }
  return '';
};

// 校验标签, 每一个时间段都必须拥有每一个标签集里面的一个或多个标签
export const checkTabs = (
  tabs: TabProps[],
  labels: AnnotationLabelsProps,
  index: number,
) => {
  // 获取标签参数
  const tabsParams = getTabParams(tabs);

  // 校验是否都选了标签集
  const errors: React.ReactNode[] = [];
  labels.forEach((lab) => {
    if (!tabsParams[lab.name])
      errors.push(`"时间分段${index}" 缺少标签 "${lab.name}"!`);
  });

  return errors.length ? errors : null;
};

// 输入时间校验格式
export const checkInputTime = (
  start: string,
  end: string,
  duration: number,
  type = 'start',
) => {
  const checkEndResult = checkTime(end, duration, 'end');
  const checkStartResult = checkTime(start, duration);
  if (type === 'start') {
    // 开始时间为空或者格式不对
    if (checkStartResult) return checkStartResult;
    // 如果结束时间为空或者格式不对,那么不需要校验开始时间必须少于结束时间
    if (checkEndResult) return '';
    if (+start >= +end) return '开始时间必须小于结束时间';
    return '';
  } else {
    // 结束时间为空或者格式不对
    if (checkEndResult) return checkEndResult;
    // 如果开始时间为空或者格式不对,那么不需要校验开始时间必须少于结束时间
    if (checkStartResult) return '';
    if (+start >= +end) return '结束时间必须大于开始时间';
    return '';
  }
};

// 校验音频内容
export const checkText = (hideText: boolean | undefined, text?: string) => {
  if (hideText) return '';
  text = text || '';
  return text.trim() === '' ? '音频内容不能为空' : '';
};

export const getLabels = async () => {
  // todo......
  const id = location.hash.split('/').slice(-1)[0];

  return PackageServiceLabels({ id }).then(({ item }) => {
    const labelList: AnnotationLabelsProps = (item || []).map((item) => {
      item.lables = item.lables.map((lab) => {
        lab.color = `rgba(${lab.color.replaceAll('|', ',')},1)`;
        return lab;
      });
      return item;
    });

    const labelsColor = labelList.reduce((data, cur) => {
      if (cur.lables)
        cur.lables.forEach((c) => (data[`${cur.name}-${c.name}`] = c.color));
      return data;
    }, {} as LabelsColorProps);

    return {
      labelList,
      labelsColor,
    };
  });
};
