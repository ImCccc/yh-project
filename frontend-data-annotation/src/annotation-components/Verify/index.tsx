import { AudioDataProps } from '@/annotation-components/AudioAnnotation';
import useKeydownArrow from '@/hooks/useKeydownArrow';
import {
  TaskServiceGetTaskMarkSample,
  TaskServiceGetTaskMarkSampleNumber,
} from '@/services/dataAnnotation/TaskService';
import { message } from 'antd';
import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import { useParams } from 'react-router-dom';
import AnnotationPagination, {
  AnnotationPageSize,
  PageListProps,
} from '../AnnotationPagination';
import SubmitTask from './SubmitTask';

// type ParamsProps = ANNOTATION.dataAnnotationGetTaskMarkSampleReq;

type CompProps = {
  Component: any;
  formatData?: any;
  [key: string]: any;
};

const Comp: React.FC<CompProps> = ({ Component, formatData, ...props }) => {
  const params = useParams();
  const id = useMemo(() => params.id || '', [params.id]);
  // 组件需要数据
  const [compData, setCompData] = useState<AudioDataProps>();
  // 当前任务项Id, 用于请求参数, 默认 0
  const sampleSequence = useRef<number>(0);
  // 分页数据
  const [pageList, setPageList] = useState<PageListProps[]>([]);
  // 总数
  const [total, setTotal] = useState(0);
  // 当前页
  const [currentPage, setCurrent] = useState(1);
  // 当前序号
  const [currentSequence, setSequence] = useState(1);
  // 当前序号对应的下标
  const thisIndex = useMemo(() => {
    return (currentSequence - 1) % AnnotationPageSize;
  }, [currentSequence]);
  // 改变当前页
  const onChange = useCallback((page: number) => {
    setCurrent(page);
    //当前序号重置为当前页的第一条
    setSequence((page - 1) * AnnotationPageSize + 1);
  }, []);

  const nextTask = useCallback(() => {
    const isLast = currentSequence === total;
    if (isLast) return;
    setSequence(currentSequence + 1);
    if ((thisIndex + 1) % AnnotationPageSize === 0) {
      // 当前序号是当前页的最后一条数据, 那么需要切换到下一页
      setCurrent(currentPage + 1);
    }
  }, [currentPage, currentSequence, thisIndex, total]);

  const next = useCallback(async () => {
    const isLast = currentSequence === total;
    if (isLast) message.info('已经是最后一条');
    nextTask();
  }, [currentSequence, nextTask, total]);

  const prev = useCallback(async () => {
    const isFirst = currentSequence === 1;
    if (isFirst) return message.info('已经是第一条');
    setSequence(currentSequence - 1);
    if (thisIndex === 0) {
      // 当前序号是当前页的第一条数据, 那么需要切换到上一页
      setCurrent(currentPage - 1);
    }
  }, [currentPage, currentSequence, thisIndex]);

  // 改变当前序号
  const onChangeSequence = useCallback(async (sequence: number) => {
    setSequence(sequence);
  }, []);

  useKeydownArrow(next, prev);

  // 获取分页数据
  useEffect(() => {
    TaskServiceGetTaskMarkSampleNumber({ id }).then(({ sample_count }) => {
      setTotal(sample_count || 0);
      const list: PageListProps[] = [];
      for (let index = 0; index < sample_count; index++) {
        list.push({ isError: false, isPass: true });
      }
      setPageList(list);
    });
  }, [currentPage, id]);

  useEffect(() => {
    setCompData(undefined);
    TaskServiceGetTaskMarkSample({
      id,
      sequence: currentSequence,
    }).then((data) => {
      const item = data.item;
      if (!item) return setCompData(null);
      setCompData(formatData ? formatData(item) : item);
      sampleSequence.current = item.sample_sequence;
    });
  }, [currentSequence, formatData, id]);

  return (
    <>
      <SubmitTask id={id} />
      <AnnotationPagination
        total={total}
        pageList={pageList}
        onChange={onChange}
        currentPage={currentPage}
        currentSequence={currentSequence}
        onChangeSequence={onChangeSequence}
      />
      <Component
        disabled
        data={compData}
        prevClick={prev}
        nextClick={next}
        showInvalid={false}
        {...props}
      />
    </>
  );
};

export default Comp;
