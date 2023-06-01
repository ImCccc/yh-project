import Loading from '@/components/Loading';
import { DeleteOutlined, PlusOutlined } from '@ant-design/icons';
import { Empty, Input, message } from 'antd';
import React, {
  useCallback,
  useEffect,
  useImperativeHandle,
  useMemo,
  useRef,
  useState,
} from 'react';
import AnnotationLayout from '../AnnotationLayout';
import styles from './index.module.less';

type CompProps = {
  ref?: any;
  data: any;
  noPass?: boolean;
  disabled?: boolean;
  operButtons?: React.ReactNode; // 操作按钮, 不同的角色有不一样的操作
  nextClick?: () => void; // 点击右箭头
  prevClick?: () => void; // 点击左箭头
};

const Comp: React.FC<CompProps> = React.forwardRef(
  ({ disabled, operButtons, nextClick, prevClick, data, noPass }, ref) => {
    const [originalText, setOriginalText] = useState('');
    const [example, setExample] = useState<string[]>([]);
    const [enhanceTexts, setEnhanceTexts] = useState<string[]>([]);

    const _originalParams = useRef('');

    const isNull = useMemo(
      () => () => {
        return !enhanceTexts.filter((t) => t).length;
      },
      [enhanceTexts],
    );

    const getParams = useMemo(() => {
      return () => {
        if (isNull()) return '';
        if (!data || !data.context) return '';
        const params = JSON.parse(data.context);
        params.enhance_texts = enhanceTexts.reduce((data, cur) => {
          const t = cur.trim();
          if (!t) return data;
          if (data.includes(t)) return data;
          data.push(t);
          return data;
        }, [] as string[]);
        return params;
      };
    }, [data, enhanceTexts, isNull]);

    const checkParams = useMemo(
      () => () => {
        if (!enhanceTexts.filter((v) => v.trim()).length) {
          message.error('请添加泛化文本');
          return true;
        }
        return false;
      },
      [enhanceTexts],
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

    const addEnhanceText = useCallback(() => {
      setEnhanceTexts([...enhanceTexts, '']);
      setTimeout(
        () => document.getElementById('_input_' + enhanceTexts.length)?.focus(),
        100,
      );
    }, [enhanceTexts]);

    useEffect(() => {
      if (!data) return;
      const rs = data.result || data.context;
      let _originalText = '';
      let _example: string[] = [];
      let _enhanceTexts: string[] = [''];
      _originalParams.current = data.result || JSON.stringify('');
      if (rs) {
        const result = JSON.parse(rs);
        _originalText = result.text;
        _example = result.enhance_text_egs || _example;
        _enhanceTexts = result.enhance_texts || _enhanceTexts;
      }
      setExample(_example);
      setOriginalText(_originalText);
      setEnhanceTexts(_enhanceTexts);
      if (_enhanceTexts[0] === '') {
        // 默认聚焦
        setTimeout(() => document.getElementById('_input_0')?.focus(), 100);
      }
    }, [data]);

    if (data === null) {
      return <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />;
    }

    if (!data) return <Loading />;

    return (
      <div className="page-padding-tb flex">
        <AnnotationLayout
          noPass={noPass}
          showInvalid={false}
          operButtons={operButtons}
          nextClick={nextClick}
          prevClick={prevClick}
        >
          <div className={styles.scroll}>
            <div className={styles.box}>
              <div className={styles.label}>原始文本:</div>
              <Input value={originalText} className={styles.mb} disabled />
              <div className={styles.label}>泛化文本提示:</div>
              {example.map((text, index) => (
                <Input
                  disabled
                  key={index}
                  value={text}
                  className={styles.mb}
                />
              ))}
              <div className={styles.label}>添加泛化文本:</div>
              {enhanceTexts.map((text, index) => (
                <div key={index} className={styles.item}>
                  <Input
                    value={text}
                    disabled={disabled}
                    id={`_input_${index}`}
                    placeholder="请输入泛化文本"
                    onPressEnter={addEnhanceText}
                    onChange={(e) => {
                      enhanceTexts[index] = e.target.value;
                      setEnhanceTexts([...enhanceTexts]);
                    }}
                  />
                  {!disabled && (
                    <DeleteOutlined
                      className={styles.del}
                      onClick={() => {
                        enhanceTexts.splice(index, 1);
                        setEnhanceTexts([...enhanceTexts]);
                      }}
                    />
                  )}
                </div>
              ))}
              {!disabled && (
                <div className={styles.add} onClick={addEnhanceText}>
                  <PlusOutlined />
                  回车添加泛化文本
                </div>
              )}
            </div>
          </div>
        </AnnotationLayout>
      </div>
    );
  },
);

export default Comp;
