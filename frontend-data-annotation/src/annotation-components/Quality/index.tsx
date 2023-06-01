import { AudioDataProps } from '@/annotation-components/AudioAnnotation';
import useKeydownArrow from '@/hooks/useKeydownArrow';
import {
  PackageServiceGetQualitySample,
  PackageServiceQualitySamplePage,
  PackageServiceSaveQualitySample,
} from '@/services/dataAnnotation/PackageService';
import {
  QUALITY_STATUS_NOPASS,
  QUALITY_STATUS_PASS,
  QUALITY_STATUS_UNDONE,
} from '@/utils/globalData';
import { message, Radio, RadioChangeEvent } from 'antd';
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

// type ParamsProps = ANNOTATION.dataAnnotationGetQualitySampleReq;

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
  // 判断是否在保存, 防止多次保存
  const isSaving = useRef(false);
  // 当前任务项Id, 用于请求参数, 默认 0
  const currentTaskId = useRef<number>(0);
  // 质检状态 1 质检中 2 质检通过 3 质检不通过
  const [thisState, setThisState] = useState(QUALITY_STATUS_UNDONE);
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

  // 获取分页数据
  useEffect(() => {
    PackageServiceQualitySamplePage({
      id,
      page_index: currentPage,
      page_size: AnnotationPageSize,
    }).then(({ list, total }) => {
      if (!list) return;
      setTotal(total || 0);
      setPageList(
        list.map((item) => ({
          isError: item.status === QUALITY_STATUS_NOPASS,
          isPass: item.status === QUALITY_STATUS_PASS,
        })),
      );
    });
  }, [currentPage, id]);

  useEffect(() => {
    setCompData(undefined);
    PackageServiceGetQualitySample({
      id,
      sequence: currentSequence,
    }).then((data) => {
      const item = data.item;
      if (!item) return setCompData(null);
      setCompData(formatData ? formatData(item) : item);
      setThisState(item.quality_status || QUALITY_STATUS_UNDONE);
      currentTaskId.current = data.quality_sample_id;
    });
  }, [currentSequence, formatData, id]);

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

  const save = useCallback(
    async (is_pass: number) => {
      if (!compData || isSaving.current) {
        return Promise.reject();
      }

      isSaving.current = true;
      try {
        await PackageServiceSaveQualitySample({
          is_pass,
          quality_sample_id: currentTaskId.current,
        });
        isSaving.current = false;
        const thisItem = pageList[thisIndex];
        thisItem.isError = !is_pass;
        thisItem.isPass = !!is_pass;
        setPageList([...pageList]);
        return true;
      } catch (error) {
        isSaving.current = false;
        throw error;
      }
    },
    [compData, pageList, thisIndex],
  );

  const saveResult = useCallback(
    async (e: RadioChangeEvent) => {
      const pass = e.target.value === QUALITY_STATUS_PASS ? 1 : 0;
      setThisState(e.target.value);
      await save(pass);
      nextTask();
    },
    [nextTask, save],
  );

  // 改变当前序号
  const onChangeSequence = useCallback(async (sequence: number) => {
    setSequence(sequence);
  }, []);

  useKeydownArrow(next, prev);

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
        noPass={thisState === QUALITY_STATUS_NOPASS}
        operButtons={
          <Radio.Group value={thisState} onChange={saveResult}>
            <Radio value={QUALITY_STATUS_PASS}>通过</Radio>
            <Radio value={QUALITY_STATUS_NOPASS}>不通过</Radio>
          </Radio.Group>
        }
        {...props}
      />
    </>
  );
};

export default Comp;
