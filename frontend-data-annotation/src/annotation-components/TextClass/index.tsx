import DryTag from '@/components/DryTag';
import Loading from '@/components/Loading';
import useLabels from '@/hooks/useLabels';
import { splitJsx } from '@/utils/util';
import { Button, Input, message, Modal } from 'antd';
import classNames from 'classnames';
import React, {
  useCallback,
  useEffect,
  useImperativeHandle,
  useMemo,
  useRef,
  useState,
} from 'react';
import AnnotationLayout from '../AnnotationLayout';
import {
  getLabelListByObject,
  getTabParams,
  TabProps,
} from '../AudioAnnotation/tool';
import SelectLables, {
  LablesValuesProps,
  SelectLablesValuesProps,
} from '../SelectLables';
import styles from './index.module.less';

type CompProps = {
  ref?: any;
  data: any;
  noPass?: boolean;
  disabled?: boolean;
  operButtons?: React.ReactNode; // 操作按钮, 不同的角色有不一样的操作
  nextClick?: () => void; // 点击右箭头
  prevClick?: () => void; // 点击左箭头
  showInvalid?: boolean; // 是否显示废弃按钮
};

type ParamsProps = {
  invalid?: boolean;
  text?: string;
  [k: string]: any;
};

const Comp: React.FC<CompProps> = React.forwardRef(
  (
    { disabled, showInvalid, operButtons, nextClick, prevClick, data, noPass },
    ref,
  ) => {
    const [context, setContext] = useState('');
    const { labels, labelsColor, parentLabels } = useLabels();
    const [selectLabels, setSelectLabels] = useState<LablesValuesProps>({});
    const chooseLabels = useCallback((values: SelectLablesValuesProps) => {
      setSelectLabels(values);
    }, []);

    const _originalParams = useRef('');
    const [invalid, setInvalid] = useState(false);

    const showList = useMemo(() => {
      return getLabelListByObject(selectLabels, labelsColor);
    }, [labelsColor, selectLabels]);

    const deleteTag = (tab: TabProps) => {
      const pLab = tab.parentLabel;
      const labs = selectLabels[pLab];
      if (!labs) return;
      if (labs instanceof Array) {
        selectLabels[pLab] = labs.filter((v) => v !== tab.label);
      } else {
        delete selectLabels[pLab];
      }
      setSelectLabels({ ...selectLabels });
    };

    const isNull = useMemo(
      () => () => {
        if (invalid) return false;
        return !showList.length;
      },
      [invalid, showList.length],
    );

    const getParams = useCallback(() => {
      if (invalid) {
        return { invalid, text: context };
      }
      if (isNull()) return '';
      return {
        invalid,
        text: context,
        ...getTabParams(showList),
      } as ParamsProps;
    }, [context, invalid, isNull, showList]);

    const checkParams = useMemo(
      () => () => {
        if (invalid) return false;
        if (!parentLabels) return false;

        if (!showList.length) {
          message.error(`请从右侧标签集内选择对应标签`);
          return true;
        }

        // 校验是否都选了标签集
        const errors: React.ReactNode[] = [];
        for (let i = 0; i < parentLabels.length; i++) {
          const element = parentLabels[i];
          if (!selectLabels[element] || !selectLabels[element].length) {
            errors.push(`请在右侧的标签集 "${element}" 中选择标签!`);
          }
        }

        if (errors.length) {
          Modal.confirm({
            width: '60rem',
            content: <div>{splitJsx(<br />, ...errors)}</div>,
            closable: true,
            title: '提示',
            okText: '确定',
            okCancel: false,
          });
          return true;
        }

        return false;
      },
      [invalid, parentLabels, selectLabels, showList.length],
    );

    const isUpdate = useMemo(
      () => () => _originalParams.current !== JSON.stringify(getParams()),
      [getParams],
    );

    const imperativeHandle = useMemo(
      () => () => ({
        isNull,
        getParams,
        isUpdate,
        checkParams,
      }),
      [checkParams, getParams, isNull, isUpdate],
    );

    useImperativeHandle(ref, imperativeHandle);

    useEffect(() => {
      if (!data) return;
      let _tabs = {};
      let _invalid = false;
      let _context = data.context;
      _originalParams.current = data.result || JSON.stringify('');
      if (data.result) {
        const result = JSON.parse(data.result) || {};
        const { text, ...tabs } = result;
        _context = text || _context;
        _invalid = !!result.invalid;
        _tabs = tabs;
      }
      setInvalid(_invalid);
      setContext(_context);
      setSelectLabels(_tabs);
    }, [data]);

    return (
      <div className="page-padding-tb flex">
        <AnnotationLayout
          noPass={noPass}
          invalid={invalid}
          showInvalid={showInvalid}
          operButtons={operButtons}
          nextClick={nextClick}
          prevClick={prevClick}
          onChangeInvalid={setInvalid}
        >
          {!data && (
            <div className={styles.content}>
              <Loading />
            </div>
          )}
          {data && (
            <div className={styles.content}>
              <div>
                <span className={classNames('require', styles.text)}>
                  文本内容:
                </span>
                <Input.TextArea
                  readOnly
                  value={context}
                  className={styles.textArea}
                  autoSize={{ minRows: 6, maxRows: 20 }}
                  onChange={(e) => setContext(e.target.value)}
                ></Input.TextArea>
              </div>
              <div>
                <span className={classNames('require', styles.text)}>
                  文本标签:
                </span>
                <div className={styles.labels}>
                  {showList.map((tab, index) => (
                    <div
                      key={index}
                      className={classNames('base-head', styles.tag)}
                    >
                      <DryTag color={tab.color} key={index}>
                        {tab.label}
                      </DryTag>
                      {!disabled && (
                        <Button type="link" onClick={() => deleteTag(tab)}>
                          删除
                        </Button>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </AnnotationLayout>
        {!disabled && (
          <SelectLables
            labels={labels}
            value={selectLabels}
            onChange={chooseLabels}
          />
        )}
      </div>
    );
  },
);

export default Comp;
