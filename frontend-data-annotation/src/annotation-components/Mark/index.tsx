import useKeydownArrow from '@/hooks/useKeydownArrow';
import { ContentModal } from '@/pages/Layout/Content';
import {
  PackageServiceCommitMark,
  PackageServiceGetMarkSample,
  PackageServiceMarkSamplePage,
  PackageServiceSaveMarkSample,
} from '@/services/dataAnnotation/PackageService';
import { modalConfirm } from '@/utils/util';
import { Button, message } from 'antd';
import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import AnnotationPagination, {
  AnnotationPageSize,
  PageListProps,
} from '../AnnotationPagination';

// type ParamsProps = ANNOTATION.dataAnnotationGetMarkSampleReq;
// useEffect(() => {
//   window.addEventListener('beforeunload', function (e) {
//     const confirmationMessage = '你确定要离开吗？';
//     (e || window.event).returnValue = confirmationMessage;
//     return confirmationMessage;
//   });
// }, []);

type CompProps = {
  Component: any;
  formatData?: any;
  [key: string]: any;
};

const Comp: React.FC<CompProps> = ({ Component, formatData, ...props }) => {
  const navigate = useNavigate();
  const params = useParams();
  const id = useMemo(() => params.id || '', [params.id]);

  // 音频分割组件需要数据
  const [compData, setCompData] = useState<any>();

  // 组件实例
  const compRef = useRef<any>(null);

  // 判断是否在保存, 防止多次保存
  const isSaving = useRef(false);

  // 质检不通过, 再次标注, 如果当前任务不通过, 需要显示不通过图标
  const [isNoPass, setIsNoPass] = useState(false);

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
    PackageServiceMarkSamplePage({
      id,
      page_index: currentPage,
      page_size: AnnotationPageSize,
    }).then(({ list, total }) => {
      if (!list) return;
      setTotal(total || 0);
      setPageList(
        list.map((item) => ({ isError: false, isPass: item.is_finish === 1 })),
      );
    });
  }, [currentPage, id]);

  // 当前序号改变, 重新获取标注任务的数据
  useEffect(() => {
    setCompData(undefined);
    PackageServiceGetMarkSample({
      id,
      sequence: currentSequence,
    }).then((data) => {
      const item = data.item;
      if (!item) return setCompData(null);
      setCompData(formatData ? formatData(item) : item);
      setIsNoPass(item.is_quality_no_pass);
    });
  }, [currentSequence, formatData, id]);

  // 保存
  const save = useCallback(
    async (checkNull?: boolean) => {
      if (!compData || isSaving.current) return Promise.reject();

      const thisItem = pageList[thisIndex];
      // 如果页面没有做任何修改
      if (!compRef.current.isUpdate()) {
        // 没有做过任何修改的, 并且是新的标注任务; 如果点击保存按钮, 那还是需要非空校验
        if (compRef.current.isNull() && !checkNull) return true;
        // 没有做过任何修改的, 并且是曾经标注完成的标注任务
        if (thisItem.isPass) return true;
      }

      if (compRef.current.checkParams()) {
        return Promise.reject();
      }

      isSaving.current = true;
      try {
        await PackageServiceSaveMarkSample({
          package_id: id,
          sample_id: compData.id || compData.sample_id,
          result: JSON.stringify(compRef.current.getParams()),
        });
        isSaving.current = false;
        // 完成标注后, 设置已标注标识
        if (!thisItem.isPass) {
          thisItem.isPass = true;
          setPageList([...pageList]);
        }
        return true;
      } catch (error) {
        isSaving.current = false;
        throw error;
      }
    },
    [compData, id, pageList, thisIndex],
  );

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
    await save();
    nextTask();
  }, [currentSequence, nextTask, save, total]);

  const prev = useCallback(async () => {
    const isFirst = currentSequence === 1;
    if (isFirst) message.info('已经是第一条');
    await save();
    if (!isFirst) {
      setSequence(currentSequence - 1);
      if (thisIndex === 0) {
        // 当前序号是当前页的第一条数据, 那么需要切换到上一页
        setCurrent(currentPage - 1);
      }
    }
  }, [currentPage, currentSequence, save, thisIndex]);

  const operButtons = (
    <Button
      type="primary"
      onClick={async () => {
        await save(true);
        message.success('保存成功!');
        nextTask();
      }}
    >
      保存
    </Button>
  );

  const submitTask = useCallback(async () => {
    await modalConfirm('提交任务后不可再标注, 确定要提交?');
    await PackageServiceCommitMark({ id });
    message.success('提交成功');
    navigate('/task/index');
  }, [id, navigate]);

  // 改变当前序号
  const onChangeSequence = useCallback(
    async (sequence: number) => {
      await save();
      setSequence(sequence);
    },
    [save],
  );

  // 按下键盘左右键切换
  useKeydownArrow(next, prev);

  return (
    <div className="base-min-width">
      <ContentModal>
        <Button type="primary" onClick={submitTask}>
          提交任务
        </Button>
      </ContentModal>
      <AnnotationPagination
        total={total}
        pageList={pageList}
        onChange={onChange}
        currentPage={currentPage}
        currentSequence={currentSequence}
        onChangeSequence={onChangeSequence}
      />
      <Component
        disabled={false}
        ref={compRef}
        data={compData}
        nextClick={next}
        prevClick={prev}
        noPass={isNoPass}
        operButtons={operButtons}
        {...props}
      />
    </div>
  );
};

export default Comp;
